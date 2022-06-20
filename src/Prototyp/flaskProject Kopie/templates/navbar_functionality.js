$(document).on('DOMContentLoaded', () => {
    $('.btn-logout').on('click', () =>{
        $.ajax('/logout', {type: 'GET'});
    });
});