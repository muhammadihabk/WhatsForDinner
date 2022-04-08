let dataPointDiv = document.querySelector('.data-point');

document.addEventListener('keydown', (e) => {
    if(e.code === 'Space') {
        fetch('/meal')
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
});