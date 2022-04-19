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
        console.log('done');
        return res.json();
    });
    e.preventDefault();
});