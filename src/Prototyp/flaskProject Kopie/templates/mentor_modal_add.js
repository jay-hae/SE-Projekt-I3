function insertMentor() {
    $('#new_mentor').on('click', () => {
    $.ajax({
        method: 'POST',
        url: '/addMentor',
        data: $('#mentor_add_form').serialize()
    })
        .done((data) => {
            console.log(data);
        });

    });
}