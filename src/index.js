
//USEFUL VARIABLES FOR MENU DISPLAY
const itemsUrl = "http://localhost:3000/items"
const categoriesUrl = "http://localhost:3000/categories"
const categoriesMenuList = document.querySelector("#menu-categories-ul")
const itemsInCategoryContainer = document.querySelector("#eat")
const currentMenuHeader = document.querySelector("#current-menu")


function fetchCategories(){
  fetch(categoriesUrl, {})
  .then(response => response.json())
  .then(categories => {
    currentMenuHeader.innerText = categories[0].name
    displayItemsForCategory(categories[0])
    categories.forEach(category => {
      let menuLi = document.createElement("li")
      menuLi.classList.add("category-menu-item")
      menuLi.innerText = `${category.name}`
      categoriesMenuList.append(menuLi)
      menuLi.addEventListener("click", () => {
        currentMenuHeader.innerText = category.name
        displayItemsForCategory(category)
      })
    })
  })
}
fetchCategories()

const displayItemsForCategory = (category) => {
  clearChildNodes(itemsInCategoryContainer)
  category.items.forEach((item) => {
    //set-up for item name
    let itemName = document.createElement("h5")
    let itemNameContainer = document.createElement("span")
    itemNameContainer.classList.add("item-name")
    itemNameContainer.id = item.id

    //set-up for item description info
    let itemDescription = document.createElement("p")
    itemDescription.classList.add("w3-text-grey", "item-description")

    //create 'add to cart' button
    let addMenuItem = document.createElement("button")
    addMenuItem.classList.add("add-menu-item")
    addMenuItem.innerText = "Add To Cart"
    
    //add data to nodes
    itemNameContainer.innerText = item.name
    itemInfoFormat(item, itemDescription)
    itemName.append(itemNameContainer)
    itemsInCategoryContainer.append(itemName, itemDescription, addMenuItem)

    addMenuItem.addEventListener("click", () => {
      openForm(item)
    })
  })
}

const itemInfoFormat = (item, itemDescription) => {

  if (item.description && item.regular && item.large) {
    itemDescription.innerHTML =  `${item.description} <br> ${formatter.format(item.regular)} &nbsp; ${formatter.format(item.large)}`
  }
  else if (item.description && item.regular) {
    itemDescription.innerHTML = `${item.description} <br> ${formatter.format(item.regular)}`
  }
  else if (item.description && item.large) {
    itemDescription.innerHTML = `${item.description} <br> ${formatter.format(item.large)}`
  }
  else if (item.regular && item.large) {
    itemDescription.innerHTML =  `${formatter.format(item.regular)} ${formatter.format(item.large)}`
  }
  else if (item.regular) {
    itemDescription.innerHTML =  `${formatter.format(item.regular)}`
  }
  else {
    itemDescription.innerHTML =  `${formatter.format(item.large)}`
  }
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})


const clearChildNodes = (targetNode) => {
  while (targetNode.firstChild) (
    targetNode.firstChild.remove()
  )
}

function openForm(selection) {
  document.getElementById("sizeChoice").style.visibility = "visible"
  let itemSelection = document.querySelector("button.cancel")
  itemSelection.id = selection.id
}

function closeForm() {
  document.getElementById("sizeChoice").style.visibility = "hidden"
}

const submitOrderToCart = () => {
  document.getElementById("sizeChoice").style.visibility = "hidden"
  let whichSize = document.querySelector('input[name="size"]:checked').value;
  let selectionId = document.querySelector("button.cancel").id
  let retrieveData = JSON.parse(localStorage.getItem("aDeliCart"))

  // build an object to put into an array
  let sizeChoice = {}
  sizeChoice[whichSize] = 1
  let id = {}
  id[selectionId] = sizeChoice
  let handled = "not yet"
  
  if (retrieveData) {
    //consider refactoring to us 'of' instead of 'in'
    for (let k in retrieveData) {
      if (Object.keys(retrieveData[k]).includes(Object.keys(id)[0])) {
        if (retrieveData[k][Object.keys(id)[0]][whichSize] === undefined) {
          retrieveData[k][Object.keys(id)[0]][whichSize] = 1
          localStorage.setItem("aDeliCart", JSON.stringify(retrieveData))
          handled = "yes"
          break
        } else {
          handled = "yes"
          retrieveData[k][Object.keys(id)[0]][whichSize] += 1
          localStorage.setItem("aDeliCart", JSON.stringify(retrieveData))
          break
        }
      }
    }

    if (handled === "not yet") {
      retrieveData.push(id)
      localStorage.setItem("aDeliCart", JSON.stringify(retrieveData))
    }
  } else {
    localStorage.setItem("aDeliCart", JSON.stringify([id]))
  }
  document.querySelector("form.add-to-cart-form").reset()
}

//DISPLAY CART
let seeCartBtn = document.querySelector("button#see-cart-btn")
seeCartBtn.addEventListener("click", () => {
  displayCart()
})


const displayCart = () => {
  let shoppingCart = document.querySelector("div#shopping-cart")
  clearChildNodes(shoppingCart)
  //making a close button
  let closeCartBtn = document.createElement("button")
  closeCartBtn.type = "button"
  closeCartBtn.classList.add("close-cart")
  closeCartBtn.innerText = "Close"
  closeCartBtn.addEventListener("click", () => {
    closeShoppingCart()
  })

  //fetch and parse data
  fetch(itemsUrl, {})
  .then(resp => resp.json())
  .then(items => {
    let retrieveLocalData = JSON.parse(localStorage.getItem("aDeliCart"))
    let totalContainer = document.createElement("p")
    let cartTotalBeforeTax = 0
    let itemQuantity
    let itemName

    for (choice of retrieveLocalData) {
      choiceId = parseInt(Object.keys(choice)[0])
      
      for (item of items) {
        if (item.id === choiceId) {
          let itemDiv = document.createElement("h6")
          let nameContainer = document.createElement("p")
          let quantityContainer = document.createElement("p")

          itemName = item.name
          let regularQuantity = choice[choiceId]["regular"]
          let largeQuantity = choice[choiceId]["large"]
          cartTotalBeforeTax += (item.regular * regularQuantity) + (item.large * largeQuantity)

          nameContainer.innerText = itemName
          quantityContainer.innerText = `Regular: ${regularQuantity} \n Large: ${largeQuantity}`
          itemDiv.append(nameContainer, quantityContainer, totalContainer)
          shoppingCart.append(itemDiv)
        }

      }

    }
    totalContainer.append(cartTotalBeforeTax)
    shoppingCart.append(totalContainer, closeCartBtn)
    shoppingCart.style.visibility = "visible"
  })
}

function closeShoppingCart() {
  document.getElementById("shopping-cart").style.visibility = "hidden"
}

//also need a removeItemFromCart function