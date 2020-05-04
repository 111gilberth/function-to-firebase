// Importamos functions desde firebasebase-funcions
const functions = require('firebase-functions');
// Importamos firebase-admin para conectarnos con la base de datos
const firebase = require('firebase-admin') // Trabajar con la base de datos
// Importamos el archivo de configuración que descargamos
const config = require('./firebase-config.json')

// inicializamos nuestra aplicación
firebase.initializeApp({
    credential: firebase.credential.cert(config),
    databaseURL: "https://dblackdish.firebaseio.com"
})

exports.restaurantes = functions.https.onRequest((req, res) => {
    if(req.method === 'GET') { //Verifica si es GET
        const restaurantes = firebase.database().ref('/restaurantes') // Referencia a la base de datos
        restaurantes.on('value', (snapshot) => {
            res.json(snapshot.val()) //Manda los datos obtenidos en JSON
        })
    } else  if(req.method === 'POST'){
            const restaurantes = firebase.database().ref('/restaurantes')
            const restaurant = req.body // El objeto que mandemos.
            restaurantes.push(restaurant) // Crea un nuevo objeto con ID aleatorio.
                .then(res.json(restaurant))
                .catch(err => res.json(err))
        
    }
})

