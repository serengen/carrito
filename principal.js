const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}
//ESPERA A CARGARSE TODO EL HTML
document.addEventListener('DOMContentLoaded', () => { 
    fetchData()
})
cards.addEventListener('click', e => {
    addCarrito(e)
})

items.addEventListener('click', e =>{
    btnAccion(e)
})
//CARGO LOS DATOS
const fetchData = async () => {
    try {
        const res = await fetch('https://arquitectura2-api.herokuapp.com/products')
        const data = await res.json()
        imprimirCards(data)
    } catch (error) {
        console.log(error);
    }
}

const imprimirCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.name
        templateCard.querySelector('p').textContent = producto.price
        templateCard.querySelector('img').setAttribute("src", producto.url)
        templateCard.querySelector('.btn-dark').dataset.id = producto._id
        templateCard.querySelector('p').dataset.stock = producto.stock
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    });
    cards.appendChild(fragment) 
}

const addCarrito = e =>{
    //SI HAGO CLICK EN 'BTN-DARL' DA TRUE, SINO FALSE
    // console.log(e.target.classList.contains('btn-dark'))
    if(e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    const producto = {
        _id: objeto.querySelector('.btn-dark').dataset.id,
        name: objeto.querySelector('h5').textContent,
        price: objeto.querySelector('p').textContent,
        stock: objeto.querySelector('p').dataset.stock,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto._id)){
        producto.cantidad = carrito[producto._id].cantidad + 1
    }
    //EMPUJO EL ELEMENTO DENTRO DEL CARRITO
    carrito[producto._id] = {...producto}
    imprimirCarrito()
}

const imprimirCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto =>{
        
        templateCarrito.querySelector('th').textContent = producto._id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.name
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad

        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.price
        
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    imprimirFooter()
}

const imprimirFooter = () => {
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `
        return
    }
    const nCantidad = Object.values(carrito).reduce((acumulador, {cantidad}) => acumulador + cantidad ,0)
    const nPrecio = Object.values(carrito).reduce((acumulador, {cantidad, price}) => acumulador + cantidad * price ,0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', ()=>{
        carrito = {}
        imprimirCarrito()
    })
}
const btnComprar = document.getElementById('comprar-carrito')

btnComprar.addEventListener('click', ()=> {
    if (Object.keys(carrito).length === 0) {
        return
    }
    Object.values(carrito).forEach(producto =>{
        final = producto.stock - producto.cantidad
        fetch('https://arquitectura2-api.herokuapp.com/products/'+ producto._id,{
            method: 'PUT',
            window: 0,
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                'stock': final,
            })
        }).then(res => res.json())
        .then(data => {
            if(!localStorage.getItem('token2')){
                window.location.replace("index.html")
            }
        })
        .catch(err => console.log(err))
    })
    carrito = {}
    imprimirCarrito()
    return
})

const btnLogout = document.getElementById('logout')
btnLogout.addEventListener('click', ()=> {
    if(localStorage.getItem('token2')){
        localStorage.clear('token2')
        window.location.replace("index.html")
    }
})


const postData = async () => {
    try {
        const res = await post('https://arquitectura2-api.herokuapp.com/products')
        const data = await res.json()
        imprimirCards(data)
    } catch (error) {
        console.log(error);
    }
}

const modDB = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.name
        producto.stock = producto.stock -1
        templateCard.querySelector('img').setAttribute("src", producto.url)
        templateCard.querySelector('.btn-dark').dataset.id = producto._id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
        
    });
    cards.appendChild(fragment) 


    

}
function alerta() {
    Object.values(carrito).forEach(producto =>{
        alert("¡Acaba de realizar la compra de "+producto.cantidad+" "+producto.name+" ");
    })
    
  }