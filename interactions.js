function buttonPress(button) {
    button.classList.toggle("active")
}
var grid = document.querySelector(".grid")
var gridElements = grid.getElementsByTagName('div')
console.log(gridElements)
for (let i=0; i < gridElements.length; i++) {
    console.log(gridElements[i])
    gridElements[i].addEventListener("click", () => buttonPress(gridElements[i]))
}