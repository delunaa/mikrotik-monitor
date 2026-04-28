export default async function handler(req, res) {
  const { data } = req.query;

  if (!data) {
    return res.status(400).json({ error: "No data" });
  }

  const parsed = data.split(",").filter(item => item !== "");

  await fetch("https://mikrotik-monitor-f0f8e-default-rtdb.asia-southeast1.firebasedatabase.app/users.json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(parsed)
  });

  res.status(200).json({
    success: true,
    saved: parsed
  });
}a