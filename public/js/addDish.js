// Populate ingredients' names HTML select element
fetch('/app/dishes/ingredients/names')
.then((res) => {
        if(!res.ok) { throw new Error(`Couldn't fetch ${res.status}`) }
        return res.json();
    })
    .then((data) => {
        const ingredientNameSelect = document.querySelector('#ingredientName');
        const ingredientNameSelectOptions = data.map((option) => {
            return `<option value="${option.IngredientName}">${option.IngredientName}</option>`
        });
        ingredientNameSelect.innerHTML = ingredientNameSelectOptions;
    });

const addDishForm = document.querySelector('.add-dish-form');
addDishForm.addEventListener('submit', (e) => {
    const formData = new FormData(addDishForm);
    const options = {
        method: 'POST',
        body: formData
    };
    fetch('/app/add-dish', options)
    .then((res) => {
        if(!res.ok) { throw new Error(`Couldn't fetch ${res.status}`) }
        const successMessage = document.querySelector('.insertion-success');
        successMessage.innerHTML = 'Success';
        successMessage.style.color = 'yellowgreen';
    });
    e.preventDefault();
});