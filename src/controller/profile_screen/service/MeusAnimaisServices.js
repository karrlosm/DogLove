function popupMoreInfo(dog){
    return `
    <div class="modal" id = "popup_window">
        <div id="popup">
            <div class="close_svg">
                <img id="close" src="../../../img/profile_screen/cruz-pequeno.svg" alt="" class="close">
            </div>
            <div class="data_animal">
                <div class="imgdog" >
                    <img src="${dog.linkImg}" alt="">
                </div>
                
                <div class="form_data">
                    <div class="pop_data">
                        <label for="" class="label_pop">Nome:</label>
                        <label for="" id="raca_pop" class="label_resp">${dog.nome}</label>     
                        </div> 

                    <div class="pop_data">
                        <label for="" class="label_pop">Raça:</label>
                        <label for="" id="raca_pop" class="label_resp">${dog.raca}</label>     
                    </div> 
    
                    <div class="pop_data"> 
                        <label for="" class="label_pop">Endereço:</label>
                        <label for="" id="address_pop" class="label_resp"> ${dog.city} - ${dog.state}</label>
                    </div> 
    
                    <div class="pop_data">
                        <label for="" class="label_pop">Sexo: </label>
                        <label for="" id="genre_pop" class="label_resp">${dog.sexo}</label>
                    </div> 
    
                    <div class="pop_data">
                        <label for="" class="label_pop">Idade:</label>
                        <label for="" id="gente_pop" class="label_resp">${dog.idade}</label>
                    </div> 
                </div>
            </div> 

            <div class="buttons">
                <button class="delete_bt" id="delete_btn"><img src="../../../img/pop_ups/lixo.svg" alt="" class="svg_bt">Excluir</button>
            </div>
        </div>
    </div>
    
    `
}




class PopupWindow{

    putListenerInClosePopup(){
        const close = document.getElementById('close')
        close.addEventListener('click',()=>{
            const popup_window =document.getElementById('popup_window');
            const section = document.getElementById('topop')
            
            section.removeChild(popup_window)

        })
    }


}

class MakeMatch{

    async match(data){
        const cookies = new Cookie();
        const token = cookies.getCookie('token');

        const status = await fetch(`https://doglove-api.herokuapp.com/match`,
        {
            method:"POST",
            headers:{
                'auth':token,
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)

        }).then(response =>{
            return response.status
        
        });

        if(status ===200){
            alert('Match feito com sucesso')
            window.location.replace('../../../html/home_screen/home_index.html')
        }else{
            alert('Match deu errado')
        }
    }

}



class MeusAnimaisService{

    
    constructor(){
        this.isMatch =this.isMatch();

        this.init()
    }

    isMatch(){
        const urlParams = new URLSearchParams(window.location.search);
        const idDog = urlParams.get('idDog')
        const idUser = urlParams.get('idUser')
        if(idUser === null && idDog===null){
            return null
        }
        const plname = document.getElementById('plname');
        plname.textContent = 'Escolha um dog para dar match'
        return[
            true,
            idUser,
            idDog,]
    }

    async match(dog){
        
        if(this.isMatch !== null){
            const matchPronto ={
                idUserOne: this.isMatch[1],
                idDogOne: this.isMatch[2],
                idUserTwo: dog._idUser,
                idDogTwo: dog._id,
                emailUser: dog.emailDono
            }
            const match = new MakeMatch()
            await match.match(matchPronto);
        }
        
    }


    async init(){
        const dogs = await this.putDogs(1)
        this.putListenersInMoreInfo();
        this.putListenersPagination();

    }
    async putListenersInMoreInfo(){
        const dogsModel = await DogsSingleton.getInstance().getDogs().dogs;
        const moreinfo_btn = document.getElementsByClassName('info')
        if(moreinfo_btn.length!==0){
            const popup = new PopupWindow();

            for (let i = 0; i < moreinfo_btn.length; i++) {
                const element = moreinfo_btn[i];
                element.addEventListener('click', () => {
                    const section = document.getElementById('topop')
    
                    const dog = dogsModel[Number.parseInt(element.name)];
                    const html = popupMoreInfo(dog);
        
                    section.innerHTML += html;
    
                    this.putListenersInMoreInfo();
                    this.putListenerInDelete(dog)
                    popup.putListenerInClosePopup();
            
                }) 
            }
        }else{
            const match = document.getElementsByClassName('match')
            for (let i = 0; i < match.length; i++) {
                const element = match[i];

                element.addEventListener('click',()=>{
                    const dog = dogsModel[Number.parseInt(element.name)];
                    this.match(dog)
                })
                
            }
            
        }
        this.putListenersPagination();
        

    }

    putListenerInDelete(dog){
        const delete_btn = document.getElementById('delete_btn')
        delete_btn.addEventListener('click',async ()=>{
           
            
            await this.deleteDog(dog._id,dog.linkImg.split('dogs/')[1])
        })

    }



    putListenersPagination(){
        const dogModel = DogsSingleton.getInstance()
        const next = document.getElementById('right');
        const previous = document.getElementById('left');
        next.addEventListener('click', async ()=>{
            const pagination = document.getElementById('index')
            const pagAtual = Number.parseInt(pagination.textContent);
            let qtdPag = Number.parseInt( dogModel.getDogs().qtdPaginas === undefined?1:dogModel.getDogs().qtdPaginas)
            
            if(pagAtual !== qtdPag){
                pagination.textContent = pagAtual + 1
                await this.putDogs((pagAtual + 1))
                this.putListenersInMoreInfo();
            }
        })

        previous.addEventListener('click', async ()=>{
            const pagination = document.getElementById('index')
            const pagAtual = Number.parseInt(pagination.textContent);
            if(pagAtual !== 1){
                pagination.textContent = pagAtual -1
                await this.putDogs((pagAtual -1))
                this.putListenersInMoreInfo();
            }
        })
    }

   async putDogs(pag){
        const dogs = await this.getDogs(pag);

        let grid = document.getElementById('grid');
        grid.innerHTML =""
        let count = 0
        dogs.dogs.forEach(animal => {
            grid.innerHTML += this.returnTheHtml(animal, count);
            count++;
        });
    }

    async deleteDog(_id, linkImg){
        
        const cookies = new Cookie();
        const token = cookies.getCookie('token');
        const statusDog = await fetch(`https://doglove-api.herokuapp.com/dog`,
        {
            method:"DELETE",
            headers:{
                'Content-Type':'application/json',
                'auth':token
            },
            body:JSON.stringify({_id})

        }).then(response =>{
            return response.status
        
        });

        const statusImg = await fetch(`https://doglove-api.herokuapp.com/dog/delete-img`,
        {
            method:"DELETE",
            headers:{
                'Content-Type':'application/json',
                'auth':token
            },
            body:JSON.stringify({name: linkImg})

        }).then(response =>{
            return response.status
        
        });

        if(statusDog===200 && statusImg===200){
            alert('Dog excluido com sucesso')
            window.location.reload();
        }

    }

    async getDogs(pag){
        const cookies = new Cookie();
        const id = cookies.getCookie('id');
        const token = cookies.getCookie('token');
        pag = pag===undefined?1:pag
        const dogsModel = DogsSingleton.getInstance()
    
        const dogs = await fetch(`https://doglove-api.herokuapp.com/dog/get-by-dono?id=${id}&pag=${pag}`,
        {
            method:"GET",
            headers:{
                'auth':token
            },

        }).then(response =>{
            return response.json()
        
        });
        dogsModel.setDogs(dogs);
       

        
        return dogs;
    }

    returnTheHtml(dog, count){

        const info = this.isMatch === null?'Mais informações':'Match'
        const class_btn = this.isMatch===null?'info':'match'
     
       return `
       
            <div class="dog_conteiner">
                <div class="conteiner_content">

                    <div class="dog_image">
                        <img src="`+dog.linkImg+`" alt="">
                    </div>
                    
                    <div class="dog_basic_info">
                        <div class="text_div">
                            <p class="dog_name">`+dog.nome+`</p>
                            <p class="dog_local">`+dog.sexo+`</p> 
                        </div>
                        <div class="star_div">
                            <img src="../../../../src/img/profile_screen/estrela.svg" alt="">
                            <h1 class="dog_stars">3</h1>
                        </div>
                    </div>

                    <div class="info_button">
                        <button name =${count} id="more_info" class="${class_btn}">${info}</button>
                    </div>

                </div>
            </div>

            
        `
    }


}

new MeusAnimaisService()