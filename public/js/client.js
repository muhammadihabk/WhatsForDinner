let onGenerationFormSubmission = (e) => {
    let formData = new FormData(generationForm);
    let [formParameters] = formData;
    const options = {
        method: 'POST',
        body: formData
    };
    fetch('/app/generate_meal', options)
    .then((res) => {
        if(!res.ok) { throw new Error(`HTTP error. Status ${res.status}`) }
        return res.json();
        })
        .then((data) => {
            let dishesDiv = document.querySelector('.dishes');
            dishesDiv.innerHTML = '';
            let totalPrice = 0;
            let dishes = data.data;
            const choosenDishes = [];
            let currDish = '';
            let i = 0;
            for(let dish of dishes) {
                if(dish.DishName !== currDish) {
                    currDish = dish.DishName;
                    let temp = ['', 0];
                    temp[0] = currDish;
                    choosenDishes[i] = temp
                    i++;
                }
                totalPrice += parseFloat(dish.Price);
            }
            if(typeof formParameters !== 'undefined' && formParameters[0] === 'ingredients') {
                currDish = '';
                let i = 0;
                for(let dish of dishes) {
                    if(choosenDishes[i][0] === dish.DishName) {
                        choosenDishes[i][1] += parseFloat(dish.Price);
                        choosenDishes[i].push(dish.IngredientName);
                    } else {
                        i++;
                    }
                }
            }
            choosenDishes.forEach(dish => {
                let dishPara = document.createElement('p');
                dishPara.innerHTML = `<b>${dish[0]}</b>`;
                if(typeof formParameters !== 'undefined' && formParameters[0] === 'ingredients') {
                    dishPara.innerHTML += ': ';
                    let dishPrice = dish[1];
                    dish.splice(1, 1);
                    for(let i = 1; i < dish.length; i++) {
                        dishPara.innerHTML += `${dish[i]}`;
                        if(i < dish.length - 1) {
                            dishPara.innerHTML += ', ';
                        }
                    }
                    dishPara.innerHTML += `<br><b>Price</b>: ${dishPrice.toFixed(2)}`;
                }
                dishesDiv.append(dishPara);
            });
            let actionsDiv = document.querySelector('.actions');
            actionsDiv.classList.remove('hide');
            totalPrice = totalPrice.toFixed(2);
            let totalPriceDiv = document.querySelector('.total-price');
            totalPriceDiv.innerHTML = '';
            let pricePara = document.createElement('p');
            pricePara.innerHTML = `Total<br>${totalPrice} EGP`;
            totalPriceDiv.append(pricePara);
        })
        .catch((error) => {
            console.log(`error using catch: ${error.message}`);
        });
    e.preventDefault();
};

const generationForm = document.querySelector('.generation-form');
generationForm.addEventListener('submit', onGenerationFormSubmission);

document.addEventListener('keydown', (e) => {
    if(e.code === 'Space') {
        onGenerationFormSubmission(e);
    }
});

// Search for a dish
const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', (e) => {
    const formData = new FormData(searchForm);
    const options = {
        method: 'POST',
        body: formData
    }
    fetch('/app/search', options)
    .then((res) => {
        if(!res.ok) { throw new Error(`HTTP error. States: ${res.status}`) }
        return res.json();
    })
    .then((data) => {
        let dishesDiv = document.querySelector('.dishes');
        let tuples = data.data;
        let totalPrice = 0;
        let ingredients = [];
        for(const tuple of tuples) {
            ingredients.push(tuple.IngredientName);
            totalPrice += parseFloat(tuple.Price);
        }
        dishesDiv.innerHTML = `<b>${tuples[0].DishName}</b>${ingredients.join(', ')}`;
        let totalPriceDiv = document.querySelector('.total-price');
        totalPriceDiv.innerHTML = '';
        let pricePara = document.createElement('p');
        pricePara.innerHTML = totalPrice.toFixed(2);
        totalPriceDiv.append(pricePara);
    });
    e.preventDefault();
});