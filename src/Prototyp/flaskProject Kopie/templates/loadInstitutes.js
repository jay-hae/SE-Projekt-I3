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
            $('#addItems').append("<tr><td style=\"display:none;\">" + now['id'] + "</td><td class='tbl_column_huge'>" + now['name'] + "</td><td class='tbl_column_small'>" + x + "</td><td class='tbl_column_small'>" + now['agreements'] + "</td><td class='tbl_column_small'><a href=\"#ex1\" rel=\"modal:open\"><button class='btn' type='button'>Edit</button></a></tr>");
        }
        else {
            $('#addItems').prepend("<tr><td style=\"display:none;\">" + now['id'] + "</td><td class='tbl_column_huge'>" + now['name'] + "</td><td class='tbl_column_small'>" + x + "</td><td class='tbl_column_small'>" + now['agreements'] + "</td><td class='tbl_column_small'><a href=\"#ex1\" rel=\"modal:open\"><button class='btn' type='button'>Edit</button></a></tr>");
        }
    })
    add_button_event();
}

function add_button_event(){
    $(" .btn").on('click', function () {   //event triggerd on 'click'
        let link = $(this).parent();
        let td = link.parent();
        let parent = td.parent();
        let child = parent.children();//liefert alle Elemente dieser Tabellenzeile zurück; nodes.innerhtml[0] = name; innerhtml[1] == alle Verträge
        let node = child[0];
        let inst_id = node.innerHTML;  //get name from institute in this row
        loadModal(inst_id);
    });
}
