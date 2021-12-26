class PopUpContribuir {

    constructor() {
        this.putPopUp();
    }
    
    putPopUp(){
        const payus = document.getElementById("contribuir");
    
        payus.addEventListener("click", () => {
            let content = document.getElementById('body');
            let html = this.returnTheHTML();
            content.innerHTML += html;
            this.putListenerToClosePopup();
        })
        
    
    
    }


    putListenerToClosePopup(){
        const close_p = document.getElementById('close_pay');
        close_p.addEventListener('click',()=>{
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
                        <img id="close_pay" src="../../img/profile_screen/cruz-pequeno.svg" alt="" class="close">
                    </div>
    
                    <div class="tittle_bar">
                        <div class="tittle_logo">Dog Love</div>
                    </div>
                    
                    <div class="text_about">
                        Em breve você poderá nos ajudar! Desde já, ficamos gratos por seu interesse.
                    </div>
                </div>
            </div>
        
        
        
        
        `
    }

}

new PopUpContribuir();