"use strict"

/* Sets the onclick events for the buttons initially loaded on the page */
function set_buttons() {
    let btn  = document.getElementById("new-course-btn");
    btn.addEventListener("click",
        function () {
            let modal = btn.getAttribute('data-modal');
            document.getElementById(modal)
                .style.display = "block";
        }
    );
}

/* Functionality for popup edit form */
let modalBtns = [...document.querySelectorAll(".edit-btn")];
modalBtns.forEach(function (btn) {
    btn.onclick = function () {
        let modal = btn.getAttribute('data-modal');
        document.getElementById(modal)
            .style.display = "block";
    }
});
let closeBtns = [...document.querySelectorAll(".close")];
closeBtns.forEach(function (btn) {
    btn.onclick = function () {
        let modal = btn.closest('.modal');
        modal.style.display = "none";
    }
});
window.onclick = function (event) {
    if (event.target.className === "modal") {
        event.target.style.display = "none";
    }
}