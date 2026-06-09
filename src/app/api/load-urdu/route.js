import { promises as fs } from "fs";
import path from "path";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const file = url.searchParams.get("file");

    const allowedFiles = ["ui", "phases", "characters", "reflections", "parents"];
    if (!allowedFiles.includes(file)) {
      return new Response(JSON.stringify({ error: "Invalid file" }), { status: 400 });
    }

    const filePath = path.join(process.cwd(), "src/data/ur", `${file}.js`);
    const content = await fs.readFile(filePath, "utf-8");

    return new Response(JSON.stringify({ content }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
