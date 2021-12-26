class PopUpAbout {

    constructor() {
        this.putPopUp();
    }
    
    putPopUp(){
        const about = document.getElementById("aboutus");
    
        about.addEventListener("click", () => {
            let content = document.getElementById('body');
            let html = this.returnTheHTML();
            content.innerHTML += html;
            this.putListenerToClosePopup();
        })
        
    
    
    }

    putListenerToClosePopup(){
        const close_btn = document.getElementById('close_ab');
        close_btn.addEventListener('click',()=>{
            const section = document.getElementById('body')
            const popup_window = document.getElementById('popup_window');
            section.removeChild(popup_window)
        })
    }
    
    returnTheHTML(){
        return `
        <div id="popup_window" class="modal_feed">
                <div id="popup">
                    <div  class="close_svg " >
                        <img id="close_ab" src="../../img/profile_screen/cruz-pequeno.svg" alt="" class="close">
                    </div>
    
                    <div class="tittle_bar">
                        <div class="tittle_logo">Dog Love</div>
                    </div>
                    
                    <div class="text_about">
                        O DOG LOVE vem para melhorar a vida de usuários que desejam prolongar a linhagem dos seus peludinhos queridos, nada mais de ficar buscando em vários lugares diferentes, nosso site vem para resolver isso, com uma busca rápida e efetiva selecionar um parceiro para seu animalzinho se torna mais rápido e fácil, os melhores candidatos e escolhas a apenas um match.
                    </div>
                </div>
            </div>
        
        
        
        
        `
    }

}

new PopUpAbout();