$(document).ready(function(){
    var elem = document.querySelector('.collapsible.expandable');
    var instance = M.Collapsible.init(elem, {
    accordion: false
    });


$(".newCommentBtn").click((event) => handleComment(event));
$(".edit-blog").click((event) => handleEditBlog(event));
$(".done-blog").click((event) => handleDoneBlog(event));
$(".delete-blog").click((event) => handleDeleteBlog(event));



// $("#newCommentBtn").on("click", function (event) {


function handleComment (event) {
    var id = event.currentTarget.id;
  //create the object that will be sent to the back end to register the user:
  var newcomment = {
  comment: $("#newcomment").val().trim(),
  post_id:id
  };
  console.log(newcomment)

  axios
  .post("/api/blogpost/comment/add", newcomment)
  .then((res) => {
      console.log(res)
    window.location.replace("/post/"+id);
  })
  .catch((err) => console.log(err));


};

function handleEditBlog (event) {
    var id = event.currentTarget.id;

    var data = {
        id:id,
        edit:false
    }

    axios
    .post("/api/blogpost/blogedit", data)
    .then((res) => {
        console.log(res)
      window.location.replace("/post/"+id);
    })
    .catch((err) => console.log(err));
}

function handleDoneBlog (event) {

    var id = event.currentTarget.id;
    var data = {
        id:id,
        edit:true,
        title: $("#blog-title").val().trim(),
        body: $("#blog-content").val().trim(),
      };



    console.log(data)

    axios
    .post("/api/blogpost/blogedit", data)
    .then((res) => {
        console.log(res)
      window.location.replace("/post/"+id);
    })
    .catch((err) => console.log(err));
}

function handleDeleteBlog (event) {
    console.log("Delete is working")
    var id = event.currentTarget.id;
    console.log("The id is " +id)
    console.log(id);
    //DELETE USER
    axios
      .delete("/api/blogpost/delete/" + id)
      .then((res) => {
        window.location.replace("/dashboard");
      })
      .catch((err) => console.log(err));
}



});