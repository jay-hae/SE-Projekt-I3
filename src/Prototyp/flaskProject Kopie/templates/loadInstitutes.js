function loadStartpage(){
    $.get('/getInstitutes', function (data) {
        // load institutes from database
        $.each(data, function (index) {
            // callback function; do something for every data that is returned from get call
            now = data[index]; // get data from json file at position [index]
            //add new table row to main page
            $('#addItems').append("<tr id='" + index + "'><td style=\"display:none;\">"+now['id']+"<td id='name'>" + now['name'] + "</td><td id='cntry'>" + now['agreements'] + "</td><td><a href=\"#ex1\" rel=\"modal:open\"><button class='btn' type='button'>Edit</button></a></tr>");
        });
        $(" .btn").each(function () {   //add function to dynamically created buttons (shown institutes)
            $(this).click(function () {   //event triggerd on 'click'
                let link = $(this).parent();
                let td = link.parent();
                let parent = td.parent();
                let child = parent.children();//liefert alle Elemente dieser Tabellenzeile zurück; nodes.innerhtml[0] = name; innerhtml[1] == alle Verträge
                alert(child.length);
                let node = child[0];
                let eng_name = node.innerHTML;  //get name from institute in this row
                loadModal(eng_name);

                /*$.post('', {    //make post request to stored procedure call (get data for modal box)
                    name: nodes.innerHTML[0]
                },
                function (data, status){

                })*/
            });
        });
    });
}