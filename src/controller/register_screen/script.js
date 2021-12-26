class Register{


    constructor(){
        let form = document.forms[0];

        form.addEventListener('submit', (e)=>{
            e.preventDefault()
    
            const name = form.elements[1].value;
            const email = form.elements[2].value;
            const password = form.elements[3].value;
            const state = form.elements[4].value;
            const city = form.elements[5].value;
            const district = form.elements[6].value;
            
            const user ={
                name,
                email,
                password,
                state,
                city,
                district,
            }

            this.register(user)
            
        })
    }

    async register(user){

        const status = await fetch("https://doglove-api.herokuapp.com/user",
            {
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(user)

            }).then(response =>{
                return response.status
            
            });
        
            this.response(status)
    }


    response(status){
        if(status === 201){
            alert('Usuário criado com sucesso')
            window.location.replace(`../../html/login_screen/login_index.html`)
        }else{
            alert('Email já cadastrado ou campos em branco. Tente novamente')
        }

    }
    
}

new Register();