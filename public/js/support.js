$(document).ready(function() {
    var loginForm = document.querySelector("#login-form");
    var submitBttn = document.querySelector("#login-submit-bttn");
    if (submitBttn) {
        submitBttn.addEventListener('click', function(event) {
            // e.preventDefault();
            var loginAlert = document.querySelector("#login-alert");
            var username = document.querySelector("#inputUsername");
            var password = document.querySelector("#inputPassword");

            var siteName = document.querySelector("#site-name");
            if (!(username == "" || password == "")) {

                showMessageDialog("Please  provide  user details");
            }
            loginAlert.classList.remove("alert-info");
            loginForm.method = "post";
            loginForm.name = "login_form";
            loginForm.action = "http://localhost:9009/login";
            if (loginForm.checkValidity() === false) {
                loginAlert.classList.add("alert-danger");
            } else {
                loginForm.classList.add('was-validated');

                loginAlert.classList.remove("alert-danger");
                loginAlert.classList.remove("alert-info");
                loginAlert.classList.add("alert-warning");
                loginAlert.innerHTML = "Verifying access... Please wait...  ";
                setLoadingDialog();

                ajaxFormSubmit(loginForm, 'dashboard', function(data) {
                    alert('submitted');
                    showMessageDialog(data);
                    console.log(data);
                    if (data.indexOf("Log on Successful") > -1) {

                        loginAlert.classList.remove("alert-warning");
                        loginAlert.classList.add("alert-success");
                        loginAlert.innerHTML = "Access granted. redirecting...";
                        $('#myModal').modal('hide');
                        window.location = "http://localhost:9000/dashboard";

                    } else {

                        loginAlert.classList.remove("alert-warning");
                        loginAlert.classList.add("alert-danger");
                        loginAlert.innerHTML = "Login failed. Please review credentails provided.";
                        $('#myModal').modal('hide');

                    }

                });
            }
        });
        //    alert('target: '+ formTarget);
        /*  $.post(formTarget, JSON.stringify(paramArray))
             .done(function(data) {
                 try {
                     //  data = JSON.parse(data);
                     console.log(data);

                 } catch (e) {
                     alert(e);
                     //  $.fn.showMessageDialog('<div align="center">Statistics Fetch Error</div>', '<div align = "center" color="red">Error generating statistics</div>' + e.stack + '<br /><br />' + data);
                 }

             });

             */

        event.preventDefault();


        /* var dismissBttn = document.createElement("button");
         dismissBttn.id = "login-alert-dismiss";
         dismissBttn.type = "button";
         dismissBttn.class = "close";
         dismissBttn["data-dismiss"] = "alert";
         dismissBttn[" aria-label"] = "Close";
         dismissBttn.innerHTML = '<span aria-hidden="true">&times;</span>';
         loginAlert.appendChild(dismissBttn);
         */

    }


    var loginForm = document.querySelector("#login-form");
    loginForm.addEventListener('load', function(e) {
        var textInputs = document.querySelectorAll('.form-control');

        for (var field in textInputs) {
            alert(field.name);
            console.dir(field.classList);
            if (field.classList.indexOf('form-input') > -1) {
                alert(field.name);
                field.style.height = 'calc(3.0rem + 2px)';

            }

        }

    });
});