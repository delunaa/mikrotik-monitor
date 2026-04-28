import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data.json");

    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    return res.status(200).json({
      users: data
    });

  } catch (error) {
    return res.status(500).json({
      error: "Gagal membaca data"
    });
  }
}