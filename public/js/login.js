$("#login-form").on("submit", function (event) {
  // Make sure to preventDefault on a submit event.
  event.preventDefault();

  //create the object that will be sent to the back end to register the user:
  var userLogin = {
    username: $("#login-username").val().trim(),
    password: $("#login-password").val().trim(),
  };

  $.ajax("api/users/login", {
    type: "POST",
    data: userLogin,
  })
    .done(function (data) {
      window.location.replace("/dashboard");
    })
    .fail((err) => console.log(err));
});
