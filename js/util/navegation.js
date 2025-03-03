class Navegacion {

    paginas = [];

    constructor() {
        this.paginas.push({ nombre: "inicioSesion", ref: document.querySelector('.inicioSesion')});
        this.paginas.push({ nombre: "registro", ref: document.querySelector('.registro')});
        this.paginas.push({ nombre: "verHoy", ref: document.querySelector('.verHoy')});
        this.paginas.push({ nombre: "calendario", ref: document.querySelector('.calendario')});
        this.paginas.push({ nombre: "pomodoro", ref: document.querySelector('.pomodoro')});
        this.paginas.push({ nombre: "crearTarea", ref: document.querySelector('.crearTarea')});

        document.querySelectorAll('.navButton').forEach(item => {
            item.addEventListener('click', this.cambiarPagina.bind(this));
        });
    }

    paginaInicial(){
        this.paginas.find(pagina => {
            if(pagina.nombre === 'inicioSesion'){
                pagina.ref.style.display = 'block';
            }
            else {
                pagina.ref.style.display = 'none';	
            }
        });
    }

    cambiarPagina(evento) {
        let parametro = evento.target.getAttribute('data-page');
        evento.preventDefault();
    
        this.paginas.forEach(pagina => {
            if(pagina.nombre === parametro){
                pagina.ref.style.display = 'block';
            } else {
                pagina.ref.style.display = 'none';
            }
        });
    }

    cambiarPaginaString(parametro){
        this.paginas.forEach(pagina => {
            if(pagina.nombre === parametro){
                pagina.ref.style.display = 'block';
            } else {
                pagina.ref.style.display = 'none';
            }
        });
    }
}

export default Navegacion;