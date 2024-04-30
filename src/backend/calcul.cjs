function footprint(footprint, quantite) {
    return footprint * quantite;
}

function footprintBoissons(ecvSoda, ecvVin, ecvBiere, ecvLait, ecvLaitSoja, ecvThe, ecvCafe) {
    return ecvSoda + ecvVin + ecvBiere + ecvLait +  ecvLaitSoja + ecvThe + ecvCafe;
}

function moyenne(resultSomme, qte) {
    if (!isNaN(resultSomme / qte))
    {

        return resultSomme / qte;
    }
    return 0;
}

function moyenneAnnee(result, n) {
    return result*n;
}

module.exports = {
    footprint,
    footprintBoissons,
    moyenne,
    moyenneAnnee,
  }
