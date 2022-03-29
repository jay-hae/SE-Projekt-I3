function add_button_event(){
    $(" .my_btn").on('click', function () {   //event triggerd on 'click'
        let entry = $(this).parent(); //get <th> where button is located in
        let my_row = entry.parent(); //get <tr> --> row
        let col = my_row[0].children; //extract <th> where id is inside
        let id = col[0].innerHTML; // get ID of institute
        //in file "modal_edit_functionality.js"
        loadAgreements(id);
        loadModal(id);
    });
}

