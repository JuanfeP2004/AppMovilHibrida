function cambiarPagina(evento){
    let parametro = evento.target.getAttribute('data-page');
    alert("Parámetro recibido: " + parametro);
    evento.preventDefault()

    switch(parametro){
        case 'ingreso':
            document.querySelector('.inicioSesion').style.display = 'block';
            document.querySelector('.registro').style.display = 'none';
            document.querySelector('.verHoy').style.display = 'none';
            document.querySelector('.calendario').style.display = 'none';
            document.querySelector('.pomodoro').style.display = 'none';
            document.querySelector('.crearTarea').style.display = 'none';
            break;
        case 'registro':
            document.querySelector('.inicioSesion').style.display = 'none';
            document.querySelector('.registro').style.display = 'block';
            document.querySelector('.verHoy').style.display = 'none';
            document.querySelector('.calendario').style.display = 'none';
            document.querySelector('.pomodoro').style.display = 'none';
            document.querySelector('.crearTarea').style.display = 'none';
            break;
        case 'verHoy':
            document.querySelector('.inicioSesion').style.display = 'none';
            document.querySelector('.registro').style.display = 'none';
            document.querySelector('.verHoy').style.display = 'block';
            document.querySelector('.calendario').style.display = 'none';
            document.querySelector('.pomodoro').style.display = 'none';
            document.querySelector('.crearTarea').style.display = 'none';
            break;
        case 'calendario':
            window.location.href = 'services.html';
            break;
    }
}

document.querySelectorAll('.navButton').forEach(item => {
    item.addEventListener('click', cambiarPagina);
})