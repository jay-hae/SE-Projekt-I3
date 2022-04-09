function editButton() {
    $(' .modal_edit_mentor').each((index, button) => {
       $(button).on('click', () => {
           //load stored information out of sessionStorage into edit modal
           //get id
           let column = $(button).parent(); //Spalte <th> in der, der Button liegt
           let row = column.parent(); //ganze Zeile
           let obj = JSON.parse(sessionStorage.getItem(row.attr('id'))); //richtiges Item aus Clientspeicher holen und in Javascript Objekt parsen
           $('#edit_mentor_title').val(obj.faculty_ID);
           $('#edit_mentor_firstname').val(obj.firstname);
           $('#edit_mentor_lastname').val(obj.lastname);
           $('#edit_mentor_homepage').val(obj.homepage);
           $('#edit_mentor_email').val(obj.email);
           $('#edit_mentor_gender').val(obj.gender_ID);
           //$('#edit_mentor_gender').value = obj.gender_ID;
           $('#modal_edit_mentor').toggle();
       });
    });
}

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