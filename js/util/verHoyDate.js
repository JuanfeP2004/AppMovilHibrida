document.addEventListener('DOMContentLoaded', () => {

    //arreglo meses
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    //arreglo dias
    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    //Constantes de la vista
    const diaSemanaView = document.getElementById('dia-semana');
    const fechaView = document.getElementById('fecha-completa');
    const horaView = document.getElementById('hora-actual');

    //Asignación de valores a la vista
    function setDate() {
        // Variables fecha y hora
        var FehcaCompletaHoy = new Date(); //DD/MM/AAAA ...
        var DiaHoy = FehcaCompletaHoy.getDate().toString().padStart(2, '0'); //DD
        var MesHoy = FehcaCompletaHoy.getMonth(); //MM
        var diaSemana = FehcaCompletaHoy.getDay(); //0-6

        //Asignación de mes y día
        MesHoy = meses[MesHoy];
        diaSemana = dias[diaSemana];

        //concatenación de la fecha y el mes
        var fechaHoy = DiaHoy + " " + MesHoy;
        console.log("fehca hoy vista: " + fechaHoy);

        diaSemanaView.textContent = diaSemana;
        fechaView.textContent = fechaHoy;
        setHour();
    }

    function setHour() {
        var FehcaCompletaHoy = new Date();
        var horas = FehcaCompletaHoy.getHours().toString().padStart(2, '0'); //0-23
        var minutos = FehcaCompletaHoy.getMinutes().toString().padStart(2, '0'); //0-59

        // Formato AM/PM
        var periodo = horas >= 12 ? 'PM' : 'AM';
        horas = horas % 12 || 12; // Convierte a formato 12 horas
        var horaForm = horas.toString().padStart(2, '0') + ':' + minutos + ' ' + periodo;
        console.log("hora vista: " + horaForm);

        //Asignación de la hora
        horaView.textContent = horaForm;
    }

    //Llamado inicial a la función
    setDate();
    //Llamado a la función cada minuto
    setInterval(setHour, 60000);
    //Llamado a la función cada día
    setInterval(setDate, 86400000);
});