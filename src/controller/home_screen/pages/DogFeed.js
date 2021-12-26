class DogFeed{
    constructor(){
        this.putElements()
        this.putListeners();
    }
    
    putElements(){
        let content = document.getElementById('content');
        content.innerHTML = `
            <div class="grid" id="grid"></div>
            
        `
        
    }

    putListeners(){
        const urlParams = new URLSearchParams(window.location.search);
        let pag = urlParams.get('pag')
        let id  = urlParams.get('id')

        const dogModel = DogsSingleton.getInstance()
        const next = document.getElementById('right');
        const previous = document.getElementById('left');
        let paginaAtual = 1;
        next.addEventListener('click', async ()=>{



            const urlParams = new URLSearchParams(window.location.search);
            const state = urlParams.get('state')
            let pag = Number.parseInt(urlParams.get('pag'))
            const qtdPag = Number.parseInt( dogModel.getDogs().qtdPaginas)
            if(pag !== qtdPag){
                window.location.replace(`${window.location.pathname}?id=${id}&pag=${++pag}&state=${state}`)
            }
        })

        previous.addEventListener('click', async ()=>{
            const urlParams = new URLSearchParams(window.location.search);
            const state = urlParams.get('state')
            let pag = Number.parseInt(urlParams.get('pag'))

            if(pag !== 1){
                window.location.replace(`${window.location.pathname}?id=${id}&pag=${--pag}&state=${state}`)
            }
        })
    }
    
}
new DogFeed();