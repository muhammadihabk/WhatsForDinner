// Search for a dish
const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', (e) => {
    const formData = new FormData(searchForm);
    const options = {
        method: 'POST',
        body: formData
    }
    fetch('/app/dishes/search', options)
    .then((res) => {
        if(!res.ok) { throw new Error(`HTTP error. States: ${res.status}`) }
        return res.json();
    })
    .then((data) => {
        let dishesDiv = document.querySelector('.dishes');
        let tuples = data;
        let totalPrice = 0;
        let ingredients = [];
        tuples.forEach(tuple => {
            ingredients.push(tuple.IngredientName);
            totalPrice += parseFloat(tuple.Price);
        });
        dishesDiv.innerHTML = `<b>${tuples[0].DishName}</b>${ingredients.join(', ')}`;
        let totalPriceDiv = document.querySelector('.total-price');
        totalPriceDiv.innerHTML = '';
        let pricePara = document.createElement('p');
        pricePara.innerHTML = totalPrice.toFixed(2);
        totalPriceDiv.append(pricePara);
    });
    e.preventDefault();
});