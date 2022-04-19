let onGenerationFormSubmission = (e) => {
    let data = new FormData(form);
    let [arr] = data;
    let init = {
        method: 'POST',
        body: data
    };
    fetch('/app/generate_meal', init)
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
            if(typeof arr !== 'undefined' && arr[0] === 'ingredients') {
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
                if(typeof arr !== 'undefined' && arr[0] === 'ingredients') {
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

let form = document.querySelector('.generation-form');
form.addEventListener('submit', onGenerationFormSubmission);

document.addEventListener('keydown', (e) => {
    if(e.code === 'Space') {
        onGenerationFormSubmission(e);
    }
});