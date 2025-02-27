class Calendario {

    actividades = [
        { titulo: "Matemáticas - Álgebra", tipo: "Tarea", fecha: new Date("2025-03-01T14:30:00"), valor: 85.5 },
        { titulo: "Historia - Revolución Francesa", tipo: "Estudio", fecha: new Date("2025-03-01T10:15:00"), valor: 92.0 },
        { titulo: "Física - Movimiento Rectilíneo", tipo: "Examen", fecha: new Date("2025-03-01T08:00:00"), valor: 78.3 },
        { titulo: "Química - Elementos químicos", tipo: "Tarea", fecha: new Date("2025-03-03T16:45:00"), valor: 88.7 },
        { titulo: "Biología - Células", tipo: "Estudio", fecha: new Date("2025-03-04T12:30:00"), valor: 94.2 },
        { titulo: "Matemáticas - Integrales", tipo: "Examen", fecha: new Date("2025-03-07T09:20:00"), valor: 80.0 },
        { titulo: "Historia - Segunda Guerra Mundial", tipo: "Estudio", fecha: new Date("2025-03-06T14:00:00"), valor: 89.5 },
        { titulo: "Física - Leyes de Newton", tipo: "Tarea", fecha: new Date("2025-03-08T18:10:00"), valor: 76.8 },
        { titulo: "Química - Reacciones químicas", tipo: "Examen", fecha: new Date("2025-03-09T07:45:00"), valor: 90.1 },
        { titulo: "Biología - Genética", tipo: "Tarea", fecha: new Date("2025-03-10T20:30:00"), valor: 85.0 },
        { titulo: "Matemáticas - Probabilidades", tipo: "Estudio", fecha: new Date("2025-03-11T11:10:00"), valor: 97.3 },
        { titulo: "Historia - Guerra Fría", tipo: "Examen", fecha: new Date("2025-03-12T15:50:00"), valor: 83.2 },
        { titulo: "Física - Energía y trabajo", tipo: "Tarea", fecha: new Date("2025-03-13T09:40:00"), valor: 79.5 },
        { titulo: "Química - Ácidos y bases", tipo: "Estudio", fecha: new Date("2025-03-14T13:25:00"), valor: 91.8 },
        { titulo: "Biología - Ecosistemas", tipo: "Examen", fecha: new Date("2025-03-15T17:15:00"), valor: 88.0 },
        { titulo: "Matemáticas - Ecuaciones diferenciales", tipo: "Tarea", fecha: new Date("2025-03-16T08:55:00"), valor: 82.7 },
        { titulo: "Historia - Independencia de América", tipo: "Estudio", fecha: new Date("2025-03-17T14:45:00"), valor: 95.5 },
        { titulo: "Física - Óptica", tipo: "Examen", fecha: new Date("2025-03-18T19:30:00"), valor: 87.6 },
        { titulo: "Química - Termodinámica", tipo: "Tarea", fecha: new Date("2025-03-19T10:20:00"), valor: 80.9 },
        { titulo: "Biología - Evolución", tipo: "Estudio", fecha: new Date("2025-03-20T16:05:00"), valor: 93.4 }
    ];

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
        this.ponerTareas(this.actividades, this.mes_actual, this.anio_actual);
    }

    avanzarMes() {
        this.mes_actual++;
        if (this.mes_actual > 11) {
            this.mes_actual = 0;
            this.anio_actual++;
        }
        this.ponerMes(this.mes_actual);
        this.calendario.innerHTML = "";
        this.ponerTareas(this.actividades, this.mes_actual, this.anio_actual);
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

    ponerTareas(array, month, year){

        let objects = array.filter(obj => obj.fecha.getMonth() == month && obj.fecha.getFullYear() == year);

        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let is_first = true;

        let tareas_por_dia = [];

        for (let i = 1; i <= daysInMonth; i++) {

            tareas_por_dia = [];
            is_first = true;
            let ul;

            objects.forEach(obj => {

                if (obj.fecha.getDate() == i) {
                    tareas_por_dia.push(obj);
                }

            });

            if(tareas_por_dia.length > 0){

                this.ordenarTareasPorHora(tareas_por_dia);
                ul = this.crearContendorDia(ul, tareas_por_dia[0]);
                
                tareas_por_dia.forEach(obj => {
                    this.crearTarea(ul, obj);
                });
                
            }           
        }
    }    
 
    ordenarTareasPorHora(tareas_por_dia){
        tareas_por_dia.sort((a, b) => {return a.fecha < b.fecha ? -1 : 1});
    }

    crearContendorDia(ul, obj) {
        let day = document.createElement('div');
        let titleContainer = document.createElement('div');
        let dayTitle = document.createElement('p');
        dayTitle.innerHTML = this.dias[obj.fecha.getDay()] + " <em>" + obj.fecha.getDate() + "</em>";
        titleContainer.appendChild(dayTitle);
        day.appendChild(titleContainer);
        this.calendario.appendChild(day);

        let div = document.createElement('div');
        ul = document.createElement('ul');

        div.appendChild(ul);
        day.appendChild(div);
        
        return ul;
    }

    crearTarea(ul, obj){
        let li = document.createElement('li');

        let titletype = document.createElement('p');
        titletype.innerHTML = obj.tipo + ": " + obj.titulo;
        let fecha = document.createElement('p');
        fecha.innerHTML = ((obj.fecha.getHours()<10)? "0" + obj.fecha.getHours() : obj.fecha.getHours()) + ":" + 
            ((obj.fecha.getMinutes() < 10)? "0" + obj.fecha.getMinutes() : obj.fecha.getMinutes());
        let valor = document.createElement('p');
        valor.innerHTML = obj.valor + "%";

        li.appendChild(titletype);
        li.appendChild(fecha);
        li.appendChild(valor);
        ul.appendChild(li);
    }

    constructor() {
        
        this.calendario = document.getElementById('month-calendar');

        this.anio_actual = new Date().getFullYear();
        this.mes_actual = new Date().getMonth();

        this.month = document.getElementById('month-text');
        this.month_before = document.getElementById('month-bf-text');
        this.month_after = document.getElementById('month-af-text');

        document.getElementById('month-bf').addEventListener('click', this.retrocederMes.bind(this));
        document.getElementById('month-af').addEventListener('click', this.avanzarMes.bind(this));
    }
}

export default Calendario;