const dataLatLon = require("../../files/latlon");

exports.callmeWebSocket = async (req, res) => {
  // endpoint livethreat tidak mereturn latlon
  // jadi kamu harus melookup latlon tersebut 
  // berdasarkan destinationCountry dan sourceCountry yang berada di variable data 
  try {
    const response = await fetch('https://livethreatmap.radware.com/api/map/attacks?limit=10');
    const data = await response.json();
    let newData = []
    for (let i = 0; i < dataLatLon.length; i++) {
      const element = dataLatLon[i];
      for (let index = 0; index < data.length; index++) {
        const newEl = data[index];        
        await newEl.forEach((el) => {
          if (el.sourceCountry == element.iso_2) {
            newData.push({
                ...el,
                latitude: element.latitude,
                longitude: element.longitude
              })
          } 
        })
      }
    }
    res.status(200).json(newData)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error"
    })
  }
};
