export function isNewDay() {
    const today = new Date().toISOString().split('T')[0]; // Fecha actual "YYYY-MM-DD"
    let lastPomodoroDate = localStorage.getItem('lastPomodoroDate');
    return lastPomodoroDate !== today;
}

export function increaseStreak() {
    if (isNewDay()) {
        pomodoroStreak++;
        lastPomodoroDate = new Date().toISOString().split('T')[0]; // Guardar fecha actual
        localStorage.setItem('pomodoroStreak', pomodoroStreak);
        localStorage.setItem('lastPomodoroDate', lastPomodoroDate);
    }
    updateStreakDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
    const streakDisplay = document.getElementById('strikeDays'); // Elemento donde se muestra la racha

    // Obtener la racha y la última fecha registrada
    let pomodoroStreak = parseInt(localStorage.getItem('pomodoroStreak')) || 0;
    let lastPomodoroDate = localStorage.getItem('lastPomodoroDate') || null;

    // Función para actualizar la interfaz de la racha en el footer
    function updateStreakDisplay() {
        streakDisplay.textContent = pomodoroStreak;
    }

    // Mostrar la racha actual al cargar la página
    updateStreakDisplay();
});
