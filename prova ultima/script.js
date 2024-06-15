// per il button back office
document.getElementById("backOfficeBtn").addEventListener("click", function () {
    window.location.href = "backOffice.html";
});

// metto in variabili l'url e l'authorization
let baseURL = 'https://striveschool-api.herokuapp.com/api/product/';
let API_KEY = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWViMTliODJkN2IxMTAwMTkwZTc3MmEiLCJpYXQiOjE3MDk5MDYzNjAsImV4cCI6MTcxMTExNTk2MH0.9-L70LjfWKyObLgfGXgki_R8ZNINVwNH00qKduzgwM0";



// Funzione asincrona per aggiungere un prodotto
const addProduct = async (baseURL) => {
    try {
        let response = await fetch(baseURL, {
            method: 'GET',
            headers: {
                Authorization: API_KEY,
                'Content-Type': 'application/json'
            },
        });

        data = await response.json();
        console.log('Product added:', data);
        return data

    } catch (error) {
        console.log('Error adding product:', error);
    }
};


// Funzione per stampare le card dei prodotti
let box = document.getElementById('box');
const stampaCard = async () => {
    try {
        await addProduct(baseURL);
        wait.style.display = 'none';

        let cardsHTML = '';

        data.forEach((item) => {
            cardsHTML += `
          <div class="card m-4 shadow overflow-y-auto" style="width: 20em; height: 20em">
            <img src=${item.imageUrl} class="card-img-top w-50 mt-2 align-self-center" alt=" ${item.name}">
               <div class="card-body">
                 <h5 class="card-title fs-4 mt-2" id="glow_black">${item.name}</h5>
                 <p class="card-text">${item.description}</p>
                 <a href="#" class="btn btn-outline-info shadow" onclick="showProduct('${item._id}')">See more </a>
                 <a href="modify.html?id=${item._id}" class="btn btn-outline-secondary shadow">Modify </a>
               </div>
           </div>`
        });

        box.innerHTML = cardsHTML;
    } catch (error) {
        console.log('Errore durante la stampa delle carte:', error);
    }
}

// Funzione per mostrare i dettagli di un prodotto
const detailProduct = (data) => {
    const close = document.getElementById('close');
close.style.display = 'initial'
    let boxDetail = document.getElementById('boxDetail');
    boxDetail.innerHTML =
        `<div class="card m-4 shadow-lg" style="width: 29rem;">
            <img src=${data.imageUrl} class="card-img-top w-50 mt-2 align-self-center" alt=" ${data.name}">
                <div class="card-body">
                 <h5 class="card-title fs-4 mt-2">${data.name}</h5>
                 <p class="card-text display-5">${data.price}&euro; </p>
                    <p class="card-text">${data.description}</p>
                <a class="btn btn-outline-dark" id="closeLink">Close </a>
                </div>
        </div>`

        // Aggiunge un listener per il click sul pulsante "Close"
        document.getElementById('closeLink').addEventListener('click', function(e) {
            e.preventDefault()

            close.style.display = 'none'; 
        })
}

// Funzione per mostrare i dettagli di un prodotto quando si fa clic su "See more"
const showProduct = async (productId) => {
    try {
        const data = await addProduct(`${baseURL}${productId}`);
        console.log(data);
        if (data) {
            detailProduct(data);
        }
    } catch (error) {
        console.log(error)
    }
}


stampaCard();