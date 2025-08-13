import { menuArray } from "./data.js"

const orderList = document.getElementById('order-list')
const orderSection = document.getElementById('order-section')
const foodItems = document.getElementById('food-items')
const totalPrice = document.getElementById('total-price')

let orderArray = []
let total = 0

document.addEventListener('click', function(e){
    if (e.target.dataset.add){
        // add item to the order array, locating it by its ID
        orderArray.push(menuArray.filter((item => item.id == e.target.dataset.add))[0])
        if (orderArray.length == 1){
            orderSection.style.display = "flex"
        }
        renderOrder()
    }
    else if (e.target.dataset.remove) {
        orderArray.pop(menuArray.filter((item => item.id == e.target.dataset.add))[0])
        if (orderArray.length < 1){
            orderSection.style.display = "none"
        }
        renderOrder()
    }
})

function renderMenu(menuArray){
    let htmlString = ''

    menuArray.forEach((item) => {
        const { name, ingredients, price, emoji, id } = item
        htmlString += `    
            <li>           
            <div class="food">
                    <p class="food-icon">${emoji}</p>
                    <div>
                        <h2>${name}</h2>
                        <p class="ingredients">${ingredients.join(', ')}</p>
                        <p>$${price}</p>
                    </div>
                    <button class="add-btn" data-add="${id}">+</button>
                </div>
            </li>`
    })

    foodItems.innerHTML = htmlString
}

function renderOrder() {
    let htmlString = ''

    orderArray.forEach((item) =>{
        const { name, price, id } = item
        htmlString += `
            <li class="order-item">
                <h2>${name}</h2>
                <button class="remove-btn" data-remove="${id}">remove</button>
                <p>$${price}</p>
            </li>`
    })

    total = orderArray.reduce((total, item) =>{
        return total + item.price
    }, 0)

    console.log(typeof total)

    orderList.innerHTML = htmlString
    totalPrice.innerText = `$${total}`
}

renderMenu(menuArray)