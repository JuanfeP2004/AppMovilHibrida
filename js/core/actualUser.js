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

    incStreak() {
        this.user.pomodoro.streak++;
    }

    setLastTime(value) {
        this.user.pomodoro.last_date = value;
    }

    setFirstTime(value) {
        this.user.pomodoro.first_time = value;
    }

    setStudyTime(value) {
        this.user.pomodoro.study_duration = value;
    }

    setBreakTime(value) {
        this.user.pomodoro.break_duration = value;
    }
    setRepetitions(value) {
        this.user.pomodoro.repetitions = value;
    }
}

export default ActualUser;