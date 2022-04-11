let dataPointDiv = document.querySelector('.data-point');
/*
document.addEventListener('keydown', (e) => {
    if(e.code === 'Space') {
        fetch('/meal_ingredient')
        .then((res) => {
            if(!res.ok) { throw new Error(`HTTP error. Status ${res.status}`) }
            return res.json();
        })
        .then(data => {
            let dishesDiv = document.querySelector('.dishes');
            dishesDiv.innerHTML = '';
            let totalPrice = data.totalPrice;
            let dishes = data.data;
            dishes.forEach(tuple => {
                let para = document.createElement('p');
                para.textContent = tuple.DishName;
                dishesDiv.append(para);
            });
            let totalPriceDiv = document.querySelector('.total-price');
            totalPriceDiv.innerHTML = '';
            let pricePara = document.createElement('p');
            pricePara.innerHTML = `Total<br>${totalPrice} EGP`;
            totalPriceDiv.append(pricePara);
            let actionsDiv = document.querySelector('.actions');
            actionsDiv.classList.remove('hide');
        });
    }
});*/

document.addEventListener('keydown', (e) => {
    if(e.code === 'KeyE') {
        // No ingredients
        fetch('/meal_ingredient')
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

let form = document.querySelector('.generate-form');
form.addEventListener('submit', (e) => {
    let data = new FormData(form);
    let [arr] = data;
    let init = {
        method: 'POST',
        body: data
    };
    if(arr[0] === 'ingredients') {
        // Ingredients
        fetch(form.getAttribute('action'), init)
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
        fetch('/meal_ingredient')
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
    e.preventDefault();
    }, false);