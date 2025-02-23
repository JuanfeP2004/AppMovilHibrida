function cambiarPagina(evento){
    let parametro = evento.target.getAttribute('data-page');
    evento.preventDefault()

    switch(parametro){
        case 'inicioSesion':
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
            document.querySelector('.inicioSesion').style.display = 'none';
            document.querySelector('.registro').style.display = 'none';
            document.querySelector('.verHoy').style.display = 'none';
            document.querySelector('.calendario').style.display = 'block';
            document.querySelector('.pomodoro').style.display = 'none';
            document.querySelector('.crearTarea').style.display = 'none';
            break;
        case 'pomodoro':
            document.querySelector('.inicioSesion').style.display = 'none';
            document.querySelector('.registro').style.display = 'none';
            document.querySelector('.verHoy').style.display = 'none';
            document.querySelector('.calendario').style.display = 'none';
            document.querySelector('.pomodoro').style.display = 'block';
            document.querySelector('.crearTarea').style.display = 'none';
            break;
        case 'crearTarea':
            document.querySelector('.inicioSesion').style.display = 'none';
            document.querySelector('.registro').style.display = 'none';
            document.querySelector('.verHoy').style.display = 'none';
            document.querySelector('.calendario').style.display = 'none';
            document.querySelector('.pomodoro').style.display = 'none';
            document.querySelector('.crearTarea').style.display = 'block';
            break;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.inicioSesion').style.display = 'block';
    document.querySelector('.registro').style.display = 'none';
    document.querySelector('.verHoy').style.display = 'none';
    document.querySelector('.calendario').style.display = 'none';
    document.querySelector('.pomodoro').style.display = 'none';
    document.querySelector('.crearTarea').style.display = 'none';
});

document.querySelectorAll('.navButton').forEach(item => {
    item.addEventListener('click', cambiarPagina);
})