import Navegacion from "./util/navegation.js";
import Auth from "./util/auth.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ main.js cargado correctamente");

    const navegacion = new Navegacion();
    const auth = new Auth();
    window.auth = new Auth()

    function configurarEventos() {
        console.log("🔄 Intentando configurar eventos...");
        let intentos = 0;
    
        const intervalo = setInterval(() => {
            const loginForm = document.querySelector("#loginForm");
            const registerForm = document.querySelector("#registerForm");
    
            if (loginForm || registerForm) {
                clearInterval(intervalo);
                console.log("✅ Formulario encontrado, configurando eventos...");
                
                const auth = new Auth();
    
                if (loginForm) {
                    loginForm.addEventListener("submit", (event) => {
                        event.preventDefault();
                        const username = document.querySelector("#loginUsername").value;
                        const password = document.querySelector("#loginPassword").value;
    
                        if (auth.login(username, password)) {
                            console.log("✅ Inicio de sesión exitoso, redirigiendo...");
                            document.dispatchEvent(new Event("paginaCambiada")); // Redirigir
                        }
                    });
                }
    
                if (registerForm) {
                    registerForm.addEventListener("submit", (event) => {
                        event.preventDefault(); // Evita el envío por defecto del formulario
                
                        const username = document.querySelector("#registerUsername").value.trim();
                        const password = document.querySelector("#registerPassword").value.trim();
                        const confirmPassword = document.querySelector("#confirmPassword").value.trim();
                
                        const registroExitoso = auth.registrar(username, password, confirmPassword);
                
                        console.log("🔍 Resultado de registrar():", registroExitoso); // Depuración
                
                        if (!registroExitoso) {
                            console.log("❌ Registro fallido, deteniendo ejecución.");
                            return; // 🚨 DETIENE el código aquí si hay un error
                        }
                
                        console.log("✅ Registro exitoso, redirigiendo...");
                        document.dispatchEvent(new Event("paginaCambiada")); // Redirigir al login
                    });
                }
                                
                
            } else {
                intentos++;
                console.log(`⏳ Intento ${intentos}: Los formularios aún no están disponibles...`);
                if (intentos > 10) {
                    clearInterval(intervalo);
                    console.log("❌ No se encontraron los formularios después de varios intentos.");
                }
            }
        }, 100);
    }
    
    

    // ⏳ Esperar a que se cargue una nueva página antes de configurar eventos
    document.addEventListener("paginaCambiada", configurarEventos);

    if (!auth.estaAutenticado()) {
        console.log("🔐 No hay usuario autenticado, redirigiendo a login");
        navegacion.cambiarPagina({ target: { getAttribute: () => "inicioSesion" }, preventDefault: () => {} });
    } else {
        console.log("✅ Usuario autenticado, redirigiendo a 'verHoy'");
        navegacion.cambiarPagina({ target: { getAttribute: () => "verHoy" }, preventDefault: () => {} });
    }
});
