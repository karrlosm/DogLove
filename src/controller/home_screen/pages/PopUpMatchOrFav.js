
const urlParams = new URLSearchParams(window.location.search);
function putElements(dogs){

    let id = urlParams.get('id')
    let html = returnTheHTML(dogs, id)
    let content = document.getElementById('body');
    
    content.innerHTML += html;
    putListenerToClosePopup();
    putListenerToMatch(dogs);
}

function putListenerToClosePopup(){
    const close_btn = document.getElementById('close');
    close_btn.addEventListener('click',()=>{
        const section = document.getElementById('body')
        const popup_window = document.getElementById('popup_window');
        section.removeChild(popup_window)
    })
}
function putListenerToMatch(dogs){
    const match_btn = document.getElementById('match_bt')
    if(match_btn!==null){
        match_btn.addEventListener('click',()=>{
            const idDog = dogs._id;
            const idUser = dogs._idUser;
            window.location.replace(
                `../../html/profile_screen/pages/2MeusAnimais.html?idDog=${idDog}&idUser=${idUser}`)
        })
    }
}
function returnPopUp(moreinfo_btn) {
    const dogsModel = DogsSingleton.getInstance()
    const listDogs = dogsModel.getDogs();

    for (let i = 0; i < moreinfo_btn.length; i++) {
        const element = moreinfo_btn[i];

        element.addEventListener('click', () => {
            const index = Number.parseInt(element.name);

            this.putElements(listDogs.dogs[index]);
        }) 
        
    }

}
function returnTheHTML(dog, idUser) {

    const btn = dog._idUser !== idUser?`<div class="buttons">
    <button class="match_bt" id="match_bt"><img src="../../img/pop_ups/coracao.svg" alt="" class="svg_bt">Match</button>
</div>`:`<spam class="message">Não é possível dar match! <br> Esse dog pertence a você.</spam>`


    return `
    
    <div id ="popup_window" class="modal_feed">
    <div id="popup">
        <div  class="close_svg " >
            <img id="close" src="../../img/profile_screen/cruz-pequeno.svg" alt="" class="close">
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
                    <label for="" id="address_pop" class="label_resp">${dog.city} - ${dog.state}</label>
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

        ${btn}
    </div>
    </div>
    
    `
}


