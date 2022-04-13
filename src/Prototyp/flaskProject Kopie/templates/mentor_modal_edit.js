function editButton() {
    $(" .modal_edit_mentor").on('click', function() {
       //load stored information out of sessionStorage into edit modal
       //get id
       let column = $(this).parent(); //Spalte <th> in der, der Button liegt
       let row = column.parent(); //ganze Zeile
       console.log(row.attr('id'));
       let obj = JSON.parse(sessionStorage.getItem(row.attr('id'))); //richtiges Item aus Clientspeicher holen und in Javascript Objekt parsen
       console.log(obj.active);
       $('#edit_mentor_title').val(obj.title);
       $('#edit_mentor_firstname').innerText = obj.firstname;
       $('#edit_mentor_lastname').innerText = obj.lastname;
       $('#edit_mentor_homepage').innerText = obj.homepage;
       $('#edit_mentor_email').innerText = obj.email;
       $('#edit_mentor_gender').innerText = obj.gender_ID;
       $('#modal_edit_mentor').toggle();
    });
}