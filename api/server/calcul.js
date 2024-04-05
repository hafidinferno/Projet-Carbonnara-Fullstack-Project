function footprintBoisson(footprint, quantite) {
    return footprint * quantite;
}

function footprintBoissons(ecvSoda, ecvVin, ecvBiere, ecvLait, ecvLaitSoja, ecvThe, ecvCafe) {
    return ecvSoda + ecvVin + ecvBiere + ecvLait +  ecvLaitSoja + ecvThe + ecvCafe;
}

function moyenne(resultSomme, qte) {
    return resultSomme / qte;
}

function moyenneAnnee(result, n) {
    return result*n;
}

module.exports = {
    footprintBoisson,
    footprintBoissons,
    moyenne,
    moyenneAnnee,
  }
  