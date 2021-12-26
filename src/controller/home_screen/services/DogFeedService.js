class DogFeedService{
    constructor(dogs){
        this.putDogs(dogs)
    }


    async putDogs(dogsRecebido){

        let dogs = dogsRecebido;
        if(dogsRecebido===undefined){
            dogs = await this.getDogs();
        }
        let grid = document.getElementById('grid');

        let count = 0;


        dogs.dogs.forEach(animal => {
            grid.innerHTML += this.returnTheHtml(animal, count);
            count++;
        });

        const moreinfo_btn = document.getElementsByClassName('infofeed')
        returnPopUp(moreinfo_btn)
        
    }
    async putDogsByDistrict(state,pag){
        const cookies = new Cookie();
        const token = cookies.getCookie('token');

        const dogs = await fetch(`https://doglove-api.herokuapp.com/dog/filter-by-state?state=${state}&pag=${pag}`,
        {
            method:"GET",
            headers:{
                'auth':token
            },

        }).then(response =>{
            return response.json()
        
        });

        return dogs

    }
    async getDogs(){
        let dogs;
        const cookies = new Cookie();
        const token = cookies.getCookie('token');
        const urlParams = new URLSearchParams(window.location.search);

        let pag = urlParams.get('pag')
        let state = urlParams.get('state')

        if(state !==null && state !== 'null'){
            const selection = document.getElementById('locationselect');
            
            selection.value = state
            dogs = await this.putDogsByDistrict(state,pag)
        }else{
            const index = document.getElementById('index')
            index.textContent = pag;
    
            dogs = await fetch(`https://doglove-api.herokuapp.com/dog?pag=${pag}`,
            {
                method:"GET",
                headers:{
                    'auth':token
                },
    
            }).then(response =>{
                return response.json()
            
            });
        }

        const dogsModel = DogsSingleton.getInstance()
        dogsModel.setDogs(dogs);
        return dogs;
    }


    returnTheHtml(dog,count){
  

        return `
        <div class="dog_conteiner">
        <div class="conteiner_content">
            <div class="dog_image">
                <img src="`+dog.linkImg+`" alt="">
            </div>
            
            <div class="dog_basic_info">
                <div class="text_div">
                    <p class="dog_name">`+dog.nome+`</p>
                    <p class="dog_local">${dog.state}</p> 
                    <p class="dog_local">${dog.sexo}</p> 
                </div>
                <div class="star_div">
                    <img src="../../../../src/img/profile_screen/estrela.svg" alt="">
                    <h1 class="dog_stars"></h1>
                </div>
            </div>
            <div class="info_button">
                <button name="${count}" class="infofeed">Mais informações</button>
            </div>
        </div>
    </div>
        `
    }



}

new DogFeedService()