const buttonStart = document.getElementById('get-started');

buttonStart.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/notes';
})