//logging out
const logout = async() =>{
    try{
        const res = await fetch('/api/auth/logout').then((res) => {
            return res.json();
        });

        if(res.status === 'success'){
            alert("Logged Out Successfully");
            // location.reload(true); //error while logging out from myUploads page
            location.assign('/');
        }
    }
    catch(err){
        console.log("inside logout.js : "+err);
    }
}



document.getElementById('logOutBtn').addEventListener('click',logout);