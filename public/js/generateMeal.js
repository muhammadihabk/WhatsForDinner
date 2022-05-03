let onGenerationFormSubmission = (e) => {
    let formData = new URLSearchParams(new FormData(generationForm));
    fetch(`/app/dishes?${formData.toString()}`)
    .then((res) => {
        if(!res.ok) { throw new Error(`HTTP error. Status ${res.status}`) }
        return res.json();
    })
    .then((data) => {
        let dishesDiv = document.querySelector('.dishes');
        dishesDiv.innerHTML = '';
        let hasIngredients = false;
        formData.forEach(element => {
            if(element === 'ingredients') {
                hasIngredients = true;
                return;
            }
        });
        let currDish = '';
        let totalPrice = 0;
        let dishPrice = 0;
        let dishPara = document.createElement('p');
        data.forEach(dish => {
            if(!hasIngredients) {
                if(currDish !== dish['DishName']) {
                    if(dishPara.innerHTML !== '') {
                        dishesDiv.append(dishPara);
                    }
                    dishPara = document.createElement('p');
                    dishPara.innerHTML = `<b>${dish['DishName']}</b>`;
                    currDish = dish['DishName'];
                }
            } else {
                if(currDish !== dish['DishName']) {
                    if(dishPara.innerHTML !== '') {
                        dishPara.innerHTML += `<br><b>Price</b>: ${dishPrice.toFixed(2)}`;
                        dishPrice = 0;
                        dishesDiv.append(dishPara);
                    }
                    dishPara = document.createElement('p');
                    dishPara.innerHTML = `<b>${dish['DishName']}</b>`;
                    dishPara.innerHTML += ': ';
                    currDish = dish['DishName'];
                }
                dishPara.innerHTML += `${dish['IngredientName']} `;
                dishPrice += parseFloat(dish['Price']);
            }
            totalPrice += parseFloat(dish['Price']);
        });
        if(hasIngredients) {
            dishPara.innerHTML += `<br><b>Price</b>: ${dishPrice.toFixed(2)}`;
        }
        dishesDiv.append(dishPara);
        // total price HTML
        totalPrice = totalPrice.toFixed(2);
        let totalPriceDiv = document.querySelector('.total-price');
        let pricePara = document.createElement('p');
        pricePara.innerHTML = `Total<br>${totalPrice} EGP`;
        totalPriceDiv.innerHTML = '';
        totalPriceDiv.append(pricePara);
    })
    .catch((error) => {
        console.log(`error using catch: ${error.message}`);
    });
    e.preventDefault();
};

const generationForm = document.querySelector('.generation-form');
generationForm.addEventListener('submit', (e) => {
    onGenerationFormSubmission(e)
});

document.addEventListener('keydown', (e) => {
    if(e.code === 'Space') {
        onGenerationFormSubmission(e);
    }
});