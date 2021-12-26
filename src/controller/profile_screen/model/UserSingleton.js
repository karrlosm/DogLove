class UserSingleton{
    user;
    static instance=null;
    static getInstance(){
        if(this.instance === null){
            this.instance = new UserSingleton();
        }
        return this.instance;
    }


    setUser(user){
        this.user=user;
    }
    getUser(){
        return this.user;
    }

}