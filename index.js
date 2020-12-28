// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
var id_doc_update = '';
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

function handleChageStatus(id, thisSelect) {
    // console.log(id)
    const statusValue = thisSelect.value;
    // console.log(statusValue)   
    updateStatusOrders(id, statusValue)
}

const updateStatusOrders = (id, statusValue) => db.collection("orders").doc(id).update({status: Number(statusValue)});

const getListOrders = document.querySelector("#getListOrders");

function getListDataIntoTable(data, id){
    const day = data.dateTime.toDate().getDate()
    const month = data.dateTime.toDate().getMonth()
    const year = data.dateTime.toDate().getFullYear()
    const hours = data.dateTime.toDate().getHours()
    const minutes = data.dateTime.toDate().getMinutes()

    const date = day + "-" + month + "-" + year + " " + hours + ":" + minutes



    const statusName = ['Chờ xác nhận','Đã xác nhận', 'Đang vận chuyển', 'Đã giao hàng'];
    getListOrders.innerHTML +=
    "<td>" + id + "</td><td>" + data.name + "</td><td>" 
    + data.carts.map(item => item.product.name + " (" + item.quantity + ")") + "</td><td>" 
    + date + "</td><td>" 
    + data.phone + "</td><td>" + data.address + "</td><td>" 
    + data.total + " $" + "</td><td>" 
    + `<select key='${id}' onchange="handleChageStatus('${id}', this)" class="select-status">
            <option ${data.status === 0 ? 'selected' : ''} value='0'>Chờ xác nhận</option>
            <option ${data.status === 1 ? 'selected' : ''} value='1'>Đã xác nhận</option>
            <option ${data.status === 2 ? 'selected' : ''} value='2'>Đang vận chuyển</option>
            <option ${data.status === 3 ? 'selected' : ''} value='3'>Đã giao hàng</option> 
     </select>` + "</td>";
}

db.collection("orders").orderBy('dateTime', 'desc').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // console.log(doc.data());
        getListDataIntoTable(doc.data(), doc.id)
    });
});

const getListSales = document.querySelector("#getListSales");


db.collection("orders").get().then(function(querySnapshot) {
    let data = [];
    let newData = [];
    let selectMonth = 1;
    if(Number(document.getElementById('selectMonth').value)) {
        selectMonth = Number(document.getElementById('selectMonth').value)
    }
    
    querySnapshot.forEach(function(doc) {
        if (doc.data().status == 3) { 
            doc.data().carts.map((value,i ) => {
                console.log(doc.data().dateTime.toDate().getMonth());
                const dt = {
                    name: value.product.name,
                    price:  value.product.price,
                    qty: value.quantity,
                    type: value.product.type,
                    date: doc.data().dateTime.toDate().getMonth()
                }
                if(doc.data().dateTime.toDate().getMonth() == selectMonth) {
                    data.push(dt);
                }
                
            })
           
        }  
    });
    // console.log(data);
    data.map(value => {
        let exist = -1;
        for(let i in newData) {
            if(String(newData[i].name) == String(value.name)) {
                exist = i;
            } 
        }
        
        if(exist == -1) {
            const dt = {
                name: value.name,
                price:  value.price,
                qty: value.qty,
                type: value.type,
            }
            newData.push(dt);
           
        } 

        else {
            const dt = {
                name: value.name,
                price:  value.price,
                qty: newData[exist].qty + value.qty,
                type: value.type,
            }

            newData[exist] = dt;
        }
        
    })


    // console.log(newData);
    var total = 0;
    newData.map(value => {
        total += value.price * value.qty;
        getListSales.innerHTML += 
        "<td>" + value.name + "</td>"
        + "<td>" + value.price + " $" + "</td>"
        + "<td>" + value.qty + "</td>"
        + "<td>" + value.type + "</td>"
        + "<td>" + value.price * value.qty + " $" + "</td>";
    });
    document.getElementById('total').innerHTML = total + " $";
});



// const updateForm = document.getElementById('update-form');

let editStatus = false;

const getUpdate = id => db.collection('products').doc(id).get();
// const updateData = (id, updateData) => db.collection('products').doc(id).update(updateData);

const updateData = (id) =>{
    console.log(id);
    db.collection('products').doc(id_doc_update).update({
        id: Number(document.getElementById("id").value),
        name: document.getElementById("tensanpham").value,
        quantity: Number(document.getElementById("soluong").value),
        type: document.getElementById("loai").value,
        price: Number(document.getElementById("gia").value),
        description: document.getElementById("mota").value,
        img: document.getElementById("anh").value
    });
}

const deleteData = id => db.collection('products').doc(id).delete();


const getListProducts = document.querySelector("#getListProducts");

db.collection("products").orderBy('id').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        const docProduct = doc.data();
        docProduct.id = doc.id;
        console.log(docProduct.id);

        getListProducts.innerHTML +=
        "<td>"+ doc.data().id + 
        "</td><td>" + doc.data().name + 
        "</td><td>" + doc.data().price + " $" + 
        "</td><td>" + doc.data().quantity + 
        "</td><td>" + doc.data().type + 
        "</td><td>" + doc.data().description +
        "</td>" + `<td><button  style='width: 50px; border: none; background: transparent; color: blue' class='btn-update' onclick='openModel("${docProduct.id}")'  data-id=${docProduct.id}>Sửa</button></td>` + `<td><button style='width: 50px; border: none; background: transparent; color: red' class='btn-delete' data-id=${docProduct.id}>Xóa</button></td>`
        
        // const btnUpdate = document.querySelectorAll('.btn-update');
        // btnUpdate.forEach(btn => {
        //     btn.addEventListener('click', async (e) => {
        //         id_doc_update = docProduct.id;
        //         $('#update-modal').modal();
        //         const doc = await getUpdate(e.target.dataset.id);
        //         const updateProduct = doc.data();
        //         // console.log(doc.data())
        //         console.log(updateProduct);

        //         document.getElementById("id").value = updateProduct.id
        //         document.getElementById("tensanpham").value = updateProduct.name;
        //         document.getElementById("soluong").value = updateProduct.quantity;
        //         document.getElementById("loai").value = updateProduct.type;
        //         document.getElementById("gia").value = updateProduct.price;
        //         document.getElementById("mota").value = updateProduct.description;
        //         document.getElementById("anh").value = updateProduct.img;
        //     })
        // })

        const btnDelete = document.querySelectorAll('.btn-delete');
        btnDelete.forEach(btn => {
            btn.addEventListener('click', (e) => {
                deleteData(e.target.dataset.id)
            })
        })
    });
});

function openModel(doc_id){
    console.log(doc_id);
    id_doc_update = doc_id;
    $('#update-modal').modal();
}















