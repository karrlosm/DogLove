class DogsSingleton{
    dogs;
    static instance=null;
    static getInstance(){
        if(this.instance === null){
            this.instance = new DogsSingleton();
        }
        return this.instance;
    }


    setDogs(dogs){
        this.dogs=dogs;
    }
    getDogs(){
        return this.dogs;
    }



}