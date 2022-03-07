
// Segunda Entrega Final 
// Carlos Martin
// Marzo 2022
// Carrito Pasteles Karly Cream 


const productos = [
    {
      nombre: "Devils Cake",
      precio: 320,
      imagen: "./images/DevilsCakeGrande.jpeg",
      id: 0,
    },
    {
      nombre: "Legume Chico",
      precio: 280,
      imagen: "./images/LegumeChico_8-10personas.jpeg",
      id: 1,
    },
    {
      nombre: "Mil Hojas Crujiente",
      precio: 500,
      imagen: "./images/MilHojasCrucientePasion.jpeg",
      id: 2,
    },
    {
      nombre: "Mil Hojas con Frutas",
      precio: 550,
      imagen: "./images/MilHojasFrutosRojos.jpeg",
      id: 3,
    },
    {
      nombre: "Red Velvet",
      precio: 330,
      imagen: "./images/red_Velvet.png",
      id: 4,
    },
    {
      nombre: "Tres Leches",
      precio: 400,
      imagen: "./images/TresLechesChico_8-10.jpeg",
      id: 5,
    },
  ];


  const container = document.querySelector(".container");
  const main = document.querySelector("#main");
  const sidebar = document.querySelector(".sidebar");
  const btnCarrito = document.querySelector(".btn-carrito");
  
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
  btnCarrito.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
  
  const cargarProductos = () => {
    productos.forEach((element) => {
      main.innerHTML += `
              <div class="caja" >
                <img class="caja--img" src="${element.imagen}">                
                <div class="caja--datos">
                  <p class="nombre">${element.nombre}</p>
                  <p class="precio"> $ <span>${element.precio}</span> </p>
                <button class="btn-agregar" data-id="${element.id}">Comprar</button>
                </div>  
              </div>`;
    });
    const btnAgregar = document.querySelectorAll(".btn-agregar");
    btnAgregar.forEach((e) =>
      e.addEventListener("click", (e) => {
        let cardPadre = e.target.parentElement;
  
        agregarAlCarrito(cardPadre);
      })
    );
  };
  
  const agregarAlCarrito = (cardPadre) => {
    let producto = {
      nombre: cardPadre.querySelector(".nombre").textContent,
      precio: Number(cardPadre.querySelector(".precio span").textContent),
      cantidad: 1,
      imagen: cardPadre.parentElement.querySelector("img").src,
      id: Number(cardPadre.querySelector("button").getAttribute("data-id")),
    };
  
    let productoEncontrado = carrito.find(
      (element) => element.id === producto.id
    );
  
    if (productoEncontrado) {
      productoEncontrado.cantidad++;
    } else {
      carrito.push(producto);
    }
    console.log(carrito);
    mostrarCarrito();
  };
  
  const mostrarCarrito = () => {
    sidebar.innerHTML = "";
    carrito.forEach((element) => {
      let { imagen, nombre, precio, cantidad, id } = element;
      sidebar.innerHTML += `
          <div class="caja--carrito" >
            <img class="caja-carrito-img" src="${imagen}">            
            <div class="caja--carrito--datos">
              <p class="nombre">${nombre}</p>
              <p class="cantidad">Cantidad: ${cantidad}</p>
              <p class="subtotal">Subtotal: $${precio * cantidad}</p>
              <p class="Precio"> $ <span>${precio}</span> </p>
            <button class="btn-restar" data-id="${id}">-</button>
            <button class="btn-borrar" data-id="${id}">BORRAR</button>            
            </div>  
          </div>`;
    });
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    aumentarNumeroCantidadCarrito();
  };
  
  const restarProducto = (productoRestar) => {
    let productoEncontrado = carrito.find(
      (element) => element.id === Number(productoRestar)
    );
    if (productoEncontrado) {
      productoEncontrado.cantidad--;
      if (productoEncontrado.cantidad === 0) {
        productoEncontrado.cantidad = 1;
      }
    }
    mostrarCarrito();
  };
  
  const borrarProducto = (productoBorrar) => {
    carrito = carrito.filter((element) => element.id !== Number(productoBorrar));
    mostrarCarrito();
  };
  
  const escucharBotonesSidebar = () => {
    sidebar.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-restar")) {
        restarProducto(e.target.getAttribute("data-id"));
      }
      if (e.target.classList.contains("btn-borrar")) {
        borrarProducto(e.target.getAttribute("data-id"));
      }
    });
  };
  
  const aumentarNumeroCantidadCarrito = () => {
    let total = carrito.reduce((acc, ite) => acc + ite.cantidad, 0);
    document.querySelector(".cantidad--carrito").textContent = total;
  };
  
  cargarProductos();
  mostrarCarrito();
  escucharBotonesSidebar();