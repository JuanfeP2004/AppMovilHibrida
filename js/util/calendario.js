class Calendario {
    
    meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
             'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    retrocederMes() {
        this.mes_actual--;
        if (this.mes_actual < 0) {
            this.mes_actual = 11;
            this.anio_actual--;
        }
        this.ponerMes(this.mes_actual);
    }

    avanzarMes() {
        this.mes_actual++;
        if (this.mes_actual > 11) {
            this.mes_actual = 0;
            this.anio_actual++;
        }
        this.ponerMes(this.mes_actual);
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
    
    constructor() {
    
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