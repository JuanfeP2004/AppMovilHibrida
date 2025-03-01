// auth.js

class Auth {
    constructor() {
        this.usuarioActual = null;
    }

    registrar(usuario, contrasena) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        if (usuarios.some(u => u.usuario === usuario)) {
            alert('El usuario ya existe.');
            return false;
        }
        
        usuarios.push({ usuario, contrasena });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        return true;
    }

    iniciarSesion(usuario, contrasena) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        let usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);

        if (usuarioEncontrado) {
            localStorage.setItem('usuarioActual', usuario);
            this.usuarioActual = usuario;
            return true;
        }
        alert('Usuario o contraseña incorrectos.');
        return false;
    }

    cerrarSesion() {
        localStorage.removeItem('usuarioActual');
        this.usuarioActual = null;
        alert('Sesión cerrada correctamente.');
    }

    estaAutenticado() {
        return localStorage.getItem('usuarioActual') !== null;
    }
}

export default Auth;