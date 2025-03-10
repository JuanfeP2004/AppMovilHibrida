import User from "../data/user.js";

class InicioSesion {

    login(evento) {

        evento.preventDefault();

        let usuario = this.usuario_ref.value;
        let password = this.password_ref.value;

        let existe = this.usuarios.find((obj) => obj.name === usuario);

        if (existe) {
            if (existe.password === password) {

                this.usuario_ref.value = '';
                this.password_ref.value = '';

                console.log(existe);
                localStorage.setItem('Sesion', JSON.stringify(existe));
                this.usuario_actual.setData(new User(existe.name, existe.password, existe.pomodoro, existe.tareas));
                this.badlogin.textContent = '';
                this.calendario.ponerMes(new Date().getMonth());
                this.ver_hoy.mostrarTareasHoy();
                this.calendario.ponerTareas(new Date().getMonth(), new Date().getFullYear());
                this.navegacion.cambiarPaginaString('verHoy');
                return;
            }
            else {
                this.badlogin.textContent = 'Contraseña incorrecta';
                return;
            }
        }
        else {
            this.badlogin.textContent = 'Usuario incorrecto';
            return;
        }
    }

    logout() {
        localStorage.setItem('Sesion', undefined);
        this.usuario_actual.setData(undefined);
    }

    constructor(usuario_actual, usuarios, navegacion, calendario, ver_hoy){
        this.usuario_actual = usuario_actual;
        this.navegacion = navegacion;
        this.calendario = calendario;
        this.ver_hoy = ver_hoy;
        this.usuarios = usuarios;

        this.usuario_ref = document.getElementById('username');
        this.password_ref = document.getElementById('password');
        this.badlogin = document.getElementById('bad-login');

        document.getElementById('ingresar').addEventListener('click', this.login.bind(this));
        document.querySelectorAll('.login-back').forEach(node =>
            node.addEventListener('click', this.logout.bind(this))
        );
    }
}

export default InicioSesion;