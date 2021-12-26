class Profile{
    constructor(){
        this.getUser()
        
    }


    async getUser(){
        const id = this.getIdInCookie();
        const data = await fetch(`https://doglove-api.herokuapp.com/user/get-by-id?id=${id}`,
        {
            method:"GET"

        }).then(response =>{
            
            return response.json()
        
        });
        const name = data.name;
        const city = data.city
        const state = data.state;
        UserSingleton.getInstance().setUser(data)
        this.putNameAndCityOfUser(name, city, state);
    }

    putNameAndCityOfUser(name, city, state){
        const nomeDoUsuario = document.getElementById('user_name');
        const cidadeDoUsuario = document.getElementById('user_city');

        nomeDoUsuario.textContent = name;
        cidadeDoUsuario.textContent = `${city} - ${state}`;

    }

    getIdInCookie(){
        const cookies = new Cookie();
        
        return cookies.getCookie('id')
    }
}

new Profile();