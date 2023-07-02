exports.callmeWebSocket = async (req, res) => {
  // endpoint livethreat tidak mereturn latlon
  // jadi kamu harus melookup latlon tersebut 
  // berdasarkan destinationCountry dan sourceCountry yang berada di variable data 
  try {
    const response = await fetch('https://livethreatmap.radware.com/api/map/attacks?limit=10');
    const data = await response.json();
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error"
    })
  }
};
