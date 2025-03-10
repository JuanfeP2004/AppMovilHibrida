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
                this.badlogin.textContent = '';

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

    constructor(usuario_actual, usuarios, navegacion){
        this.usuario_actual = usuario_actual;
        this.navegacion = navegacion;
        this.usuarios = usuarios;

        this.usuario_ref = document.getElementById('username');
        this.password_ref = document.getElementById('password');
        this.badlogin = document.getElementById('bad-login');

        document.getElementById('ingresar').addEventListener('click', this.login.bind(this));
    }
}

export default InicioSesion;