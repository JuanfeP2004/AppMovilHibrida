import Tarea from '../data/tarea.js';

class CrearTarea {

    refnombre;
    refvalor;
    reffecha;
    reftipo;

    validarNombre() {
        if (this.refnombre.value.length > 0) {
            return true;
        } else {
            return false;
        }
    }
    validarValor() {
        let numero = parseFloat(this.refvalor.value);       
        if (!isNaN(numero) && numero >= 0 && numero <= 100) {
            return true;
        } else {
            return false;
        }
    }
    validarFecha() {
        let hoy = new Date();
        let fechaIngresada = new Date(this.reffecha.value);

        if (fechaIngresada > hoy) {
            return true;
        } else {
            return false;
        }
    }
    validarTipo() {
        if (this.reftipo.value == "Default") {
            return false;
        } else {
            return true;
        }
    }

    crearTarea() {
    
        if (!this.validarNombre()) {
            this.refnombre.placeholder = 'Ingrese un nombre';
            return;
        }
        else if (!this.validarValor()) {
            this.refvalor.value = '';
            this.refvalor.placeholder = 'Ingrese un valor entre 0 y 100';
            return;
        }
        else if (!this.validarFecha()) {
            this.referrorfecha.innerHTML = 'Ingrese una fecha válida';
            return;
        }
        else if (!this.validarTipo()) {
            this.referrortipo.innerHTML = 'Seleccione un tipo valido';
            return;
        }

        this.referrorfecha.innerHTML = '';
        this.referrortipo.innerHTML = '';

        let nombre = this.refnombre.value;
        let valor = this.refvalor.value;
        let fecha = this.reffecha.value;
        let tipo = this.reftipo.value;
        
        let tarea = new Tarea(nombre, tipo, fecha, valor);

        let usuario_actual = this.user.getData();
        usuario_actual.tareas.push(tarea);

        localStorage.setItem('Sesion', JSON.stringify(usuario_actual));

        let usuarios = JSON.parse(localStorage.getItem('Usuarios'));
        
        for(let i = 0; i < usuarios.length; i++){
            if(usuarios[i].name === usuario_actual.name) {
                usuarios[i] = usuario_actual;
            }
        }

        localStorage.setItem('Usuarios', JSON.stringify(usuarios));

        this.calendario.calendario.innerHTML = '';
        this.calendario.mes_actual = new Date(fecha).getMonth()
        this.calendario.anio_actual = new Date(fecha).getFullYear();
        this.ver_hoy.mostrarTareasHoy();
        this.calendario.ponerMes(new Date(fecha).getMonth());
        this.calendario.ponerTareas(new Date(fecha).getMonth(), new Date(fecha).getFullYear());
        this.cancelarTarea();
        this.navegacion.cambiarPaginaString("calendario");
    }
    cancelarTarea() {
        this.refnombre.value = '';
        this.refnombre.placeholder = 'Titulo';
        this.refvalor.value = '';
        this.refvalor.placeholder = 'Valor';
        this.reffecha.value = '';
        this.reftipo.value = 'Default';
        this.referrorfecha.innerHTML = '';
        this.referrortipo.innerHTML = '';
    }

    constructor(user, calendario, ver_hoy, navegacion) {
        this.refnombre = document.getElementById('titulo');
        this.refvalor = document.getElementById('valor');
        this.reffecha = document.getElementById('fecha');
        this.reftipo = document.getElementById('tipo');
        this.referrorfecha = document.getElementById('error-fecha');
        this.referrortipo = document.getElementById('error-tipo');
        

        this.user = user;
        this.ver_hoy = ver_hoy;
        this.calendario = calendario;
        this.navegacion = navegacion;

        document.getElementById('crearTarea').addEventListener('click', this.crearTarea.bind(this));
        document.getElementById('cancelarTarea').addEventListener('click', this.cancelarTarea.bind(this));
    }
}


export default CrearTarea;