export default async function handler(req, res) {
  const { deviceId, startDate, endDate } = req.query;
  
  const end = endDate ? new Date(endDate) : new Date();
  const start = startDate ? new Date(startDate) : new Date(end.getTime() - 24 * 60 * 60 * 1000);
  
  const rtdbUrl = process.env.FIREBASE_DB_URL;
  

  // mengumpulkan semua tanggal yang diminta oleh user 
  try {
    const dates = [];
    let current = new Date(start);
    current.setHours(0, 0, 0, 0);
    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    const semuaData = [];
    
    for (const date of dates) {
      const dateStr = date.toISOString().split('T')[0];
      const url = `${rtdbUrl}/historical_stats/${deviceId}/${dateStr}.json`;
      const response = await fetch(url);
      const dataHarian = await response.json();
      
      if (dataHarian) {
        for (const jam in dataHarian) {
          for (const menit in dataHarian[jam]) {
            const titikData = dataHarian[jam][menit];
            semuaData.push({
              timestamp: titikData.timestamp,
              tx_bytes: titikData.tx_bytes || 0,
              rx_bytes: titikData.rx_bytes || 0,
              cpu_load: titikData.cpu_load || 0
            });
          }
        }
      }
    }
     
    // filter data waktu sesuai urutan 
    const filtered = semuaData.filter(d => 
      d.timestamp >= start.getTime() && d.timestamp <= end.getTime()
    );
    
    filtered.sort((a, b) => a.timestamp - b.timestamp);
    
    res.status(200).json({
      success: true,
      data: filtered,
      total: filtered.length
    });
    
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
