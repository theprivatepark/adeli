
//USEFUL VARIABLES FOR MENU DISPLAY
const categoriesUrl = "http://localhost:3000/categories"
//ask coach why below variable isn't accessible wiht fetchCategories function
const categoriesMenuList = document.querySelector("ul#menu-categories-ul")


// document.addEventListener("DOMContentLoaded", () => {
//   fetchCategories()
// })

function fetchCategories(){
  fetch(categoriesUrl, {})
  .then(response => response.json())
  .then(categories => {
    categories.forEach(category => {
      let menuLi = document.createElement("li")
      menuLi.classList.add("category-menu-item")
      menuLi.innerText = `${category.name}`
      categoriesMenuList.append(menuLi)
      menuLi.addEventListener("click", () => {
        displayItemsForCategory(category)
      })
    })
  })
}
fetchCategories()

const displayItemsForCategory = (category) => {
  
}

