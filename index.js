// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

function addData() {
    var inputID = Number(document.getElementById("id").value);
    var inputProductName = document.getElementById("tensanpham").value;
    var inputQuantity = Number(document.getElementById("soluong").value);
    var inputType = document.getElementById("loai").value;
    var inputPrice = Number(document.getElementById("gia").value);
    var inputDesc = document.getElementById("mota").value;
    var inputImage = document.getElementById("anh").value;
    var arrayImage = inputImage.split(', ');
    
    db.collection("products").doc().set({
        id: inputID,
        name: inputProductName,
        quantity: inputQuantity,
        type: inputType,
        price: inputPrice,
        description: inputDesc,
        img: inputImage,
        image: arrayImage
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });  
}

function updateData(docID) {
    var inputID = Number(document.getElementById("id").value);
    var inputProductName = document.getElementById("tensanpham").value;
    var inputQuantity = Number(document.getElementById("soluong").value);
    var inputType = document.getElementById("loai").value;
    var inputPrice = Number(document.getElementById("gia").value);
    var inputDesc = document.getElementById("mota").value;
    var inputImage = document.getElementById("anh").value;
    var arrayImage = inputImage.split(', ');
    
    db.collection("products").doc(docID).update({
        id: inputID,
        name: inputProductName,
        quantity: inputQuantity,
        type: inputType,
        price: inputPrice,
        description: inputDesc,
        img: inputImage,
        image: arrayImage
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });  
}

function deleteData() {
    var inputID = Number(document.getElementById("id").value);
    
    db.collection("products").doc().detele()
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });  
}

const getListUsers = document.querySelector("#getListUsers");

db.collection("users").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        getListUsers.innerHTML +=
        "<td>" + doc.data().firstname + "</td><td>" + doc.data().lastname + "</td><td>" + doc.data().email + "</td>"
    });
});
// test.firestore.js

const getListProducts = document.querySelector("#getListProducts");

db.collection("products").orderBy('id').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        getListProducts.innerHTML +=
        "<td>"+ doc.data().id + "</td>" + "<td><img style='width: 50px; height: 50px' src='https://drive.google.com/thumbnail?id=${doc.data().img}&sz=w200-h200'>" + doc.data().img + "</td><td>" + doc.data().name + "</td><td>" + doc.data().price + "</td><td>" + doc.data().quantity + "</td><td>" + doc.data().type + "</td><td></td><td></td>" + "<td><a href='update_product.html'>Sửa</a></td>" + "<td><a href='delete_product.html'>Xóa</a></td>"
    });
});
















