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

    // Variables de configuración con valores almacenados o por defecto
    let studyDuration = parseInt(localStorage.getItem('studyDuration')) || 25;
    let breakDuration = parseInt(localStorage.getItem('breakDuration')) || 5;
    let totalRepetitions = parseInt(localStorage.getItem('totalRepetitions')) || 4;
    let timeLeft = studyDuration * 60; // Convertimos minutos a segundos
    let timer = null; // Almacena el intervalo

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
                    alert("¡Tiempo terminado! 🎉");
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

        // Guardar en localStorage
        localStorage.setItem('studyDuration', studyDuration);
        localStorage.setItem('breakDuration', breakDuration);
        localStorage.setItem('totalRepetitions', totalRepetitions);

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

    // Eventos de los botones
    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    settingsButton.addEventListener('click', openModal);
    closeModalButton.addEventListener('click', closeModal);
    saveSettingsButton.addEventListener('click', saveSettings);
    resetButton.addEventListener('click', resetTimer);
});
