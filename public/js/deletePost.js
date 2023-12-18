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
        const postid = e.target.dataset.postid;
        // const postid = e.target.dataset.postId;

        //in postDetails.pug, in button post Id is stored in variable called as 'data-post-id', where 'data' is acting like a keyword and it is necessary to use it, and 'post-id' here will be treated as postId,means '-'(dash) will be converted to camel case, or instead of this we can use single word after data but without any capital letters example, 'data-post-id' will be 'postId' and 'data-postid' will be 'postid'
        console.log(postid);
        deletePost(postid);
    })
}