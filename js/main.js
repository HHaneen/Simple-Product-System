//seclect all fields
let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCat = document.getElementById("productCat");
let productDesc = document.getElementById("productDesc");
let addProductBtn = document.getElementById("addProduct");
let searchProduct = document.getElementById("search");
let crrentIndex = null;
//check if local storage has Data
let productsContainer;
if (window.localStorage.getItem("myProducts") != null) {
  productsContainer = JSON.parse(window.localStorage.getItem("myProducts"));
  displayProducts();
} else {
  productsContainer = [];
}
//create function to add product
function addProduct() {
  let product = {
    name: productName.value.toLowerCase(),
    price: productPrice.value,
    cat: productCat.value.toLowerCase(),
    desc: productDesc.value.toLowerCase(),
  };
  if (crrentIndex == null) productsContainer.push(product);
  else {
    productsContainer[crrentIndex] = product;
    crrentIndex = null;
    addProductBtn.innerHTML = "addProduct";
  }
  window.localStorage.setItem("myProducts", JSON.stringify(productsContainer));
  clearFeilds();
  displayProducts();
}
//funtion to clear feilds
function clearFeilds() {
  productName.value = "";
  productPrice.value = "";
  productCat.value = "";
  productDesc.value = "";
}
//function to display products
function displayProducts() {
  let add = "";
  for (let i = 0; i < productsContainer.length; i++) {
    add += `
      <tr>
  <td> ${i + 1}</td>
  <td>${productsContainer[i].name}</td>
  <td>${productsContainer[i].price}</td>
  <td>${productsContainer[i].cat}</td>
  <td>${productsContainer[i].desc}</td>
  <td><button class="btn btn-outline-warning" onclick ="update(${i})">UpDate</button></td>
  <td><button class="btn btn-outline-danger" onclick ="deleteProduct(${i})" >Delete</button></td>
</tr>
    `;
  }
  document.getElementById("tbody").innerHTML = add;
}
//add event for addProduct "click"
addProductBtn.addEventListener("click", () => {
  //check if any feild is EMPTY
  if (
    productName.value != "" &&
    productPrice.value != "" &&
    productCat.value != "" &&
    productDesc.value != ""
  ) {
    addProduct();
  }
});
//function to delete ptoduct
function deleteProduct(index) {
  //deleted from the array but not from local storage then data will comeback after refresh
  productsContainer.splice(index, 1);
  //delet from local storage by updating local storage value
  window.localStorage.setItem("myProducts", JSON.stringify(productsContainer));
  displayProducts();
}
//add search function
function search(value) {
  let add = "";
  for (let i = 0; i < productsContainer.length; i++) {
    if (productsContainer[i].name.toLowerCase().includes(value.toLowerCase())) {
      add += `
    <tr>
<td> ${i + 1}</td>
<td>${productsContainer[i].name}</td>
<td>${productsContainer[i].price}</td>
<td>${productsContainer[i].cat}</td>
<td>${productsContainer[i].desc}</td>
<td><button class="btn btn-outline-warning" onclick ="update(${i})" >UpDate</button></td>
<td><button class="btn btn-outline-danger" onclick ="deleteProduct(${i})" >Delete</button></td>
</tr>
  `;
    }
  }
  document.getElementById("tbody").innerHTML = add;
}
//add function for update
function update(index) {
  productName.value = productsContainer[index].name;
  productPrice.value = productsContainer[index].price;
  productCat.value = productsContainer[index].cat;
  productDesc.value = productsContainer[index].desc;
  addProductBtn.innerHTML = "UpDate Value";
  //this variable for add updates value for the updated row
  crrentIndex = index;
}
