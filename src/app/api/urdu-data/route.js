import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src/data/ur");
const FILE_NAMES = ["ui", "phases", "characters", "reflections", "parents", "civic-values"];

const EXPORT_MAP = {
  "civic-values": "civicValues",
};

function parseJsFile(content) {
  const match = content.match(/export\s+const\s+\w+\s*=\s*([\s\S]*)/);
  if (!match) throw new Error("Cannot parse JS file");
  let jsCode = match[1].trim();
  if (jsCode.endsWith(";")) jsCode = jsCode.slice(0, -1);
  return eval(`(${jsCode})`);
}

function toJsString(data, file) {
  const exportName = EXPORT_MAP[file] || (file === "ui" ? "ui" : file);
  const json = JSON.stringify(data, null, 2);
  return `export const ${exportName} = ${json};\n`;
}

export async function GET() {
  try {
    const result = {};
    for (const name of FILE_NAMES) {
      const filePath = path.join(DATA_DIR, `${name}.js`);
      const content = await fs.readFile(filePath, "utf-8");
      result[name] = parseJsFile(content);
    }
    return Response.json(result);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { file, data } = body;

    if (!FILE_NAMES.includes(file)) {
      return Response.json({ error: "Invalid file" }, { status: 400 });
    }

    const filePath = path.join(DATA_DIR, `${file}.js`);
    const jsContent = toJsString(data, file);
    await fs.writeFile(filePath, jsContent, "utf-8");

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
