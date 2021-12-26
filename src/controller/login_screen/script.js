class Login{
    constructor(){
        let form = document.forms[0];

        form.addEventListener('submit', (e)=>{
            e.preventDefault()
    
            const email = form.elements[1].value;
            const password = form.elements[2].value;
    
            this.login(email, password);
        })
    }

    async login(email, password){
        const login ={
            email,
            password
        }
    
        const data = await fetch("https://doglove-api.herokuapp.com/user/login",
            {
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(login)

            }).then(response =>{
                return response.json()
            
            });

        if(data.id !== undefined){
            const cookie = new Cookie();
            cookie.setCookie('token',data.token,1)
            cookie.setCookie('id',data.id,1)
            this.abrirHomePage(data.id)
        }else{
            alert('Login incorreto')
        }
    }

    abrirHomePage(id){
        window.location.replace(`../../html/home_screen/home_index.html?id=${id}&pag=1`)
    }


}

new Login();