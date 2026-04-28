global.data = global.data || [];

export default function handler(req, res) {
  const { data } = req.query;

  if (data) {
    global.data = data.split(",").filter(item => item !== "");
  }

  res.status(200).json({
    success: true,
    saved: global.data
  });
}