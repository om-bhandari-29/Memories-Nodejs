//logging out
const logout = async() =>{
    try{
        const res = await fetch('/api/auth/logout').then((res) => {
            return res.json();
        });

        if(res.status === 'success'){
            alert("Logged Out Successfully");
            location.reload(true);
        }
    }
    catch(err){
        console.log(err);
    }
}



document.getElementById('logOutBtn').addEventListener('click',logout);