class MatchSingleton{
    matchs;
    static instance=null;
    static getInstance(){
        if(this.instance === null){
            this.instance = new MatchSingleton();
        }
        return this.instance;
    }


    setMatch(match){
        this.match=match;
    }
    getMatch(){
        return this.match;
    }



}