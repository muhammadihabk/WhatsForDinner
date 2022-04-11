document.addEventListener('keydown', (e) => {
    if(e.code === 'KeyE') {
        // No ingredients
        fetch('/meal_no_ingredients')
        .then((res) => {
            if(!res.ok) { throw new Error(`HTTP error. Status ${res.status}`) }
            return res.json();
        })
        .then(data => {
            let dishesDiv = document.querySelector('.dishes');
            dishesDiv.innerHTML = '';
            let totalPrice = 0;
            let dishes = data.data;
            // Get 3 unique dishes
            let currDish = '';
            let choosenDishes = [
                [],
                [],
                [],
            ];
            let i = -1;
            for(let dish of dishes) {
                if(dish.DishName === currDish) {
                    choosenDishes[i].push(dish.IngredientName);
                } else {
                    currDish = dish.DishName;
                    i++;
                    choosenDishes[i].push(currDish);
                    choosenDishes[i].push(dish.IngredientName);
                }
                totalPrice += parseFloat(dish.Price);
            }
            choosenDishes.forEach(dish => {
                let para = document.createElement('p');
                para.innerHTML = `<b>${dish[0]}</b>: `;
                dishesDiv.append(para);
                for(let i = 1; i < dish.length; i++) {
                    para.innerHTML += `${dish[i]}`;
                    if(i < dish.length - 1) {
                        para.innerHTML += ', ';
                    }
                }
            });
            let actionsDiv = document.querySelector('.actions');
            actionsDiv.classList.remove('hide');
            totalPrice = totalPrice.toFixed(2);
            let totalPriceDiv = document.querySelector('.total-price');
            totalPriceDiv.innerHTML = '';
            let pricePara = document.createElement('p');
            pricePara.innerHTML = `Total<br>${totalPrice} EGP`;
            totalPriceDiv.append(pricePara);
        });
    }
});

let onFormSubmition = (e) => {
    let data = new FormData(form);
    let [arr] = data;
    let init = {
        method: 'POST',
        body: data
    };
    if(typeof arr !== 'undefined' && arr[0] === 'ingredients') {
        // Ingredients
        fetch('meal_ingredients', init)
        .then((res) => {
            if(!res.ok) { throw new Error(`HTTP error. Status ${res.status}`) }
            return res.json();
            })
            .then((data) => {
                let dishesDiv = document.querySelector('.dishes');
                dishesDiv.innerHTML = '';
                let totalPrice = 0;
                let dishes = data.data;
    
                // Get 3 unique dishes
                let currDish = '';
                let choosenDishes = [
                    [],
                    [],
                    [],
                ];
                let i = -1;
                for(let dish of dishes) {
                    if(dish.DishName === currDish) {
                        choosenDishes[i].push(dish.IngredientName);
                    } else {
                        currDish = dish.DishName;
                        i++;
                        choosenDishes[i].push(currDish);
                        choosenDishes[i].push(dish.IngredientName);
                    }
                    totalPrice += parseFloat(dish.Price);
                }
                choosenDishes.forEach(dish => {
                    let para = document.createElement('p');
                    para.innerHTML = `<b>${dish[0]}</b>: `;
                    dishesDiv.append(para);
                    for(let i = 1; i < dish.length; i++) {
                        para.innerHTML += `${dish[i]}`;
                        if(i < dish.length - 1) {
                            para.innerHTML += ', ';
                        }
                    }
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
    } else {
        // No ingredients
        fetch('/meal_no_ingredients', init)
        .then((res) => {
            if(!res.ok) { throw new Error(`HTTP error. Status ${res.status}`) }
            return res.json();
        })
        .then(data => {
            let dishesDiv = document.querySelector('.dishes');
            dishesDiv.innerHTML = '';
            let totalPrice = 0;
            let dishes = data.data;
            dishes.forEach(dish => {
                let para = document.createElement('p');
                para.innerHTML = dish.DishName;
                dishesDiv.append(para);
                totalPrice += parseFloat(dish.Price_ingredient);
            });
            let actionsDiv = document.querySelector('.actions');
            actionsDiv.classList.remove('hide');
            totalPrice = totalPrice.toFixed(2);
            let totalPriceDiv = document.querySelector('.total-price');
            totalPriceDiv.innerHTML = '';
            let pricePara = document.createElement('p');
            pricePara.innerHTML = `Total<br>${totalPrice} EGP`;
            totalPriceDiv.append(pricePara);
        });
    }
    e.preventDefault();
};

let form = document.querySelector('.generate-form');
form.addEventListener('submit', onFormSubmition);

document.addEventListener('keydown', (e) => {
    if(e.code === 'Space') {
        onFormSubmition(e);
    }
});