function footprintBoisson(footprint, quantite) {
    return footprint * quantite;
}

function footprintBoissons(ecvSoda, ecvVin, ecvBiere, ecvLait, ecvLaitSoja, ecvThe, ecvCafe) {
    return ecvSoda + ecvVin + ecvBiere + ecvLait +  ecvLaitSoja + ecvThe + ecvCafe;
}

module.exports = {
    footprintBoisson,
    footprintBoissons,
  }
  