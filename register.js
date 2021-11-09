function fn1(){
    var str = document.getElementById("imp_usname").value
    var str1 = document.getElementById("imp_email").value
    var str2 = document.getElementById("imp_password").value

    const myForm = document.getElementById('myForm');
const uri = "https://carrito-jwt.herokuapp.com/api/user/register"

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
            "email": str1,
            "password": str2
        })

        }).then(res => res.json()).then(data => 
            {
                var token = data[0].accessToken
                localStorage.setItem('token', token);
                window.location.replace("index.html")
            })
        .catch(err => console.log(err))
    })

}