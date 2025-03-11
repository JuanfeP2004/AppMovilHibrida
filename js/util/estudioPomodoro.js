class EstudioPomodoro {

    updatePomodoro(){
        this.timeLeft = this.usuario_actual.getData().pomodoro.study_duration * 60; // Convertimos minutos a segundos
        this.timer = null; // Almacena el intervalo
        this.cycleCount = 0; // Contador de ciclos
        this.isStudyTime = true;

        this.updateTimerDisplay();
        this.updateStreakDisplay();
    }

    resetPomodoro() {
        this.resetTimer();
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    startTimer() {
        if (!this.timer) { // Evita múltiples intervalos
            this.timer = setInterval(() => {
                if (this.timeLeft > 0) {
                    this.timeLeft--;
                    this.updateTimerDisplay();
                } else {
                    clearInterval(this.timer);
                    this.timer = null;

                    if (this.isStudyTime) {
                        this.cycleCount++; // Aumentar ciclo solo en periodos de estudio
                        if (this.cycleCount >= this.totalRepetitions) {
                            this.showPopup("¡Pomodoro completado! 🎉");
                            this.cycleCount = 0; // Reiniciar el contador
                            this.resetTimer(); // Reinicia el temporizador
                            if(this.isNewDay()){
                                this.increaseStreak();
                                console.log("Es un nuevo día");
                            }else{
                                console.log("No es un nuevo día");
                            }
                            return; // Finaliza el proceso
                        }
                        this.showPopup("Tiempo de descanso ⏳");
                        this.timeLeft = this.breakDuration * 60;
                        this.isStudyTime = false;
                    } else {
                        this.showPopup("¡Hora de estudiar! 📖");
                        this.timeLeft = this.studyDuration * 60;
                        this.isStudyTime = true;
                    }

                    this.updateTimerDisplay();
                    this.startTimer(); // Reinicia el temporizador automáticamente
                }
            }, 1000);
        }
    }

    // Función para pausar el temporizador
    pauseTimer() {
        clearInterval(this.timer);
        this.timer = null;
    }

    //funcion para reiniciar el temporizador
    resetTimer() {
        clearInterval(this.timer);
        this.timer = null;
        this.timeLeft = this.studyDuration * 60;
        //console.log(timeLeft);
        this.updateTimerDisplay();
    }

    // Función para guardar la configuración del temporizador
    saveSettings() {
        this.studyDuration = parseInt(this.studyTimeInput.value) || 25;
        this.breakDuration = parseInt(this.breakTimeInput.value) || 5;
        this.totalRepetitions = parseInt(this.repetitionsCountInput.value) || 4;

        // Guardar en localStorage y validar los valores

        if(this.studyDuration < 1 || this.studyDuration > 60){
            this.studyDuration = 25;
            //Mostrar mensaje de error
            alert("El tiempo de estudio debe estar entre 10 y 60 minutos");
        }else{
            this.usuario_actual.setStudyTime(this.studyDuration);
            //localStorage.setItem('studyDuration', studyDuration);
        }

        if(this.breakDuration < 0 || this.breakDuration > 60){
            this.breakDuration = 5;
            //Mostrar mensaje de error
            alert("El tiempo de descanso debe estar entre 1 y 60 minutos");
        }else{
            this.usuario_actual.setBreakTime(this.breakDuration);
            //localStorage.setItem('breakDuration', breakDuration);
        }

        if(this.totalRepetitions < 1 || this.totalRepetitions > 10){
            this.totalRepetitions = 4;
            //Mostrar mensaje de error
            alert("El número de repeticiones debe estar entre 1 y 10");
        }else{
            this.usuario_actual.setRepetitions(this.totalRepetitions);
            //localStorage.setItem('totalRepetitions', totalRepetitions);
        }

        // Actualizar el temporizador con el nuevo tiempo
        this.timeLeft = this.studyDuration * 60;
        this.updateTimerDisplay();

        // Cerrar el modal después de guardar
        this.closeModal();
        this.actualizarPomodoro();
    }

    // Función para abrir el modal
    openModal() {
        this.settingsModal.style.display = 'flex';
        setTimeout(() => this.settingsModal.classList.add('active'), 10);

        // Cargar valores actuales en el modal
        this.studyTimeInput.value = this.usuario_actual.getData().pomodoro.study_duration;
        this.breakTimeInput.value = this.usuario_actual.getData().pomodoro.break_duration;
        this.repetitionsCountInput.value = this.usuario_actual.getData().pomodoro.repetitions;
    }

    // Función para cerrar el modal
    closeModal() {
        this.settingsModal.classList.remove('active');
        setTimeout(() => this.settingsModal.style.display = 'none', 300);
    }

    // Función para mostrar el popup y reproducir la alarma
    showPopup(message) {
        this.popupMessage.textContent = message;
        this.popup.classList.remove('hidden');
        this.alarmSound.currentTime = 0;
        this.alarmSound.play(); // Reproduce el sonido
    }

    configureSettings(){
        //this.firstTime = localStorage.getItem('firstTime') === null ;
        this.firstTime = this.usuario_actual.getData().pomodoro.first_time === null ;
        if(this.firstTime){
            //Setear la fecha del primer pomodoro
            console.log("firstTime:" + firstTime);
            let lastPomodoroDate = new Date().toISOString().split('T')[0]; // Guardar fecha actual

            //localStorage.setItem('lastPomodoroDate', lastPomodoroDate);
            this.usuario_actual.setLastTime(lastPomodoroDate);

            this.usuario_actual.pomodoro.last_date;
            //setear la racha en 0
            //let pomodoroStreak = 0;
            //localStorage.setItem('pomodoroStreak', pomodoroStreak);
            this.usuario_actual.setFirstTime(false);
            //firstTime = false;
            console.log("firstTime:" + firstTime);
            //localStorage.setItem('firstTime', firstTime);

            this.actualizarPomodoro();
        }
    }


    updateStreakDisplay() {
        this.streakDisplay.textContent = this.usuario_actual.getData().pomodoro.streak;
    }

    isNewDay() {
        const today = new Date().toISOString().split('T')[0]; // Fecha actual "YYYY-MM-DD"
        let lastPomodoroDate = this.usuario_actual.getData().pomodoro.last_date;
        //localStorage.getItem('lastPomodoroDate');
        return lastPomodoroDate !== today;
    }
    
    increaseStreak() {
        if (this.isNewDay()) {
            this.usuario_actual.incStreak();
            this.usuario_actual.setLastTime(new Date().toISOString().split('T')[0]);
            this.actualizarPomodoro(); // Guardar fecha actual
            //localStorage.setItem('pomodoroStreak', pomodoroStreak);
            //localStorage.setItem('lastPomodoroDate', lastPomodoroDate);
        }
        this.updateStreakDisplay();
    }

    actualizarPomodoro() {
        let usuarios = JSON.parse(localStorage.getItem('Usuarios'));

        for (let i = 0; i < usuarios.length; i++){
            if (usuarios[i].name == this.usuario_actual.getData().name)
                usuarios[i] = this.usuario_actual.getData();
        }

        localStorage.setItem('Sesion', JSON.stringify(this.usuario_actual));
        localStorage.setItem('Usuarios', JSON.stringify(usuarios));
    }
    
    constructor(usuario_actual) {
        this.usuario_actual = usuario_actual;

        this.settingsButton = document.getElementById('openSettings');
        this.settingsModal = document.getElementById('settingsModal');
        this.closeModalButton = document.getElementById('closeModal');
        this.saveSettingsButton = document.getElementById('saveSettings');
        this.studyTimeInput = document.getElementById('studyTime');
        this.breakTimeInput = document.getElementById('breakTime');
        this.repetitionsCountInput = document.getElementById('repetitionsCount');
        this.timerDisplay = document.getElementById('timer');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');

        this.popup = document.getElementById('popupNotification');
        this.popupMessage = document.getElementById('popupMessage');
        this.closePopup = document.getElementById('closePopup');
        this.alarmSound = document.getElementById('alarmSound');

        this.streakDisplay = document.getElementById('strikeDays'); // Elemento donde se muestra la racha

    // Obtener la racha y la última fecha registrada
        //let pomodoroStreak = parseInt(localStorage.getItem('pomodoroStreak')) || 0;
        //let lastPomodoroDate = localStorage.getItem('lastPomodoroDate') || null;

        //this.studyDuration = parseInt(localStorage.getItem('studyDuration')) || 25;
        //this.breakDuration = parseInt(localStorage.getItem('breakDuration')) || 5;
        //this.totalRepetitions = parseInt(localStorage.getItem('totalRepetitions')) || 4;

        // Variables del temporizador
        this.timeLeft = this.studyDuration * 60; // Convertimos minutos a segundos
        this.timer = null; // Almacena el intervalo
        this.cycleCount = 0; // Contador de ciclos
        this.isStudyTime = true; // Indica si es tiempo de estudio o descanso
        //Variales de la racha
        //Primero
        /*this.firstTime = localStorage.getItem('firstTime') === null;
        if(this.firstTime){
            //Setear la fecha del primer pomodoro
            console.log("firstTime:" + firstTime);
            let lastPomodoroDate = new Date().toISOString().split('T')[0]; // Guardar fecha actual
            localStorage.setItem('lastPomodoroDate', lastPomodoroDate);
            //setear la racha en 0
            let pomodoroStreak = 0;
            localStorage.setItem('pomodoroStreak', pomodoroStreak);
            firstTime = false;
            console.log("firstTime:" + firstTime);
            localStorage.setItem('firstTime', firstTime);
        }*/


        this.closePopup.addEventListener('click', () => {
            this.popup.classList.add('hidden');
            this.alarmSound.pause();
            this.alarmSound.currentTime = 0;
        });   
        // Eventos de los botones
        this.startButton.addEventListener('click', this.startTimer.bind(this));
        this.pauseButton.addEventListener('click', this.pauseTimer.bind(this));
        this.settingsButton.addEventListener('click', this.openModal.bind(this));
        this.closeModalButton.addEventListener('click', this.closeModal.bind(this));
        this.saveSettingsButton.addEventListener('click', this.saveSettings.bind(this));
        this.resetButton.addEventListener('click', this.resetTimer.bind(this));

        //this.updateStreakDisplay();
    }
}

export default EstudioPomodoro;