$(document).ready(function () {
  var elem = document.querySelector(".collapsible.expandable");
  var instance = M.Collapsible.init(elem, {
    accordion: false,
  });
  $(".modal").modal();
  $(".blogPostClick").click((event) => handleBlogClick(event));

  $("#new-blog").on("submit", function (event) {
    event.preventDefault();
    //create the object that will be sent to the back end to register the user:
    var newBlog = {
      title: $("#blog-title").val().trim(),
      body: $("#blog-content").val().trim(),
    };

    axios
      .post("/api/blogpost/add", newBlog)
      .then((res) => {
        console.log(res);
        window.location.replace("/dashboard");
      })
      .catch((err) => console.log(err));
  });

  function handleBlogClick(event) {
    console.log("Click works");
    var id = event.currentTarget.id;
    window.location.replace("/post/" + id);
  }
});
