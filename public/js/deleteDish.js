const deleteDishForm = document.querySelector('.delete-dish-form');
deleteDishForm.addEventListener('submit', (e) => {
    const formData = new FormData(deleteDishForm);
    const options = {
        method: 'DELETE',
        body: formData
    };
    fetch('/app/dishes/delete', options)
    .then((res) => {
        const deletetionMessage = document.querySelector('.deletion-message');
        if(!res.ok) {
            deletetionMessage.innerHTML = 'Failed';
            deletetionMessage.style.color = '#ff0000';
            throw new Error(`Couldn't fetch ${res.status}`);
        } else {
            console.log(res.status);
            deletetionMessage.innerHTML = 'Success';
            deletetionMessage.style.color = 'yellowgreen';
        }
    });
    e.preventDefault();
});