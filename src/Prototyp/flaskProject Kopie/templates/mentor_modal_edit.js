function editButton() {
    $(" .modal_edit_mentor").on('click', function() {
       //load stored information out of sessionStorage into edit modal
       //get id
       let column = $(this).parent(); //Spalte <th> in der, der Button liegt
       let row = column.parent(); //ganze Zeile
       console.log(row.attr('id'));
       let obj = JSON.parse(sessionStorage.getItem(row.attr('id')));
       //richtiges Item aus Clientspeicher holen und in Javascript Objekt parsen
       //  console.log(obj);
       // console.log(obj.active);
       // $('#edit_mentor_title').val(obj.title);
       // $('#edit_mentor_firstname').val(obj.firstname)
       // $('#edit_mentor_lastname').val(obj.lastname);
       // $('#edit_mentor_homepage').val(obj.homepage);
       // $('#edit_mentor_email').val(obj.email);
       // $('#edit_mentor_gender').val(obj.gender_ID);
       // $('#edit_mentor_active').prop('checked', setCheckbox(obj.active));
       // $('#edit_men_fac').val(obj.faculty_ID);
       $('#modal_edit_mentor').toggle();
    });
}

function setCheckbox(value) {
   return value === "Nein";
}

