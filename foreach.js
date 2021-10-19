const ul = document.createElement('ul')
const continentes = ["America", "Africa", "Europa", "Asia"]

document.write("<h4>Continentes</h4>")
document.body.appendChild(ul)

continentes.forEach(el => {
    const li = document.createElement("li")
    li.textContent = el
    ul.appendChild(li)
});