import { promises as fs } from "fs";
import path from "path";

export async function POST(request) {
  try {
    const { file, content } = await request.json();

    const allowedFiles = ["ui", "phases", "characters", "reflections", "parents"];
    if (!allowedFiles.includes(file)) {
      return new Response(JSON.stringify({ error: "Invalid file" }), { status: 400 });
    }

    const filePath = path.join(process.cwd(), "src/data/ur", `${file}.js`);
    await fs.writeFile(filePath, content, "utf-8");

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
