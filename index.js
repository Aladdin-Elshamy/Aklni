import {menuArray} from './data.js'
const menu = document.getElementById("menu");
const order = document.getElementById("order");
const totalCost = document.getElementById('total-cost');
const completeBtn = document.getElementById('complete-order');
const closeBtns = document.querySelectorAll(".payment-modal-close-btn");
let listItems = [];
if(listItems.length<=0){
    document.getElementById('confirm-order').classList.add('hidden')
}
menu.addEventListener("click",function(e){
    if(e.target.dataset.icon)
        addToCard(e.target.dataset.icon)
})
order.addEventListener("click",function(e){
    if(e.target.id == 'remove-button'){
        console.log(e.target.dataset.rm)

        removeFromCard(e.target.dataset.rm)
        console.log(e.target.dataset.rm)

    }
})
completeBtn.addEventListener("click",function(){
    document.getElementById('payment-modal').style.display = 'flex';
    document.querySelector("header").classList.add("blur");
    document.querySelector("main").classList.add("blur")
})
closeBtns.forEach((btn,index) => {
    btn.addEventListener("click",function(){
        document.getElementById('payment-modal').style.display = 'none';
        if(index == 2){
            listItems = [];
            renderOrder();
            document.getElementById('confirm-order').classList.add('hidden')
        }
        document.querySelector("header").classList.remove("blur");
        document.querySelector("main").classList.remove("blur")
        document.forms[0].reset()
    })
    
    
    
})
    
document.forms[0].addEventListener("submit",function(e){
    
    let checkInputs = 0;
    document.querySelectorAll("input").forEach(input => {
        if(input.value == '')
            checkInputs++;
    })
    console.log(e.type=='submit'&&checkInputs==0)
    if(e.type=='submit'&&checkInputs==0){
        e.preventDefault();            
        document.getElementById("before-complete").classList.add("hidden");

            document.getElementById("during-complete").classList.remove("hidden");
            closeBtns[1].disabled = true;

        setTimeout(function(){
            document.getElementById("during-complete").classList.add("hidden");
            document.getElementById("after-complete").classList.remove("hidden");
        },3000)
        setTimeout(function(){
            document.getElementById("during-complete").classList.add("hidden");
            document.getElementById("after-complete").classList.add("hidden");
            document.getElementById("before-complete").classList.remove("hidden");
            document.getElementById('payment-modal').style.display = 'none';
            listItems = [];
            renderOrder();
            document.getElementById('confirm-order').classList.add('hidden')
            document.querySelector("header").classList.remove("blur");
            document.querySelector("main").classList.remove("blur")
            document.forms[0].reset()
        },4500)
    }
})
function removeFromCard(itemID){
    console.log(listItems)
    listItems = listItems.filter(id => {
        return id != itemID})
    console.log(listItems)
    renderOrder();
    if(listItems.length<=0){
        document.getElementById('confirm-order').classList.add('hidden')
    }
}
function addToCard(itemID){
    if(!listItems.includes(itemID)){
        listItems.push(itemID);
        renderOrder();
    }
    if(listItems.length>0){
        document.getElementById('confirm-order').classList.remove('hidden')
    }
}
function getOrder(){
    let order = ``;
    let price = 0;
    for(let i = 0 ; i< listItems.length;i++){
        for(let j = 0 ; j< menuArray.length;j++){
        
        if(menuArray[j].id == (Number(listItems[i]))){
            price+=menuArray[j].price;
            order += `
                <div class='order-detail flex'>
                    <div class='order-detail-name flex'>
                        <h4 class='order-name normal'>
                            ${menuArray[j].name}
                        </h4>
                        <span class='remove-button normal' id='remove-button' data-rm='${listItems[i]}'>
                            remove
                        </span>
                    </div>
                    <h4 class='order-price normal'>$${menuArray[j].price}</h4>
                </div>
            `
        }
}
    };
    totalCost.innerHTML = `
    <h4 class='total-price normal'>Total price:</h4>
    <h4 class='total-price normal'>$${price}</h4>
    `;
    return order;
}
function getMenu(){
    return menuArray.map(menuItem => {
        const {name,
            ingredients,
            price,
            emoji,
            id} = menuItem;
        return `<section class='menu-item'>
            <div class='menu-item-pic'>
                ${emoji}
            </div>
            <div class='menu-item-detail'>
                <h3 class='item-name'>${name}</h3>
                <span class='item-ingredients'>
                    ${ingredients.join(", ")}
                </span>
                <h4 class='item-price'>$${price}</h4>
            </div>
            <div class='menu-item-icon' data-icon='${id}'>
                <i class="fa-regular fa-plus" data-icon='${id}'></i>
            </div>
        </section>
        
        `}).join('') 
}
function renderMenu(){
    document.getElementById('menu').innerHTML = getMenu()
}
function renderOrder(){
    document.getElementById('order').innerHTML = getOrder();

}
renderMenu()