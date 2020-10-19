const url = "http://localhost:3000/categories"


document.addEventListener("DOMContentLoaded", () => {
  fetchUrl()
})

function fetchUrl(){
  fetch(url, {})
  .then(response => response.json())
  .then(console.log)
}

fetchUrl()
console.log("hello")