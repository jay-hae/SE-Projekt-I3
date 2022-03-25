function loadStartpage(){
    $.get('/getInstitutes', function (data) {
        // load institutes from database
        insertData(data);
    });
}

function insertData(data) {
    $('#addItems').empty();
    let order_clause = data[1];
    sort = order_clause['sorting'];
    let my_data = data[0];
    $.each(my_data, function (index){
        now = my_data[index];
        //check if Institute is displayed on extern website
        let x = now['display'];
        if (x == 0){
            x = 'Nein'
        }
        else {
            x = 'Ja'
        }
        if (sort === "a") {
            $('#addItems').append("<tr><th style=\"display:none;\">" + now['id'] + "</th><th >" + now['name'] + "</th><th >" + x + "</th><th >" + now['agreements'] + "</th><th ><button type=\"button\" class=\"btn my_btn\" >Bearbeiten</button></th></tr>");
        }
        else {
                $('#addItems').prepend("<tr><th style=\"display:none;\">" + now['id'] + "</th><th class='tbl_column_huge'>" + now['name'] + "</th><th class='tbl_column_small'>" + x + "</th><th class='tbl_column_small'>" + now['agreements'] + "</th><th class='tbl_column_small' ><button type=\"button\" class=\"btn my_btn\" >Bearbeiten</button></th></tr>");
        }
    });
    add_button_event();
}

function add_button_event(){
    $(" .my_btn").on('click', function () {   //event triggerd on 'click'
        let entry = $(this).parent(); //get <th> where button is located in
        let my_row = entry.parent(); //get <tr> --> row
        let col = my_row[0].children; //extract <th> where id is inside
        let id = col[0].innerHTML; // get ID of institute
        //in file "Modal_edit.js"
        loadAgreements(id);
        loadModal(id);
    });
}
