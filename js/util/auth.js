import Storage from 'util/storage.js';

class Auth {
  constructor() {
    this.users = Storage.getData('users') || [];
    this.currentUser = Storage.getData('currentUser') || null;
  }

  
  register(username, password) {
    if (this.users.some(user => user.username === username)) {
      return { success: false, message: 'El usuario ya existe' };
    }

    const newUser = { username, password };
    this.users.push(newUser);
    Storage.saveData('users', this.users);

    return { success: true, message: 'Usuario registrado exitosamente' };
  }

  
  login(username, password) {
    const user = this.users.find(user => user.username === username && user.password === password);

    if (user) {
      this.currentUser = user;
      Storage.saveData('currentUser', user);
      return { success: true, message: 'Inicio de sesión exitoso' };
    } else {
      return { success: false, message: 'Usuario o contraseña incorrectos' };
    }
  }

  
  logout() {
    this.currentUser = null;
    Storage.clearData('currentUser');
  }
}

export default Auth;
