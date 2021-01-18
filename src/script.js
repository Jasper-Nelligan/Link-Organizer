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