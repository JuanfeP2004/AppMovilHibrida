import Tarea from '../data/tarea.js';

class Calendario {

    meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
             'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    retrocederMes() {
        this.mes_actual--;
        if (this.mes_actual < 0) {
            this.mes_actual = 11;
            this.anio_actual--;
        }
        this.ponerMes(this.mes_actual);
        this.calendario.innerHTML = "";
        this.ponerTareas(this.mes_actual, this.anio_actual);
    }

    avanzarMes() {
        this.mes_actual++;
        if (this.mes_actual > 11) {
            this.mes_actual = 0;
            this.anio_actual++;
        }
        this.ponerMes(this.mes_actual);
        this.calendario.innerHTML = "";
        this.ponerTareas(this.mes_actual, this.anio_actual);
    }

    ponerMes(numMes) {
        this.month.innerHTML = this.meses[numMes];

        if (numMes == 0) {
            this.month_before.innerHTML = this.meses[11];
            this.month_after.innerHTML = this.meses[1];
        } else if (numMes == 11) {
            this.month_before.innerHTML = this.meses[10];
            this.month_after.innerHTML = this.meses[0];
        } else {
            this.month_before.innerHTML = this.meses[numMes - 1];
            this.month_after.innerHTML = this.meses[numMes + 1];
        }
    }

    ponerTareas(month, year){

        //let userLS = JSON.parse(localStorage.getItem(user));
        this.calendario.innerHTML = '';
        let arrayString = this.user.getData().tareas;
        let array = arrayString.map(obj => new Tarea(obj.titulo, obj.tipo, new Date(obj.fecha), obj.valor));

        let objects = array.filter(obj => obj.fecha.getMonth() == month && obj.fecha.getFullYear() == year);

        let daysInMonth = new Date(year, month + 1, 0).getDate();

        let tareas_por_dia = [];

        for (let i = 1; i <= daysInMonth; i++) {

            tareas_por_dia = [];
            let arrayObj = [];
            let ul;
            let div;

            objects.forEach(obj => {

                if (obj.fecha.getDate() == i) {
                    tareas_por_dia.push(obj);
                }

            });

            if(tareas_por_dia.length > 0){

                this.ordenarTareasPorHora(tareas_por_dia);
                arrayObj = this.crearContendorDia(ul, tareas_por_dia[0]);
                ul = arrayObj[0];
                div = arrayObj[1];

                tareas_por_dia.forEach(obj => {
                    this.crearTarea(ul, obj);
                });
                
                this.crearBotonAgregar(div);
            }           
        }
    }    
 
    ordenarTareasPorHora(tareas_por_dia){
        tareas_por_dia.sort((a, b) => {return a.fecha < b.fecha ? -1 : 1});
    }

    crearContendorDia(ul, obj) {
        let day = document.createElement('div');
        day.classList.add('day-calendar');
        let titleContainer = document.createElement('div');
        titleContainer.classList.add('day-text');
        let dayTitle = document.createElement('p');
        dayTitle.classList.add('day-week');
        dayTitle.innerHTML = this.dias[obj.fecha.getDay()];
        let daySeparator = document.createElement('br');
        let dayNumber = document.createElement('em');
        dayNumber.classList.add('day-month');
        dayNumber.innerHTML = obj.fecha.getDate();
        
        titleContainer.appendChild(dayTitle);
        titleContainer.appendChild(daySeparator);
        titleContainer.appendChild(dayNumber);

        day.appendChild(titleContainer);
        this.calendario.appendChild(day);

        let div = document.createElement('div');
        div.classList.add('day-tasks');
        ul = document.createElement('ul');
        ul.classList.add('day-tasks-list');

        div.appendChild(ul);
        day.appendChild(div);
        
        return [ul, day];
    }

    crearTarea(ul, obj){
        let li = document.createElement('li');
        li.classList.add('task');

        let titletype = document.createElement('p');
        titletype.classList.add('task-text');
        titletype.innerHTML = obj.tipo + ": " + obj.titulo;
        let fecha = document.createElement('p');
        fecha.classList.add('task-date');
        fecha.innerHTML = ((obj.fecha.getHours()<10)? "0" + obj.fecha.getHours() : obj.fecha.getHours()) + ":" + 
            ((obj.fecha.getMinutes() < 10)? "0" + obj.fecha.getMinutes() : obj.fecha.getMinutes());
        let valor = document.createElement('p');
        valor.classList.add('task-value');
        valor.innerHTML = obj.valor + "%";

        li.appendChild(fecha);
        li.appendChild(titletype);
        li.appendChild(valor);
        ul.appendChild(li);
    }

    crearBotonAgregar(divTask){

        let div = document.createElement('div');
        div.classList.add('day-create');
        let button = document.createElement('div');
        button.classList.add('day-create-button');
        button.innerHTML = "<a href='' class='nav-button-text navButton' data-page='crearTarea'>+</a>";
        button.addEventListener('click', this.navegacion.cambiarPagina.bind(this.navegacion));
        button.setAttribute('data-page', 'crearTarea');
        div.appendChild(button);
        divTask.appendChild(div);

    }

    constructor(navegacion, user) {
        
        this.calendario = document.getElementById('month-calendar');

        this.anio_actual = new Date().getFullYear();
        this.mes_actual = new Date().getMonth();
        this.navegacion = navegacion;

        this.month = document.getElementById('month-text');
        this.month_before = document.getElementById('month-bf-text');
        this.month_after = document.getElementById('month-af-text');

        this.user = user;

        document.getElementById('month-bf').addEventListener('click', this.retrocederMes.bind(this));
        document.getElementById('month-af').addEventListener('click', this.avanzarMes.bind(this));
    }
}

export default Calendario;