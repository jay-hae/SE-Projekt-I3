function insertMentor() {
    $('#new_mentor').on('click', () => {
    $.ajax({
        method: 'POST',
        url: '/addMentor',
        data: $('#add_mentor_form').serialize()
    })
        .done((data) => {
            console.log(data);
        });

    });
}