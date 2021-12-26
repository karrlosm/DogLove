class ValidateToken{
    cookies = new Cookie()

    constructor(){
        this.isTokenValid()
    }
    async isTokenValid(){
        
        const token = this.cookies.getCookie('token');

        const status = await fetch("https://doglove-api.herokuapp.com/user/validate-token",
            {
                method:"GET",
                headers:{
                    'token':token
                }

            }).then(response =>{
                return response.status
            
            });
        if(status === 401){
            this.refreshToken(token)
        }
    }

    async refreshToken(token){
        const _id = this.cookies.getCookie('id');
        const refresh = {
            _id,
            token
        }
        const data = await fetch("https://doglove-api.herokuapp.com/user/refresh-token",
        {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(refresh)

        }).then(async response =>{
            const object={
                status: response.status,
                data: await response.json()
            }
            return object
        
        });
        console.log(data.status)
        if(data.status === 400){
            this.cookies.eraseCookie('id');
            this.cookies.eraseCookie('token')
            window.location.replace(`../../html/login_screen/login_index.html`)
        }else if(data.status ===200){
            this.cookies.setCookie('id',_id,1);
            this.cookies.setCookie('token', data.data.token,1)
        }

    }

}

new ValidateToken()