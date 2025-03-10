class ActualUser {
    constructor() {
        if (!ActualUser.instance) {
            this.user = undefined;
            ActualUser.instance = this;
        }
        return ActualUser.instance;
    }

    getData() {
        return this.user;
    }

    setData(newUser) {
        this.user = newUser;
    }
}

export default ActualUser;