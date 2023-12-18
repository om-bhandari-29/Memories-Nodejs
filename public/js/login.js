const login = async(email, password) =>{

    try{
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then((res)=> res.json())

        if(res.status === 'success'){
            alert("success")
            location.assign('/');
        }
        else
        if(res.status === 'UDN'){
            alert("user does not exits with given mail id");
            location.assign('/login')
        }
        else{
            alert("Password Is Incorrect");
            location.assign('/login')
        }
    }
    catch(err){
        console.log(err);
    }
}

const loginClick = document.getElementById('loginbtn');
if(loginClick)
{
    loginClick.addEventListener('click', e=>{
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
    
        if(email == "" || password == ""){
            alert("Enter Your Credentials");
        }
        else{
            // console.log(email, password);
            login(email, password);
        }
    })
}




