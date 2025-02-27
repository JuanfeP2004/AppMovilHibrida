document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const settingsButton = document.getElementById('openSettings');
    const settingsModal = document.getElementById('settingsModal');
    const closeModalButton = document.getElementById('closeModal');
    const saveSettingsButton = document.getElementById('saveSettings');
    const studyTimeInput = document.getElementById('studyTime');
    const breakTimeInput = document.getElementById('breakTime');
    const repetitionsCountInput = document.getElementById('repetitionsCount');
    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');

    // Elementos del popup y sonido
    const popup = document.getElementById('popupNotification');
    const popupMessage = document.getElementById('popupMessage');
    const closePopup = document.getElementById('closePopup');
    const alarmSound = document.getElementById('alarmSound');

    // Variables de configuración con valores almacenados o por defecto
    let studyDuration = parseInt(localStorage.getItem('studyDuration')) || 25;
    let breakDuration = parseInt(localStorage.getItem('breakDuration')) || 5;
    let totalRepetitions = parseInt(localStorage.getItem('totalRepetitions')) || 4;
    let timeLeft = studyDuration * 60; // Convertimos minutos a segundos
    let timer = null; // Almacena el intervalo
    let cycleCount = 0; // Contador de ciclos
    let isStudyTime = true; // Indica si es tiempo de estudio o descanso

    // Función para actualizar el display del timer
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Inicializar el timer al cargar la página
    updateTimerDisplay();

    // Función para iniciar el temporizador
    function startTimer() {
        if (!timer) { // Evita múltiples intervalos
            timer = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timer);
                    timer = null;

                    if (isStudyTime) {
                        cycleCount++; // Aumentar ciclo solo en periodos de estudio
                        if (cycleCount >= totalRepetitions) {
                            showPopup("¡Pomodoro completado! 🎉");
                            cycleCount = 0; // Reiniciar el contador
                            resetTimer(); // Reinicia el temporizador
                            return; // Finaliza el proceso
                        }
                        showPopup("Tiempo de descanso ⏳");
                        timeLeft = breakDuration * 60;
                        isStudyTime = false;
                    } else {
                        showPopup("¡Hora de estudiar! 📖");
                        timeLeft = studyDuration * 60;
                        isStudyTime = true;
                    }

                    updateTimerDisplay();
                    startTimer(); // Reinicia el temporizador automáticamente
                }
            }, 1000);
        }
    }

    // Función para pausar el temporizador
    function pauseTimer() {
        clearInterval(timer);
        timer = null;
    }

    //funcion para reiniciar el temporizador
    function resetTimer() {
        clearInterval(timer);
        timer = null;
        timeLeft = studyDuration * 60;
        console.log(timeLeft);
        updateTimerDisplay();
    }

    // Función para guardar la configuración del temporizador
    function saveSettings() {
        studyDuration = parseInt(studyTimeInput.value) || 25;
        breakDuration = parseInt(breakTimeInput.value) || 5;
        totalRepetitions = parseInt(repetitionsCountInput.value) || 4;

        // Guardar en localStorage y validar los valores

        if(studyDuration < 10 || studyDuration > 60){
            studyDuration = 25;
            //Mostrar mensaje de error
            alert("El tiempo de estudio debe estar entre 10 y 60 minutos");
        }else{
            localStorage.setItem('studyDuration', studyDuration);
        }

        if(breakDuration < 0 || breakDuration > 60){
            breakDuration = 5;
            //Mostrar mensaje de error
            alert("El tiempo de descanso debe estar entre 1 y 60 minutos");
        }else{
            localStorage.setItem('breakDuration', breakDuration);
        }

        if(totalRepetitions < 1 || totalRepetitions > 10){
            totalRepetitions = 4;
            //Mostrar mensaje de error
            alert("El número de repeticiones debe estar entre 1 y 10");
        }else{
            localStorage.setItem('totalRepetitions', totalRepetitions);
        }

        // Actualizar el temporizador con el nuevo tiempo
        timeLeft = studyDuration * 60;
        updateTimerDisplay();

        // Cerrar el modal después de guardar
        closeModal();
    }

    // Función para abrir el modal
    function openModal() {
        settingsModal.style.display = 'flex';
        setTimeout(() => settingsModal.classList.add('active'), 10);

        // Cargar valores actuales en el modal
        studyTimeInput.value = studyDuration;
        breakTimeInput.value = breakDuration;
        repetitionsCountInput.value = totalRepetitions;
    }

    // Función para cerrar el modal
    function closeModal() {
        settingsModal.classList.remove('active');
        setTimeout(() => settingsModal.style.display = 'none', 300);
    }

    // Función para mostrar el popup y reproducir la alarma
    function showPopup(message) {
        popupMessage.textContent = message;
        popup.classList.remove('hidden');
        alarmSound.currentTime = 0;
        alarmSound.play(); // Reproduce el sonido
    }

    // Cerrar el popup manualmente
    closePopup.addEventListener('click', () => {
        popup.classList.add('hidden');
        alarmSound.pause();
        alarmSound.currentTime = 0;
    });

    // Eventos de los botones
    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    settingsButton.addEventListener('click', openModal);
    closeModalButton.addEventListener('click', closeModal);
    saveSettingsButton.addEventListener('click', saveSettings);
    resetButton.addEventListener('click', resetTimer);
});
