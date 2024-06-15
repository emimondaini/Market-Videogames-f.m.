let baseURL = 'https://striveschool-api.herokuapp.com/api/product/';
let API_KEY = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWViMTliODJkN2IxMTAwMTkwZTc3MmEiLCJpYXQiOjE3MDk5MDYzNjAsImV4cCI6MTcxMTExNTk2MH0.9-L70LjfWKyObLgfGXgki_R8ZNINVwNH00qKduzgwM0";
/* --------------- */
let nameForm = document.getElementById('name');
let brandForm = document.getElementById('brand');
let priceForm = document.getElementById('price');
let imageURLForm = document.getElementById('imagineURL');
let descriptionForm = document.getElementById('description');
let resetBtn = document.getElementById('resetBtn'); 
let submitBtn = document.getElementById('submitBtn'); 
let newProduct = {};

const searchProduct = async () => {
    try {
        let response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                Authorization: API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });
        const data = await response.json();
        console.log(data); 
    } catch (error) {
        console.log(error);
    }
};


submitBtn.addEventListener('click', async function(e) {
    e.preventDefault(); 
try {

    if (!(nameForm.value && brandForm.value && priceForm.value && descriptionForm.value && imageURLForm.value)) {
        alert('Completa tutti i campi!');
        return;
    }

   newProduct = {
        name: nameForm.value, 
        brand: brandForm.value, 
        price: priceForm.value,
        description: descriptionForm.value,
        imageUrl : imageURLForm.value
    }

    await searchProduct(newProduct);
    
    window.location.href = 'home.html'

} catch (error) {
    console.log(error);
}
    
});