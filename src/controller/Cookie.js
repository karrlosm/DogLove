

class Cookie{
    setCookie(nome,valor,days) {
        let validade = "";
    
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            validade = "; expires=" + date.toUTCString();
        }
        document.cookie = nome + "=" + (valor || "")  + validade + "; path=/";
    }

    getCookie(nome) {
        let nomeCookie = nome + "=";
        let ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            let c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length)
            if (c.indexOf(nomeCookie) == 0){
                return c.substring(nomeCookie.length,c.length);
            }
        }
        return null;
    }

    eraseCookie(nome) {   
        document.cookie = nome +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}


function goToHome(id, token){

   if(token !== null && id !== null){
        window.location.replace(`../../html/home_screen/home_index.html?id=${id}&pag=1`)
   }
}

function goToLogin1(id, token){

    if(token === null || id === null){
        window.location.replace(`../../html/login_screen/login_index.html`)
   }
}
function goToLogin2(id, token){

    if(token === null || id === null){
        window.location.replace(`../../login_screen/login_index.html`)
   }
}




function redirect(){
    let location = window.location.pathname;
    const cookies = new Cookie();

    let token = cookies.getCookie('token')
    let id = cookies.getCookie('id')

    if(
    location === '/src/html/login_screen/login_index.html' ||
    location === '/src/html/register_screen/register_screen.html'){

        goToHome(id, token);

    }else if (
    location === '/src/html/profile_screen/profile_index.html'||
    location === '/src/html/home_screen/home_index.html'){

        
        goToLogin1(id,token)
    }else if(
        location==='/src/html/profile_screen/pages/1CadastrarAnimal.html'||
        location==='/src/html/profile_screen/pages/2MeusAnimais.html' ||
        location==='/src/html/profile_screen/pages/3MatchsRecebido.html'||
        location==='/src/html/profile_screen/pages/7MeusDados.html'){
            goToLogin2(id, token)

    }
}

redirect();
