global.lastData = global.lastData || [];

export default function handler(req, res) {
  const { data } = req.query;

  if (data) {
    global.lastData = data.split(",");
  }

  res.status(200).json({
    success: true,
    received: global.lastData
  });
}   