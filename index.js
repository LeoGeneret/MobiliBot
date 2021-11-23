const cron = require("node-cron"); // permet d'effectuer une fonction à intervalle régulier
const axios = require("axios").default; // permet de récuperer la data qu'on veut extraire
const chalk = require("chalk"); // permet de colorer la console

// Toutes les 10 sec, cette fonction est exécutée
cron.schedule("*/10 * * * * *", function () {
  
  // URL trouvée depuis la DevTools Chrome en analysant les requêtes réseau
  var url =
    "https://mobilijeune.actionlogement.fr/api/dossiers/1.0/checkDailyQuota";

  // Stockage de date+heure dans une variable
  var DateTime = new Date();
  
  // stockage de la fonction permettant de récuperer la data
  const getData = axios.get(url).then((response) => {
    
    // si la fonction renvoie false
    if (response.data === false)
      // écrire dans la console l'heure et 'FALSE' en rouge
      console.log(
        chalk.bgRed(
          `[${DateTime.getHours()}:${DateTime.getMinutes()}:${DateTime.getSeconds()}] ${
            response.data.toString().toUpperCase()
          }`
        )
      );
    
    // sinon
    else
      // écrire dans la console l'heure et 'TRUE' en vert
      console.log(
        chalk.bgGreen(
          `[${DateTime.getHours()}:${DateTime.getMinutes()}:${DateTime.getSeconds()}] ${
            response.data.toString().toUpperCase()
          }`
        )
      );
  });
  
  // lancer la recupération de la data
  axios.all([getData]);
});
