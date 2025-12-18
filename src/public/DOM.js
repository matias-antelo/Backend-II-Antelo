document.addEventListener('DOMContentLoaded', () => {
    const btnRegister = document.getElementById('btn-register');


    btnRegister.addEventListener('click', () => {
        window.location.href = '/api/sessions/registration';
    });

});

