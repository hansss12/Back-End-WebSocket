const {LatLon} = require("../models")

exports.LatLon = async (req, res) => {
  try {
    const latLonData = await LatLon.findAll({})
    res.status(200).json(latLonData)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error"
    })
  }
};
