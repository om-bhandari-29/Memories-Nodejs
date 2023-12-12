const uploadImage = async(formData) =>{

    try{
        const res = await fetch('http://127.0.0.1:5000/upload', {
            method: 'POST',
            body: formData
        }).then((res)=> res.json())

        if(res.status === 'success'){
            alert("success")
            // location.assign('/');
            location.reload(true);
        }
        else{
            alert("Something went wrong");
        }
    }
    catch(err){
        // console.log(err);
        console.log("Error Occured : "+err);
    }
}

document.getElementById('uploadImageBtn').addEventListener('click', e => {
    e.preventDefault();
    const image = document.getElementById('image').files[0];
    const imageName = document.getElementById('imageName').value;
    const imageDescription = document.getElementById('imageDescription').value;

    if(!image || !imageName || !imageDescription){
        console.log("Please Enter full data");
    }
    else{
        console.log("Inside else block");

        let formData = new FormData();
        formData.append('image', image);
        formData.append('imageName', imageName);
        formData.append('imageDescription', imageDescription);

        uploadImage(formData);
    }
})