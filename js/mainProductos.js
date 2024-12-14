const divProductos = document.getElementById("divProductos");
const alertError=document.getElementById("alertError");
const URLMain="https://fakestoreapi.com/products";

function getData() {
    fetch(URLMain).then((response)=>{
        console.log(response);
        response.json().then((res)=>{
            createCards(res);
        })
        ;
    })
    .catch((err)=>{
        console.log(err);
        alertError.innerHTML=err;
        alertError.style.display= "block";
    })

}//getData


function createCards(res) {
    res.forEach((producto) => {
        divProductos.insertAdjacentHTML(
            "beforeend",
            `
            <div class="card shadow" style="width: 18rem;">
                <div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content: center; background-color: #f8f9fa;">
                    <img src="${producto.image}" alt="${producto.title}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${producto.title}</h5>
                    <h6>${producto.category}</h6>
                    <p class="card-text text-truncate" style="max-height: 4rem;">${producto.description}</p>
                    <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal" onclick="muestraProductosDetalles('${producto.id}')">Ver más</a>
                </div>
            </div>
            `
        );
    });
}

function muestraProductosDetalles(productId) {
    fetch(`${URLMain}/${productId}`)
        .then((response) => response.json())
        .then((producto) => {
            document.getElementById("modalProductoImagen").src = producto.image;
            document.getElementById("modalProductoTitulo").innerText = producto.title;
            document.getElementById("modalProductoCategoria").innerText = producto.category;
            document.getElementById("modalProductoDescripcion").innerText = producto.description;
            document.getElementById("modalProductoPrecio").innerText = `$${producto.price}`;
        })
        .catch((err) => {
            console.log("Error cargando productos", err);
        });
}

getData();
