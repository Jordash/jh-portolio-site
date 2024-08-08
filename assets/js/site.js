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
gsap.registerPlugin(Flip);

(function($) {
    $(document).ready(function(){
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

        //Load Project CPTs in Modal with AJAX
        const trigger = $('.work-grid-image a');
        const loader = '<figure style="width: 100%; height: 90vh; display: flex; flex-wrap:wrap; align-items: center; justify-content: center; align-content:center"><div style="text-align:center; width: 100%;"><h4>LOADING PROJECT...</h4></div><!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL --><div><svg width="144" height="144" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#9FC417"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /><animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" /><animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" /></circle></g></svg></div></figure>';
        trigger.on('click', function(event) {
            event.preventDefault();
            let path = $(this).attr('href');
            console.log('path:', path);
            $('.modal-close').hide();
            $("body").addClass("no-scroll");
            $("#outer-modal").fadeIn("fast");
            $("#inner-modal").fadeIn("fast");
            $("#inner-modal").append(loader);
            //Remove scroll behavior from document while modal active
            $.ajax({
                type: 'POST',
                url: `${window.location}wp-admin/admin-ajax.php`,
                dataType: 'html',
                data: {
                    action: 'get_projects', //this action is sent to functions.php
                    ajax_data: path
                },
                success: function (res) {
                    $("#inner-modal").html(res);
                    $('.modal-close').show();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('An error has occured with your AJAX request: ', textStatus);
                }
            });
            $(".modal-close").on("click", function (event) {
                event.preventDefault();
                $("#outer-modal").fadeOut("fast");
                $("#inner-modal").fadeOut("fast").empty();
                $("body").removeClass("no-scroll");
            });
            $(document).on("keydown", function (e) {
                if (e.key == "Escape") {
                  $("#outer-modal").fadeOut("fast");
                  $("#inner-modal").fadeOut("fast").empty();
                  $("body").removeClass("no-scroll");
                }
            });
        });

        // Load Next/Previous Project into Modal
        $('#outer-modal').on('click', '.project-footer a', function(event){
            event.preventDefault();
            let current_id = $(this).attr('id');
            let link_class = $(this).attr('class');
            $('.modal-close').hide();
            //console.log('ID: ', current_id);
            let data_array = [current_id, link_class];
            $("#inner-modal").empty();
            $("#inner-modal").append(loader);
            $.ajax({
                type: 'POST',
                url: `${window.location}wp-admin/admin-ajax.php`,
                dataType: 'html',
                data: {
                    action: 'load_adjacent_project', //this action is sent to functions.php
                    ajax_data: data_array
                },
                success: function (res) {
                    $("#outer-modal").fadeIn("fast");
                    $("#inner-modal").fadeIn("fast").html(res);
                    $('.modal-close').show();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('An error has occured with your AJAX request: ', textStatus);
                }
            });
        });

        //Begin Work Grid Sorting
        $('#filter-buttons a').on('click', function(e){
            e.preventDefault();
            const sortby = $(this).attr('href').slice(1);
            runFilter(sortby);
        });
        function runFilter(sort) {
            const thumbs = $(".work-grid-image");
            if (sort === 'all') {
                thumbs.fadeTo("fast",1).removeClass('thumb-highlight');
                $('#filter-buttons a').removeClass('clicked');
                $('.' + sort + ' a').addClass('clicked');
            }
            else if (sort === 't-shirts') {
                thumbs.fadeTo("slow",0.1).removeClass('thumb-highlight');
                $("#work-grid .t-shirts").fadeTo("fast",1).addClass('thumb-highlight');
                $('#filter-buttons a').removeClass('clicked');
                $('.' + sort + ' a').addClass('clicked');
            }
            else if (sort === 'emails') {
                thumbs.fadeTo("slow",0.1).removeClass('thumb-highlight');
                $("#work-grid .emails").fadeTo("fast",1).addClass('thumb-highlight');
                $('#filter-buttons a').removeClass('clicked');
                $('.' + sort + ' a').addClass('clicked');
            }
            else if (sort === 'logos') {
                thumbs.fadeTo("slow",0.1).removeClass('thumb-highlight');
                $("#work-grid .logos").fadeTo("fast",1).addClass('thumb-highlight');
                $('#filter-buttons a').removeClass('clicked');
                $('.' + sort + ' a').addClass('clicked');
            }
            else if (sort === 'websites') {
                thumbs.fadeTo("slow",0.1).removeClass('thumb-highlight');
                $("#work-grid .websites").fadeTo("fast",1).addClass('thumb-highlight');
                $('#filter-buttons a').removeClass('clicked');
                $('.' + sort + ' a').addClass('clicked');
            }
        }
    });
}(jQuery));