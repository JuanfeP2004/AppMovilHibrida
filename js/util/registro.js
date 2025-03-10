import User from "../data/user.js";

class Registro {

    registro(evento) {

        evento.preventDefault();

        let username = this.username.value;
        let password = this.password.value;
        let confirmPassword = this.confirmPassword.value;

        if(username.length < 3){
            this.error.textContent = 'Nombre demasiado corto';
            return;
        }

        if (password.length < 3) {
            this.error.textContent = 'Contraseña demasiado corta';
            return;
        }

        if (password !== confirmPassword) {
            this.error.textContent = 'Las contraseñas no coinciden';
            return;
        }

        let existe = this.usuarios.find((obj) => obj.name === username);

        if (!existe) {
            console.log('Registro exitoso');

            this.error.textContent = '';

            this.usuarios.push(new User(username, password, 0, []));
            localStorage.setItem('Usuarios', JSON.stringify(this.usuarios));

            this.username.value = '';
            this.password.value = '';
            this.confirmPassword.value = '';
            this.navegacion.cambiarPaginaString('inicioSesion');
            return;
            }
        else {
            this.error.textContent = 'Ya existe otro usuario con el mismo nombre';
        }
    }

    devolverLogin(){
        this.username.value = '';
        this.password.value = '';
        this.confirmPassword.value = '';
        this.error.textContent = '';
        return;
    }

    constructor(usuarios, navegacion){

        this.usuarios = usuarios;
        this.navegacion = navegacion;

        this.username = document.getElementById('rgt-username');
        this.password = document.getElementById('rgt-password');
        this.confirmPassword = document.getElementById('confirmPassword');
        this.error = document.getElementById('bad-register');

        document.getElementById('register').addEventListener('click', this.registro.bind(this));
        document.getElementById('cancelar-registro').addEventListener('click', this.devolverLogin.bind(this));
    }
}

export default Registro;