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