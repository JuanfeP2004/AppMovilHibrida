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
            this.refvalor.placeholder = 'Ingrese un valor entre 0 y 100';
            return;
        }
        else if (!this.validarFecha()) {
            this.reffecha.placeholder = 'Ingrese una fecha válida';
            return;
        }
        else if (!this.validarTipo()) {
            return;
        }

        let nombre = this.refnombre.value;
        let valor = this.refvalor.value;
        let fecha = this.reffecha.value;
        let tipo = this.reftipo.value;

        let tarea = {
            nombre: nombre,
            valor: valor,
            fecha: fecha,
            tipo: tipo
        };

        alert('Tarea creada correctamente' + "\n" + 'Nombre: ' + tarea.nombre + "\n" + 'Valor: ' + tarea.valor + "\n" + 'Fecha: ' + tarea.fecha + "\n" + 'Tipo: ' + tarea.tipo);
    }

    cancelarTarea() {
        this.refnombre.value = '';
        this.refvalor.value = '';
        this.reffecha.value = '';
        this.reftipo.value = 'Default';
    }

    constructor() {
        this.refnombre = document.getElementById('titulo');
        this.refvalor = document.getElementById('valor');
        this.reffecha = document.getElementById('fecha');
        this.reftipo = document.getElementById('tipo');

        document.getElementById('crearTarea').addEventListener('click', this.crearTarea.bind(this));
        document.getElementById('cancelarTarea').addEventListener('click', this.cancelarTarea.bind(this));
    }
}

/*document.getElementById('crearTarea').addEventListener('click', crearTarea);
document.getElementById('cancelarTarea').addEventListener('click', cancelarTarea);

function crearTarea() {
    let nombre = document.getElementById('titulo').value;
    let valor = document.getElementById('valor').value;
    let fecha = document.getElementById('fecha').value;
    let tipo = document.getElementById('tipo').value;

    if (!validarNombre(nombre)) {
        document.getElementById('titulo').placeholder = 'Ingrese un nombre';
        return;
    }
    else if (!validarValor(valor)) {
        document.getElementById('valor').placeholder = 'Ingrese un valor entre 0 y 100';
        return;
    }
    else if (!validarFecha(fecha)) {
        fecha.placeholder = 'Ingrese una fecha válida';
        return;
    }
    else if (!validarTipo(tipo)) {
        return;
    }

    let tarea = {
        nombre: nombre,
        valor: valor,
        fecha: fecha,
        tipo: tipo
    };

    alert('Tarea creada correctamente' + "\n" + 'Nombre: ' + tarea.nombre + "\n" + 'Valor: ' + tarea.valor + "\n" + 'Fecha: ' + tarea.fecha + "\n" + 'Tipo: ' + tarea.tipo);
}

function cancelarTarea() {
    document.getElementById('titulo').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('tipo').value = 'Default';
}

function validarNombre(nombre) {
    if (nombre.length > 0) {
        return true;
    } else {
        return false;
    }
}

function validarValor(valor) {

    let numero = parseFloat(valor);

    if (valor.length > 0 && !isNaN(numero) && numero >= 0 && numero <= 100) {
        return true;
    } else {
        return false;
    }
}

function validarFecha(fecha) {
    let hoy = new Date();
    let fechaIngresada = new Date(fecha);

    if (fechaIngresada > hoy) {
        return true;
    } else {
        return false;
    }
}

function validarTipo(tipo) {
    if (tipo== "Default") {
        return false;
    } else {
        return true;
    }
}*/

export default CrearTarea;