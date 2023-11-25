$(document).ready(function() {
    $("#menu-sanduiche-1").on("click", function() {
        $(".sidebar").css("display", "flex");
    });

    $("#menu-sanduiche-2").on("click", function() {
        $(".sidebar").css("display", "none");
    });

    const products = [
        { id: 1, name: "Cama quentinha", tag: "Para doguinhos", image: "public/assets/heated-dog-bed.jpg", price: 80.00 },
        { id: 2, name: "Cama quentinha", tag: "Para doguinhos", image: "public/assets/heated-dog-bed.jpg", price: 80.00 },
        { id: 3, name: "Cama quentinha", tag: "Para doguinhos", image: "public/assets/heated-dog-bed.jpg", price: 80.00 },
        { id: 4, name: "Cama quentinha", tag: "Para doguinhos", image: "public/assets/heated-dog-bed.jpg", price: 80.00 },
        { id: 5, name: "Cama quentinha", tag: "Para doguinhos", image: "public/assets/heated-dog-bed.jpg", price: 80.00 }
    ];

    function generateHTML(product) {
        return `
        <section class="card">
                <div class="image-container">
                    <img src="${product.image}" alt="">
                        <div class="overlay">
                            <button class="cart-button" onclick="addToCart(${product.id})">Adicionar ao carrinho</button>
                        </div>
                </div>
                    <div class="card-content">
                        <h4>${product.name}</h4>
                        <p class="tag">${product.tag}</p>
                        <p class="price">R$${product.price.toFixed(2)}</p>
                    </div>
        </section>
    `;
    }

    let cardsContainer = $(".cards");
    products.forEach(function (product) {
        cardsContainer.append(generateHTML(product));
    });
});
