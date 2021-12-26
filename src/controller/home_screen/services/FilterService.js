class FilterService{

    constructor(){
        this.putListener()
    }


    putListener(){
        const selection = document.getElementById('locationselect');
        selection.addEventListener('click',()=>{
            const filterState = selection.options[selection.selectedIndex].text
            if(filterState!=='Informe o estado' && filterState!=='Todos'){
                const urlParams = new URLSearchParams(window.location.search);
                const pag = urlParams.get('pag')
                const id = urlParams.get('id')

                window.location.replace(`${window.location.pathname}?id=${id}&pag=${pag}&state=${filterState}`)
            }else{
                const urlParams = new URLSearchParams(window.location.search);
                const pag = urlParams.get('pag')
                const id = urlParams.get('id')

                window.location.replace(`${window.location.pathname}?id=${id}&pag=${pag}&state=null`)
            }
        })
    }
}

new FilterService();