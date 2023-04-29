const express = require("express");
const path = require("path");
const app = express();
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyDh_oi2tqMhVA40-cjxKPr2Z1KORfn5foo",
    authDomain: "test-1e186.firebaseapp.com",
    projectId: "test-1e186",
    storageBucket: "test-1e186.appspot.com",
    messagingSenderId: "582487174416",
    appId: "1:582487174416:web:449c819c7d7fbc6cf1c995",
    measurementId: "G-PQJ48145T0"
};

//init firebase app
initializeApp(firebaseConfig);

//init services
const db = getFirestore();
const colRef = collection(db, 'shots');

//set views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set public folder
app.get('/', (req, res) => {
    getDocs(colRef)
        .then(snapshot => {
            const data = snapshot.docs.map(doc => doc.data());
            res.render('cocktel', { data });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error getting data from Firebase');
        });
})

app.listen(3000, () => {console.log("http://localhost:3000")});


//show BDD
getDocs(colRef)
    .then(snapshot => {
        console.log(snapshot.docs.map(doc => doc.data()));
    })