const deletePost = async (postId) => {

    try{
        const responce = await fetch(`post/${postId}`, {
            method: 'DELETE'
        }).then((res) => res.json());

        if(responce.status === 'success'){
            alert('Post deleted successfully');
            location.assign('/');
        }
    }
    catch(err){
        console.log(err);
        alert('Error accured while deleting post');
    }
}

const deleteClick = document.getElementById('postDeleteButton');
if(deleteClick)
{
    deleteClick.addEventListener('click', e => {
        const postid = e.target.dataset.postId;
        // const postId = e.target.closest(['postId']);
        console.log(postid);
        // deletePost(postId);
    })
}