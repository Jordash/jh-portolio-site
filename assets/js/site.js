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

//Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);
//TODO: Register Flip Plugin if used

(function($) {
    $(document).ready(function(){
        //Load Project CPTs in Modal with AJAX
        const trigger = $('.work-grid-image a');
        trigger.on('click', function(event) {
            event.preventDefault();
            let path = $(this).attr('href');
            console.log('path:', path);
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
        //Begin Home Screen Staggered Drops
        const t1 = gsap.timeline();
        t1.from("#home-screens figure", { scale: 0, y: "-100vh", stagger: { amount: 0.5, from: "random" }, duration: .7 });

        //Begin GSAP House Spins       
        const t2 = gsap.timeline({
            repeat: -1,
            scrollTrigger: {
                trigger: "#website-cost",
                start: "top 50%",
                end: "bottom bottom",
                //markers: true,
                toggleActions: "play none reverse reset" //onEnter, onLeave, onEnterBack, onLeaveBack
            }
        });

        gsap.set(".house", { display: "block" });

        t2.from(".small-house-spin", { x: "50vw", scale: 0.7, opacity: 0, duration: .7, ease: "power1.inOut" });
        t2.to(".small-house-spin", { x: "-50vw", opacity: 0, duration: .7 }, "> 2");

        t2.from(".medium-house-spin", { x: "50vw", scale: 0.7, opacity: 0, duration: .7, ease: "power4.out" }, ">-.5");
        t2.to(".medium-house-spin", { x: "-50vw", opacity: 0, duration: .7 }, "> 2");

        t2.from(".large-house-spin", { x: "50vw", scale: 0.7, opacity: 0, duration: .7, ease: "power4.out" }, ">-.5");
        t2.to(".large-house-spin", { x: "-50vw", opacity: 0, duration: .7 }, "> 1.5");
    });
}(jQuery));