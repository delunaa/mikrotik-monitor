import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { data } = req.query;

  if (!data) {
    return res.status(400).json({
      error: "No data received"
    });
  }

  try {
    const filePath = path.join(process.cwd(), "data.json");

    // ubah string jadi array
    const parsed = data.split(",").filter(item => item !== "");

    // simpan ke file
    fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2));

    return res.status(200).json({
      success: true,
      saved: parsed
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}