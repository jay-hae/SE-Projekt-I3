$(document).on('DOMContentLoaded', () => {
    $('.btn-logout').on('click', () =>{
        const base = window.location.origin;
        location.href = base + "/logout";
    });
});