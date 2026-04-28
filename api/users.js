export default async function handler(req, res) {
  const response = await fetch("https://mikrotik-monitor-f0f8e-default-rtdb.asia-southeast1.firebasedatabase.app/users.json");
  const data = await response.json();

  res.status(200).json({
    users: data || []
  });
}