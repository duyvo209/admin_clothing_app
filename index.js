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

const getListUsers = document.querySelector("#getListUsers");

db.collection("users").get().then(function(querySnapshot) {
   querySnapshot.forEach(function(doc) {
       getListUsers.innerHTML +=
       "<td>" + doc.data().firstname + "</td><td>" + doc.data().lastname + "</td><td>" + doc.data().email + "</td>"
   });
});
// test.firestore.js

function handleChageStatus(userId, thisSelect) {
    console.log(userId)
    const statusValue = thisSelect.value;
    console.log(statusValue)
}

//zaconst updateStatusOrders = (userId, statusValue) => db.collection("orders").doc(userId).update(statusValue);


const getListOrders = document.querySelector("#getListOrders");

function updateDataIntoTable(data){
    const statusName = ['Cancel','Ordered', 'Received']
    getListOrders.innerHTML +=
    "<td>" + data.userId + "</td><td>" + data.name + "</td><td>" 
    + data.carts.map(item => item.product.name) + "</td><td>" 
    + data.phone + "</td><td>" + data.address
     + "</td><td>" + data.total + "</td><td>" 
     + `<select key='${data.userId}' onchange="handleChageStatus('${data.userId}', this)" class="select-status">
            <option ${data.status === 0 ? 'selected' : ''} value='0'>Cancel</option>
            <option ${data.status === 1 ? 'selected' : ''} value='1'>Ordered</option>
            <option ${data.status === 2 ? 'selected' : ''} value='2'>Received</option> 
     </select>` + "</td>";

}


db.collection("orders").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        //console.log(doc.data())
        updateDataIntoTable(doc.data())

    });
    console.log(getListOrders.innerHTML);
});


const updateForm = document.getElementById('update-form');

let editStatus = false;

const getUpdate = id => db.collection('products').doc(id).get();
const updateData = (id, updateData) => db.collection('products').doc(id).update(updateData);

const deleteData = id => db.collection('products').doc(id).delete();

const getListProducts = document.querySelector("#getListProducts");

db.collection("products").orderBy('id').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        const docProduct = doc.data();
        docProduct.id = doc.id;
        console.log(docProduct);

        getListProducts.innerHTML +=
        "<td>"+ doc.data().id + "</td><td>" + doc.data().name + "</td><td>" + doc.data().price + "</td><td>" + doc.data().quantity + "</td><td>" + doc.data().type + "</td>" + `<td><button class='btn-update' data-id=${docProduct.id}>Sửa</button></td>` + `<td><button class='btn-delete' data-id=${docProduct.id}>Xóa</button></td>`
        
        const btnUpdate = document.querySelectorAll('.btn-update');
        btnUpdate.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const doc = await getUpdate(e.target.dataset.id);
                const updateProduct = doc.data();
                console.log(doc.data())
                window.location.href = 'update_product.html';
                updateForm['id'].value = updateProduct.id;
                updateForm['tensanpham'].value = updateProduct.name;
                updateForm['soluong'].value = updateProduct.quantity;
                updateForm['loai'].value = updateProduct.type;
                updateForm['gia'].value = updateProduct.price;
                updateFrom['mota'].value = updateProduct.desc;
                updateForm['anh'].value = updateProduct.img;
            })
        })

        const btnDelete = document.querySelectorAll('.btn-delete');
        btnDelete.forEach(btn => {
            btn.addEventListener('click', (e) => {
                deleteData(e.target.dataset.id)
            })
        })
    });
});

updateForm.addEventListener('submit', async (e) => {
    e.preventDefault;

    const id = updateForm['id'];
    const name = updateForm['tensanpham'];
    const quantity = updateForm['soluong'];
    const type = updateForm['loai'];
    const price = updateForm['gia'];
    const desc = updateForm['mota'];
    const image = updateForm['anh'];

    // try {
    //     if (!editStatus) {
    //         await addData(id.value, name.value, quantity.value, type.value, price.value, desc.value, image.value);
    //     } else {
    //         await updateData(id, {
    //             id: id.value, 
    //             name: name.value, 
    //             quantity: quantity.value, 
    //             type: type.value, 
    //             price: price.value, 
    //             desc: desc.value, 
    //             image: image.value
    //         })
    //         editStatus= false;
    //     }
    // } catch (error) {
    //     console.log(error);
    // }
});














