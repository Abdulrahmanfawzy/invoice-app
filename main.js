(function filter(){
    let filter_inpt = document.querySelector(".filter_inpt");
    let filter_label = document.querySelector(".filter_label");
    let filter_down = document.querySelector(".filter_label i");
    filter_label.addEventListener("click" , ()=>{
        filter_inpt.classList.toggle("active");
        filter_down.classList.toggle("icon_active");
    })
})();

// add new item 

(function addItem(){
    let add_new_item = document.getElementById("add_new_item");
    let item_list = document.querySelector(".item_list");
    let item = `
        <div class="item_flex">
        <div>
            <label for="item_name">
                Item Name
            </label>
            <input type="text" class="item_name">
        </div>

        <div>
            <label for="item_qty">
                Qty
            </label>
            <input type="text" class="item_qty">
        </div>
        <div>
            <label for="item_Price">
                Price
            </label>
            <input type="text" class="item_Price">
        </div>
        <div>
            <label for="item_total">
                total
            </label>
            <input class="item_total" value="0.00" readonly>
        </div>
        <div id="trash">
            <i class="fa-solid fa-trash"></i>
        </div>
        </div>
    `;
    add_new_item.addEventListener("click" , (e)=>{
        e.preventDefault();
        item_list.innerHTML += item;
    })
    item_list.innerHTML = item;
})();

// -------------------------------------------------------

// get data from user

let street_address = document.getElementById("street_address");
let bill_from_city = document.getElementById("bill_from_city");
let bill_from_Post = document.getElementById("bill_from_Post");
let bill_from_Country = document.getElementById("bill_from_Country");
let Client_Name = document.getElementById("Client_Name");
let Client_email = document.getElementById("Client_email");
let Client_street = document.getElementById("Client_street");
let bill_To_city = document.getElementById("bill_To_city");
let bill_To_Date = document.getElementById("bill_To_Date");
let bill_To_Payment = document.getElementById("bill_To_Payment");
let Project_Description = document.getElementById("Project_Description");
let item_name = document.querySelectorAll(".item_name");
let item_qty = document.querySelectorAll(".item_qty");
let item_Price = document.querySelectorAll(".item_Price");
let item_total = document.querySelectorAll(".item_total");
let submit_invoice = document.getElementById("submit_invoice");
let arr;


if(window.localStorage.getItem("invoice")){
    arr =  JSON.parse(window.localStorage.getItem("invoice"));
}else{
    arr = [];
}

itemInPage(arr);



function mywork(){
    submit_invoice.addEventListener("click" , ()=>{
        // if(street_address.value != "" && bill_from_city.value != "" && bill_from_Post.value != "" && bill_from_Country.value != "" && Client_Name.value != "" && Client_email.value != "" && Client_street.value != "" && bill_To_city.value != "" && bill_To_Date.value != "" && Project_Description.value != "" && item_name.value != "" && item_qty.value != "" && item_Price.value != "" && item_total.value){

            let item_flex = document.querySelectorAll(".item_flex");   
            
            let item_arr = [];
            for(let i = 0; i < item_flex.length; i++){
                let obj = {
                    item_name: item_flex[i].children[0].children[1].value,
                    item_qty: item_flex[i].children[1].children[1].value,
                    item_Price: item_flex[i].children[2].children[1].value,
                    item_total: item_flex[i].children[1].children[1].value *  item_flex[i].children[2].children[1].value
                }
                item_arr.push(obj);
                
            }
            

            let BillFrom = {
                BillFromInfo: {
                    street_address: street_address.value,
                    bill_from_city: bill_from_city.value,
                    bill_from_Post: bill_from_Post.value,
                    bill_from_Country: bill_from_Country.value
                },
                
                clientInfo: {
                    Client_Name: Client_Name.value,
                    Client_email: Client_email.value,
                    Client_street: Client_street.value
                },
                bill_To_city: bill_To_city.value,
                bill_To_Date: bill_To_Date.value,
                bill_To_Payment: bill_To_Payment.value,
                Project_Description: Project_Description.value,
                items: item_arr
                
            }
            
            

            addValuesToArray(BillFrom);
            street_address.value = "";
            bill_from_city.value = "" ;
            bill_from_Post.value = "" ;
            bill_from_Country.value = "" ;
            Client_Name.value = "" ;
            Client_email.value = "" ;
            Client_street.value = "" ;
            bill_To_city.value = "" ;
            bill_To_Date.value = "";
            Project_Description.value = "" ;
            item_name.value = "" ;
            item_qty.value = "";
            item_Price.value = "";
    //     }else{
    //         alert("fill all fields please..!");
    //     }
    
    invoice_fixed.style.display = "none";

    window.location.reload();
    })
    
}
mywork();



function addValuesToArray(BillFrom){
    arr.push(BillFrom);
    addArrayToLocal(arr);
}
// addArrayToLocalstorage
function addArrayToLocal(arr){
    window.localStorage.setItem("invoice" , JSON.stringify(arr));
}

let invoice_add = document.querySelector(".invoice_add");
let invoice_fixed = document.querySelector(".invoice_fixed");
invoice_add.addEventListener("click" , ()=>{
    invoice_fixed.style.display = "flex";
})
function sumItemTotal(index){
    let arrOfInvoice = JSON.parse(window.localStorage.getItem("invoice"));
    let totalArr = arrOfInvoice[index].items;
    let emptyarr = [];
    
    let c = totalArr.map((el)=>{
        emptyarr.push(el.item_total)
    })
    let sum = emptyarr.reduce((a, b) => a + b, 0);
    return sum;
}

// get array from local storage
function itemInPage(localarr) {
    let invoice_from_local = document.querySelector(".invoice_from_local");
    invoice_from_local.innerHTML = "";
    
    for(let i = 0; i < localarr.length; i++){
        
        let itemz = `
            <a href="details/index.html?${i}" class="invoice_item">
                <div>
                    <section>${i + 1}</section>
                    <section class="bill_date">${localarr[i].bill_To_Date}</section>
                    <section>${localarr[i].clientInfo.Client_Name}</section>
                    <div class="total">$${sumItemTotal(i)}</div>
                </div>
            </a>
            `
        invoice_from_local.innerHTML += itemz;
    }


}

// delete the item

invoice_fixed.addEventListener("click" , (e)=>{
    if(e.target.className == "fa-solid fa-trash"){
        e.target.parentElement.parentElement.remove();
    }
})

// close the invoice show

let shutdown = document.querySelector(".shutdown");

shutdown.addEventListener("click" , ()=>{
    invoice_fixed.style.display = "none";
})


// count the invoice 

let title_left = document.querySelector(".title_left p")
let y = JSON.parse(window.localStorage.getItem("invoice"));
if(y){
    title_left.innerHTML = `There Are ${y.length} Total Invoices`;
}







