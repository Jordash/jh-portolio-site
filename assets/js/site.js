//Reference: https://www.freecodecamp.org/news/how-to-handle-dark-mode-with-css-and-javascript/

//Toggle Dark Mode
const lightIcon = document.getElementById("icon-light");
const darkIcon = document.getElementById("icon-dark");

const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
let darkMode = darkModeMediaQuery.matches;

//Set dark-mode class on body if darkMode is true and swap icon
if(darkMode) {
  document.body.classList.add("dark-mode");
  darkIcon.setAttribute("display", "none");
}
else {
    lightIcon.setAttribute("display", "none");
}

//Implement Darkmode Toggle Function
function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle("dark-mode");
    if (darkMode) {
        lightIcon.setAttribute("display", "block");
        darkIcon.setAttribute("display", "none");
    } 
    else {
        lightIcon.setAttribute("display", "none");
        darkIcon.setAttribute("display", "block");
    }
}


(function($) {
    $(document).ready(function(){
        //Load Project CPTs in Modal with AJAX
        const trigger = $('.work-grid-image a');
        trigger.on('click', function(event) {
            event.preventDefault();
            let path = $(this).attr('href');
            $.ajax({
                type: 'POST',
                url: `${window.location}wp-admin/admin-ajax.php`,
                dataType: 'html',
                data: {
                    action: 'get_projects', //this action is sent to functions.php
                    ajax_data: path
                },
                success: function (res) {
                    $("#outer-modal").fadeIn("fast");
                    $("#inner-modal").fadeIn("fast").append(res);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('An error has occured with your AJAX request: ', textStatus);
                }
            });
            $(".modal-close").on("click", function () {
                $("#outer-modal").fadeOut("fast");
                $("#inner-modal").fadeOut("fast").empty();
            });
            $(document).on("keydown", function (e) {
                if (e.key == "Escape") {
                  $("#outer-modal").fadeOut("fast");
                  $("#inner-modal").fadeOut("fast").empty();
                }
            });
        });
    });
}(jQuery));