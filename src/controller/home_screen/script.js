class getUserLogged{

    constructor(){
        this.getURLparams()
    }

    getURLparams(){
        const urlParams = new URLSearchParams(window.location.search);
        let id = urlParams.get('id')
        if(id === null){
            const cookie = new Cookie();
            id = cookie.getCookie('id')
            window.location =  window.location.pathname+`?id=${id}&pag=1`
        }
        
    }



}

new getUserLogged();