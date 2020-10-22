
const updateOrderUrl = "http://localhost:3000/orders/"

//USEFUL VARIABLES FOR MENU DISPLAY
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
    itemDescription.classList.add("w3-text-grey")
    
    //add data to nodes
    itemNameContainer.innerText = item.name
    itemInfoFormat(item, itemDescription)
    itemName.append(itemNameContainer)
    itemsInCategoryContainer.append(itemName, itemDescription)

    itemNameContainer.addEventListener("click", () => {
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
  document.getElementById("sizeChoice").style.display = "block";
  let itemSelection = document.querySelector("button.cancel")
  itemSelection.id = selection.id
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

const submitOrderToCart = () => {
  let selectionId = document.querySelector("button.cancel").id
  localStorage.clear()
  if (localStorage.getItem("aDeliCart")) {
    //use the value stored at key 'aDeliCart' to get their order
  // fetch()
  console.log(localStorage.getItem("aDeliCart"))
  } else {
    //set the local storage key and create a new order with name: and price:
    localStorage.setItem("aDeliCart", selectionId)
    fetch(updateOrderUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "hyrum",
        price: 8.99
      })
    })
    .then(resp => resp.json())
    .then(data => console.log)

  }
}