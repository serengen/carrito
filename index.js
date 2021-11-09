function fn1(){
    var str = document.getElementById("imp_usname").value
    var str2 = document.getElementById("imp_password").value

    const myForm = document.getElementById('myForm');
    const uri = "https://carrito-jwt.herokuapp.com/api/user/users/login"

    myForm.addEventListener('submit', function(e){
     e.preventDefault();

        fetch(uri,{
            method: 'POST',
            window: 0,
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({
            "nickname": str,
            "password": str2
        })

        }).then(res => res.json()).then(data => {
            var token2 = data.refreshToken
            localStorage.setItem('token2', token2);
            
            if(data.status === "Autenticado!" && token2){
                    fetch("https://carrito-jwt.herokuapp.com/api/user/admin",{
                        method: 'GET',
                        window: 0,
                        headers: {
                            'Authorization':token2 
                        }
                    }).then(res => res.json()).then(data => {
                        console.log(data)
                        window.location.replace("principal.html")
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
    })

}