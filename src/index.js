
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
  let whichSize = document.querySelector('input[name="size"]:checked').value;
  let selectionId = document.querySelector("button.cancel").id
  // let setData = localStorage.setItem("aDeliCart", JSON.stringify([selectionId]))
  let retrieveData = JSON.parse(localStorage.getItem("aDeliCart"))
  // localStorage.clear() //remove this for proper functionality
  debugger
  if (retrieveData && retrieveData.includes(selectionId)) {
    //update the quantity
    console.log(localStorage.getItem("aDeliCart"), "I'll update the quatity by one son.")
  } else if (retrieveData) {
    retrieveData.push(selectionId)
    localStorage.setItem("aDeliCart", JSON.stringify({
      selectionId: {
        regular: 1,
        large: 1
      }
    }))
    //set the local storage key to an array containing the item id and quatity
    console.log("This item is not included. But I have pushed it onto the array", localStorage.getItem("aDeliCart"))
  } else {
    localStorage.setItem("aDeliCart", JSON.stringify({
      selectionId: {
        regular: 1,
        large: 1
      }
    }))
  }
}

//also need a removeItemFromCart function