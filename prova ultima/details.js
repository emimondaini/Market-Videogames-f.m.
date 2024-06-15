let baseURL = 'https://striveschool-api.herokuapp.com/api/product/';
let API_KEY = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWViMTliODJkN2IxMTAwMTkwZTc3MmEiLCJpYXQiOjE3MDk5MDYzNjAsImV4cCI6MTcxMTExNTk2MH0.9-L70LjfWKyObLgfGXgki_R8ZNINVwNH00qKduzgwM0";
/* --------------- */
let deleteBtn = document.getElementById('deleteBtn');
let submitBtn = document.getElementById('submitBtn');
let resetBtn = document.getElementById('resetBtn'); 
let nameForm = document.getElementById('name');
let brandForm = document.getElementById('brand');
let priceForm = document.getElementById('price');
let imageURLForm = document.getElementById('imagineURL');
let descriptionForm = document.getElementById('description');
const params = new URLSearchParams(window.location.search)
const id = params.get("id")
let changeProducts = {};

const getProduct = async () => {
    try {
        if (!id) {
            console.log("ID non trovato");
            return
        }
        const link = `${baseURL}${id}`
        let response = await fetch(link, {
            method: 'GET',
            headers: {
                Authorization: API_KEY,
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            loadProduct(data);
        }

    } catch (error) {
        console.log('error');
    }
}
getProduct();

const changeProduct = async () => {
    try {
        if (!id) {
            console.log("ID non trovato");
            return
        }
        const link = `${baseURL}${id}`
        let response = await fetch(link, {
            method: 'PUT',
            headers: {
                Authorization: API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changeProducts)
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log('error');
    }
}


submitBtn.addEventListener('click', async function (e) {
    e.preventDefault();
    try {

        if (!(nameForm.value && brandForm.value && priceForm.value && descriptionForm.value && imageURLForm.value)) {
            alert('Completa tutti i campi!');
            return;
        }
        

        changeProducts = {
            name: nameForm.value,
            brand: brandForm.value,
            price: priceForm.value,
            description: descriptionForm.value,
            imageUrl: imageURLForm.value
        }

        await changeProduct(changeProducts);
        window.location.href = 'index.html'

    } catch (error) {
        console.log(error);
    }

});

const deleteProduct = async () => {
    try {
        if (!id) {
            console.log("ID non trovato");
            return
        }
        const link = `${baseURL}${id}`
        let response = await fetch(link, {
            method: 'DELETE',
            headers: {
                Authorization: API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changeProducts)
        });
        if (response.ok) {
            console.log('prodotto eliminato!');
            window.location.href = 'index.html'
        }

    } catch (error) {
        console.log('error');
    }
}

const spinner = document.getElementById('spinner');
spinner.style.display = 'none'
deleteBtn.addEventListener('click', async function (e) {
    e.preventDefault();
    spinner.style.display = 'block'
    setTimeout(async () => {
        let conferma = confirm('Are you sure?');

        if (conferma) {
            await deleteProduct();
        }
        // Nascondi lo spinner dopo che l'utente ha risposto all'alert di conferma
        spinner.style.display = 'none';
    }, 100);
})

function loadProduct(data) {

    nameForm.value = data.name;
    brandForm.value = data.brand;
    priceForm.value = data.price;
    imageURLForm.value = data.imageUrl;
    descriptionForm.value = data.description;
}


// per il button back office
document.getElementById("backOfficeBtn").addEventListener("click", function () {
    window.location.href = "backOffice.html";
});