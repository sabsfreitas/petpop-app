$(document).ready(function() {
    const products = [
        { id: 1, name: "Cama quentinha", tag: "Para doguinhos", image: "public/assets/heated-dog-bed.jpg", price: 80.00 },
        { id: 2, name: "Whiskas", tag: "Para gatinhos", image: "public/assets/whiskas.png", price: 20.00 },
        { id: 3, name: "Cama quentinha", tag: "Para doguinhos", image: "public/assets/heated-dog-bed.jpg", price: 80.00 },
        { id: 4, name: "Cama quentinha", tag: "Para doguinhos", image: "public/assets/heated-dog-bed.jpg", price: 80.00 }
    ];

    function generateHTML(product) {
        return `
        <section class="card">
                <div class="image-container">
                    <img src="${product.image}" alt="">
                        <div class="overlay">
                            <button class="cart-button" data-product-id="${product.id}">Adicionar ao carrinho</button>
                        </div>
                </div>
                    <div class="card-content">
                        <h4>${product.name}</h4>
                        <p class="tag">${product.tag}</p>
                        <p class="price">R$ ${product.price.toFixed(2)}</p>
                    </div>
        </section>
    `;
    }

    const openCart = $(".shopping"),
    closeCart = $(".close-shopping"),
    body = $("body"),
    cartContent = $(".cart-content"),
    cardsContainer = $(".cards"),
    total = $(".total"),
    quantity = $(".quantity"),
    modal = $("#payment-modal"),
    checkoutBttn = $(".checkout-bttn"),
    paymentBttn = $("input[type='submit']"),
    pixDiv = $("#pix"),
    cpfInput = $("input#payment-cpf"),
    anoInput = $("input#ano"),
    mesInput = $("input#mes"),
    cvcInput = $("input#cvc"),
    cardInput = $("input#payment-card"),
    nameInput = $("input#payment-name"),
    cardDiv = $("#credit-card");

    IMask(cpfInput[0], {
        mask: '000.000.000-00'  
    });
    
    IMask(cardInput[0], {
        mask: '0000 0000 0000 0000'
    });

    IMask(nameInput[0], {
        mask: /\p{L}+/u,
        prepareChar: str => str.toUpperCase(),
    });

    IMask(mesInput[0], {
        mask: IMask.MaskedRange,
      from: 1,
      to: 12,
      maxLength: 2,
    });
    IMask(anoInput[0], {
        mask: IMask.MaskedRange,
      from: 2000,
      to: 2090,
      maxLength: 4,
    });

    IMask(cvcInput[0], {
        mask: '000',
    });

    IMask(cvcInput[0], {
        mask: '000',
    });


    // paymentBttn.submit(function(event) {
    //     let cpfValue = cpfMask.unmaskedValue;
    //     console.log(cpfValue)

    // });

    products.forEach(function (product) {
        cardsContainer.append(generateHTML(product));
    });

    openCart.on("click", function () {
        body.addClass("active");
    });

    closeCart.on("click", function () {
        body.removeClass("active");
    });

    

    cardsContainer.on("click", ".cart-button", function () {
        const productId = $(this).data("product-id");
        addToCart(productId);
    });


    let cart = [];
    function addToCart(productId) {
        const productToAdd = products.find(product => product.id === productId);
    
        const existingItem = cart.find(item => item.id === productId);
    
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ 
                id: productId, 
                name: productToAdd.name, 
                price: productToAdd.price, 
                quantity: 1,
                image: productToAdd.image
            });
        }
        updateCart();
    }

    function updateParcelaOptions(totalAmount) {
        const selectParcelas = $("#parcelas");

        selectParcelas.empty();
        for (let i = 1; i <= 5; i++) {
            let option = $("<option>");
            let parcelaValue;
    
            if (i <= 3) {
                parcelaValue = totalPrice / i;
            } else {
                const juros = 0.03;
                const numeroParcelasComJuros = i - 3;
                parcelaValue = (totalPrice * (1 + juros) ** numeroParcelasComJuros) / i;
            }
    
            option.text(`${i}x de R$ ${parcelaValue.toFixed(2)}`);
            option.val(i);
    
            selectParcelas.append(option);
        }
    }
    let totalPrice = 0;
    function updateCart() {
        let totalQuantity = 0;
    
        const itemTextElement = cart.map(item => {
            totalQuantity += item.quantity;
            totalPrice += item.price * item.quantity;

            return `
                <div class="cart-item">
                    <div class="item-details">
                        <img src="${item.image}" alt="">
                        <p id="item-quantity">x ${item.quantity}</p>
                    </div>
                    <div class="item-text">
                        <h2>${item.name}</h2>
                        <p>R$ ${item.price.toFixed(2)}</p>
                    </div>
                </div>
            `;
        }).join('');
    
        cartContent.html(itemTextElement);
    
        quantity.text(totalQuantity);
        total.text(`Total: R$ ${totalPrice.toFixed(2)}`);

        updateParcelaOptions(totalPrice);
    }


    checkoutBttn.on("click", function () {
        modal.css("display", "block");
        modal.addClass("active");
    });

    $('.payment-method').on('click', function () {
        const paymentMethod = $(this).data('payment-method');
        selectPayment(paymentMethod);
    });

    function selectPayment(paymentMethod) {
        if (paymentMethod == "pix") {
         pixDiv.css("display", "block")
         cardDiv.css("display", "none");
        } else if (paymentMethod == "credit-card") {
        cardDiv.css("display", "block");
        pixDiv.css("display", "none");
        }
    }
});


