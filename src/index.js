
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
    let itemName = document.createElement("h5")
    let itemDescription = document.createElement("p")
    itemDescription.classList.add("w3-text-grey")
    itemName.innerText = item.name
    itemDescription.innerText =  `${item.description} \n ${item.regular} ${item.large}`

    itemsInCategoryContainer.append(itemName, itemDescription)
  })
}

const clearChildNodes = (targetNode) => {
  while (targetNode.firstChild) (
    targetNode.firstChild.remove()
  )
}