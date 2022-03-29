function insertData(data) {
    $('#addItems').empty();
    let order_clause = data[1];
    let sort = order_clause['sorting'];
    let my_data = data[0];
    $.each(my_data, function (index){
        let now = my_data[index];
        //check if Institute is displayed on extern website
        let x = now['display'];
        if (x === 0){
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