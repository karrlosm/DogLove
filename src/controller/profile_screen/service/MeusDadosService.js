class MeusDadosService{
    constructor(){
        this.actionButtons();
        this.isUpdateValid();
    }

    getCampos(){
        const name = document.getElementById('username').value;
        const state = document.getElementById('state_user').value;
        const city = document.getElementById('city_user').value;
        const district = document.getElementById('district_user').value;

        return {
            name,state,city,district
        }
    }



    isUpdateValid(){
        const salvar = document.getElementById('save_bt');
        salvar.addEventListener('click',()=>{
            const user = this.getCampos()
            
            if(!user.name||!user.state||!user.city||!user.district){
                return alert('Preencha os dados corretamente')
            }
            this.fazerUpdate(user);

        })
    }

    async fazerUpdate(user){
        const token = this.getIdAndTokenInCookie(0);
        const _id = this.getIdAndTokenInCookie(1);

        const status = await fetch("https://doglove-api.herokuapp.com/user",
        {
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                'auth':token
            },
            body: JSON.stringify({
                _id:_id,
                name: user.name,
                state:user.state,
                city:user.city,
                district:user.district
            })

        }).then(response =>{
            return response.status
        
        });

        if(status===200){
            alert('Usuário alterado com sucesso');
            window.location.reload()
            
        }
    }



    selectState(state) {
        return `
            <option disabled selected hidden>${state}</option>
            <option value="AC">AC</option>
            <option value="AL">AL</option>
            <option value="AP">AP</option>
            <option value="AM">AM</option>
            <option value="BA">BA</option>
            <option value="CE">CE</option>
            <option value="DF">DF</option>
            <option value="ES">ES</option>
            <option value="GO">GO</option>
            <option value="MA">MA</option>
            <option value="MT">MT</option>
            <option value="MS">MS</option>
            <option value="MG">MG</option>
            <option value="PA">PA</option>
            <option value="PB">PB</option>
            <option value="PR">PR</option>
            <option value="PI">PI</option>
            <option value="RJ">RJ</option>
            <option value="RN">RN</option>
            <option value="RS">RS</option>
            <option value="RO">RO</option>
            <option value="RR">RR</option>
            <option value="SC">SC</option>
            <option value="SP">SP</option>
            <option value="SE">SE</option>
            <option value="TO">TO</option>

        `
    }

    async getUser(user){

        const name = user.name;
        const email = user.email;
        const estado = user.state;
        const city = user.city;
        const bairro = user.district;
        this.putDataInForm(name, email, estado, city, bairro);
    }
    actionButtons() {
        const button_editar = document.getElementById('edit_bt');
        button_editar.addEventListener('click', () => {
            const user = UserSingleton.getInstance().getUser();
            this.getUser(user);
            const select_state = document.createElement("select");
            select_state.classList.add("input_camp");
            select_state.setAttribute('id', 'state_user');
            select_state.innerHTML = this.selectState(user.state);
            const estadocamp = document.getElementById('state_user');
            
            estadocamp.parentNode.replaceChild(select_state, estadocamp);

            const inputs = document.getElementsByClassName('input_camp');
            for(let i = 0;  i< inputs.length; i++) {
         
                if(i!==1 && i !==2){
                    inputs[i].removeAttribute('readonly');
                    inputs[i].style.cssText='background-color:rgb(255, 255, 255);'
                }
                inputs[i].style.cssText+='color:rgb(0, 0, 0);'
                
            }
        })
    }




    putDataInForm(name, email, estado, city, bairro){
        const nomeDoUsuario = document.getElementById('username');
        const emailDoUsuario = document.getElementById('email_user');
        const estadoDoUsuario = document.getElementById('state_user');
        const bairroDoUsuario = document.getElementById('district_user');
        const cidadeDoUsuario = document.getElementById('city_user');

        nomeDoUsuario.value = name;
        emailDoUsuario.value = email;
        estadoDoUsuario.value= estado;
        bairroDoUsuario.value = bairro;
        cidadeDoUsuario.value = city;
    }

    getIdAndTokenInCookie(number){
        const cookies = new Cookie();
        return number===1?cookies.getCookie('id'):cookies.getCookie('token')
    }
}

new MeusDadosService();