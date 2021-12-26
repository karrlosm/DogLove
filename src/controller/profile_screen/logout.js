
function logout(){
    const btn = document.getElementById('logout_btn')
    btn.addEventListener("click", ()=>{
        const cookies = new Cookie();
        cookies.eraseCookie('id');
        cookies.eraseCookie('token');
        const location = window.location.pathname;
        
        if(location==='/src/html/profile_screen/profile_index.html'){
            window.location.reload()
        }else{
            window.location.replace('../../login_screen/login_index.html')

        }

    })
}

logout();