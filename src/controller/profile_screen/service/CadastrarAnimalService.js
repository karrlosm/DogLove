class CadastrarAnimalService{

    constructor(){
        console.log('dsada')
        this.dadosNoLabelFile();

        let form = document.getElementById('cadastro_animal');
        form.addEventListener('submit', (e)=>{
            e.preventDefault()
            const imgDog = form.elements[0].files[0];
            const nome =  form.elements[1].value;
            const raca = form.elements[2].value;
            const idade = form.elements[3].value;
            const sexo = form.elements[4].checked?"Macho":form.elements[5].checked?"Fêmea":"";
            const descricao = form.elements[6].value;

            
            const dog = {
                nome,
                sexo,
                idade,
                raca,
                descricao,
                imgDog
            }
            this.cadastrar(dog)
        })
    }

    async cadastrar(dog){
        const dogPreparado = this.prepararObjeto(dog);

        const status = await fetch("https://doglove-api.herokuapp.com/dog",
        {
            method:"POST",
            headers:{
                'auth':dogPreparado[0]
            },
            body:dogPreparado[1] 

        }).then(response =>{
            return response.status
        
        });

        if(status ===201){ 
            alert('Dog cadastrado')
            window.location.reload();
        }else{
            alert('Dog não cadastrado')
        }
    }

    dadosNoLabelFile() {
        const input = document.getElementById("arquivo");
        const text = document.getElementById("text");

        input.addEventListener("change", () => {
            const list_file = input.value.split('\\');
            const file_name = list_file[list_file.length - 1];

            text.innerText = file_name ? file_name : "Escolher arquivo"

        })

    }

    prepararObjeto(dog){
        const cookies = new Cookie();
        const idUser = cookies.getCookie('id');
        const token = cookies.getCookie('token')
        const user = UserSingleton.getInstance().getUser();

        const data = new FormData();
        data.append('_idUser',idUser);
        data.append('nome',dog.nome);
        data.append('sexo',dog.sexo);
        data.append('idade',dog.idade);
        data.append('raca',dog.raca);
        data.append('descricao',dog.descricao);
        data.append('city', user.city);
        data.append('state',user.state);
        data.append('foto',dog.imgDog);
        data.append('emailDono', user.email)
        
        return [token,
            data
        ]

    }


}

new CadastrarAnimalService();