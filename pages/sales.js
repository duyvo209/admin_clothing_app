var db = firebase.firestore();

const selectMonth = Number(document.getElementById("selectMonth").value);

db.collection("orders").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {

    })
});