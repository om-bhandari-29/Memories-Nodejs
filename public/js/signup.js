const signup = async(name, email, password) =>{
    try{
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        }).then((res)=> res.json())

        if(res.status === 'UAE'){
            alert("USER ALREADY EXIST")
            location.assign('/signup')
        }
        else
        if(res.status === 'UDN'){
            alert("user does not exits with given mail id");
            location.assign('/signup')
        }
        if(res.status === 'success'){
            alert("Signed Up successfully");
            location.assign('/')
        }
    }
    catch(err){
        console.log(err);
    }
}

document.getElementById('signupbtn').addEventListener('click', e => {
    e.preventDefault();
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirmpassword').value;

    if(!fname || !lname || !email || !password || !confirmpassword){
        alert("Enter full Details");
        location.assign('/signup');
    }

    if(password != confirmpassword){
        alert("Password Doesn't match");
        location.assign('/signup');
    }
    else{
        const name = fname +" "+lname;
        signup(name, email, password);
    }
})