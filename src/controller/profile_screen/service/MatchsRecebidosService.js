class EnviarEmail{
    async enviar(data){
        const cookies = new Cookie();
        const token = cookies.getCookie('token')
        const status = await fetch(`https://doglove-api.herokuapp.com/match/enviar-email`,
        {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'auth':token
            },
            body:JSON.stringify(data)

        }).then(response =>{
            return response.status
        
        });
    }
}


class AceitarMatch{

    constructor(){
        this.enviarEmail = new EnviarEmail();
        this.putListenerInButtons()
    }

    async deleteMatch(match){
        const cookies = new Cookie();
        const token = cookies.getCookie('token')
        const data = await fetch(`https://doglove-api.herokuapp.com/match?id=${match.id}`,
            {
                method:"DELETE",
                headers:{
                    'auth':token
                }
    
            }).then(response =>{
                return response
            
            });
        

        return data
    }

    async aceitarMatch(match){
        const linkContact = prompt("Cole algum link para contato")
        if(linkContact){
            const data = await this.deleteMatch(match);
            if(data.status===200){
                const user = UserSingleton.getInstance().getUser();
                let {dogInteressado} = match;
                let {dogDono} = match
    
                dogDono = dogDono.dogs['0'];
                dogInteressado = dogInteressado.dogs['0'];
    
                const emailDestinatario = dogInteressado.emailDono;
                const dogName1 = dogInteressado.nome
                const dogName2 = dogDono.nome

                const montarObject={
                    emailDestinatario:emailDestinatario,
                    dogName1:dogName1,
                    dogName2:dogName2,
                    nameUser: user.name,
	                contact:linkContact,
                }
            
    
                
                this.enviarEmail.enviar(montarObject)
                alert('Match retribuído com sucesso')
                window.location.reload()
            }else{
               alert('erro')
            }
        }else{
            alert('Precisa de um link para contato')
        }
        
    }

    putListenerInButtons(){
        const match_btn = document.getElementsByClassName('fav_bt')
        const recusarMatch_btn = document.getElementsByClassName('match_bt')

        for (let i = 0; i < match_btn.length; i++) {
            const element = match_btn[i];
            element.addEventListener('click',()=>{
                const match = MatchSingleton.getInstance();
                const index = Number.parseInt(element.name)
                this.aceitarMatch(match.getMatch()[index])
                
            })  
        }
        for (let i = 0; i < recusarMatch_btn.length; i++) {
            const element = recusarMatch_btn[i];
            element.addEventListener('click',async ()=>{
                const match = MatchSingleton.getInstance();
                const index = Number.parseInt(element.name)
                const linkContact = prompt("Digite 'sim' para confirmar")
                if(linkContact.toLowerCase()==='sim'){
                    await this.deleteMatch(match.getMatch()[index])
                    alert('Excluido com sucesso')
                    window.location.reload()
                }else{
                    alert('cancelado')
                }
                
            })  
        }
    }

    aceitar(){

    }
}


class MatchsRecebidosService{
    constructor(){
        this.getAllMaches()
    }


    async getAllMaches(){
        const cookies = new Cookie();
        const id = cookies.getCookie('id');
        const token = cookies.getCookie('token')
        const matchs = await fetch(`https://doglove-api.herokuapp.com/match/get-by-id?id=${id}`,
        {
            method:"GET",
            headers:{
                'auth':token
            }

        }).then(response =>{
            return response.json()
        
        });
        MatchSingleton.getInstance().setMatch(matchs)
        this.putConteiners(matchs)

        
    }
    putConteiners(matchs){
        let content = document.getElementById("grid");
        for (let i = 0; i < matchs.length; i++) {
            content.innerHTML += this.returnTheHtml(matchs[i],i);
            
        }
        new AceitarMatch()
    }

    returnTheHtml(dog,count){
        let {dogDono} = dog;
        let {dogInteressado} =dog;
        dogDono = dogDono.dogs['0']
        dogInteressado = dogInteressado.dogs['0']
        return `
        <div class="match_conteiner">
            <div class="match_content">
                <div class="dogs_Matching">
                    <div class="dog_conteiner">
                        <div class="conteiner_content">

                            <div class="dog_image">
                                <img src="${dogDono.linkImg}" alt="">
                            </div>
                                
                            <div class="dog_basic_info">
                                <div class="text_div">
                                    <p class="dog_name">${dogDono.nome}</p>
                                    <p class="dog_local">${dogDono.state}</p> 
                                    <p class="dog_local">${dogDono.sexo}</p> 
                                    
                                </div>
                                <div class="star_div">
                                    <img src="../../../../src/img/profile_screen/estrela.svg" alt="">
                                    <h1 class="dog_stars">3</h1>
                                </div>
                            </div>

                        </div>
                    </div>
                        <h1>+</h1>
                    <div class="dog_conteiner">
                        <div class="conteiner_content">

                            <div class="dog_image">
                                <img src="${dogInteressado.linkImg}" alt="">
                            </div>
                            
                            <div class="dog_basic_info">
                                <div class="text_div">
                                    <p class="dog_name">${dogInteressado.nome}</p>
                                    <p class="dog_local">${dogDono.state}</p> 
                                    <p class="dog_local">${dogDono.sexo}</p> 
                                </div>
                                <div class="star_div">
                                    <img src="../../../../src/img/profile_screen/estrela.svg" alt="">
                                    <h1 class="dog_stars">3</h1>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>    
                <div class="matchBtns">
                    <button class="match_bt" name="${count}" id="match_bt"><img src="../../../img/pop_ups/lixo_match.svg" alt="" class="svg_bt">Recusar Match</button> 
                    <button class="fav_bt" name="${count}" ><img src="../../../img/pop_ups/coracao.svg" alt="" class="svg_bt">Aceitar Match</button>
                    
                </div>
            </div>
        </div>
            
        `
        

    }



}
new MatchsRecebidosService()