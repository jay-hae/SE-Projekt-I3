function editMentorButton() {
    $(" .modal_edit_mentor").on('click', function() {
       //load stored information out of sessionStorage into edit modal
       //get id
       let column = $(this).parent(); //Spalte <th> in der, der Button liegt
       let row = column.parent(); //ganze Zeile
       let id = row.attr('id');
       loadMentor(id);
       // let obj = JSON.parse(sessionStorage.getItem(row.attr('id')));
       // richtiges Item aus Clientspeicher holen und in Javascript Objekt parsen
       // console.log(obj);
       $('#modal_edit_mentor').toggle();
    });
}

function setCheckbox(value) {
   return value !== 1;
}

function loadMentor(mentor_id) {
    console.log(mentor_id);
    $.ajax({
        data: {
            id: mentor_id
        },
        type: 'POST',
        url: '/openMentorModal'
    })
    .done(function (data) { //put data into modal
        console.log(data);
        let chosen_mentor = data[0];
        $('#edit_mentor_title').val(chosen_mentor['title']);
        $('#edit_mentor_firstname').val(chosen_mentor['firstname'])
        $('#edit_mentor_lastname').val(chosen_mentor['lastname']);
        $('#edit_mentor_homepage').val(chosen_mentor['website']);
        $('#edit_mentor_email').val(chosen_mentor['mail']);
        $('#edit_mentor_gender').val(chosen_mentor['gender']);
        $('#edit_mentor_active').prop('checked', setCheckbox(chosen_mentor['active']));
        $('#edit_men_fac').val(chosen_mentor['faculty']);
    });
}

function buttonFunctionality() {
   $(' .close-modal').on('click', (e) => {

   });
}

