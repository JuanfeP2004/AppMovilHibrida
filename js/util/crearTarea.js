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

        let userLS = JSON.parse(localStorage.getItem(this.user));
        
        let tarea = new Tarea(nombre, tipo, fecha, valor);
        userLS.tareas.push(tarea);

        localStorage.setItem(this.user, JSON.stringify(userLS));

        alert('Tarea creada correctamente' + "\n" + 'Nombre: ' + tarea.titulo + "\n" + 'Valor: ' + tarea.valor + "\n" + 'Fecha: ' + tarea.fecha + "\n" + 'Tipo: ' + tarea.tipo);
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

    constructor(user) {
        this.refnombre = document.getElementById('titulo');
        this.refvalor = document.getElementById('valor');
        this.reffecha = document.getElementById('fecha');
        this.reftipo = document.getElementById('tipo');
        this.referrorfecha = document.getElementById('error-fecha');
        this.referrortipo = document.getElementById('error-tipo');

        this.user = user;

        document.getElementById('crearTarea').addEventListener('click', this.crearTarea.bind(this));
        document.getElementById('cancelarTarea').addEventListener('click', this.cancelarTarea.bind(this));
    }
}


export default CrearTarea;