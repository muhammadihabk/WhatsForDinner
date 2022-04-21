const deleteDishForm = document.querySelector('.delete-dish-form');
deleteDishForm.addEventListener('submit', (e) => {
    const formData = new FormData(deleteDishForm);
    const options = {
        method: 'DELETE',
        body: formData
    };
    fetch('/app/delete-dish', options)
    .then((res) => {
        const deletetionMessage = document.querySelector('.deletion-message');
        if(!res.ok) {
            deletetionMessage.innerHTML = 'Failed. Wrong name';
            deletetionMessage.style.color = 'red';
            throw new Error(`Couldn't fetch ${res.status}`);
        } else {
            console.log(res.status);
            deletetionMessage.innerHTML = 'Success';
            deletetionMessage.style.color = 'yellowgreen';
        }
    });
    e.preventDefault();
});