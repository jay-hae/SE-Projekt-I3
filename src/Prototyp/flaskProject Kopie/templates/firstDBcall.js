// do everything below as soon as document is ready (document loaded)
$(document).ready(function () {
    $('#mod_add_institute').on('click', function (event){
        event.preventDefault(); // don't do event that is attached to click
        $.ajax({
            // get data from modal that was inserted and perform a post request to add new institute
            data: {
                country: $('#modal_country').val(),
                eng: $('#modal_eng').val(),
                loc: $('#modal_local').val(),
                adr: $('#modal_adr').val(),
                website: $('#modal_ws').val(),
                note: $('#modal_ntzn').val(),
                show: $('#modal_anz').val(),
                erasmus: $('#modal_ec').val(),
            },
            type: 'POST',
            url: '/addInstitute'
        })
            .done(function (data){
                //if data inserted into table, close modal box
                event.submit(); //do event(close modal; default event declared in universities.html
            });
    });
    //main page; declare change events
    // trigger events after select filter
    $('#sorting').on('change', function (){     //get val after select
        //sort array a-z / z-a
        alert($('#sorting').val()); // get value of selected element
    });
    $('#fil_fac').on('change', function (){
        // filter faculties
        alert($('#fil_fac').val()); //get the value of selected option
    });

    $.get('/getInstitutes', function (data) {
        // load institutes from database
        $.each(data, function (index) {
            // callback function; do something for every data that is returned from get call
            now = data[index]; // get data from json file at position [index]
            //add new table row to main page
            $('#addItems').append("<tr id='"+index+"'><td id='name'>" + now['name'] + "</td><td id='cntry'>" + now['agreements'] + "</td><td><a href=\"#ex1\" rel=\"modal:open\"><button class='btn' type='button'>Edit</button></a></tr>");
        });
        $(" .btn").each(function () {   //add function to dynamically created buttons (shown institutes)
            $(this).click(function(){   //event triggerd on 'click'
                row = $(this).parent();
                parents = row.parent();
                thisID = parents.attr('id');
                nodes = parents.children(); //liefert alle Elemente dieser Tabellenzeile zurück; nodes.innerhtml[0] = name; innerhtml[1] == alle Verträge
                /*$.post('', {    //make post request to stored procedure call (get data for modal box)
                    name: nodes.innerHTML[0]
                },
                function (data, status){

                })*/
                //nur Testzweck; keine wirkliche Funktion
                $('#leftSide').empty(); //delete child of modal
                $('#leftSide').append("Test for modal reload");
            });
        });
    });
    // load countries and add to select option
    $.get('/loadCountries', function (data2){
        $.each(data2, function(index2){
            let x = data2[index2];
            //add new option to my dropdown select items
            //country ID = value
            //country eng = name (text)
            $('#modal_country').append($('<option>', {
                //add to selected in modal (modal to add new institute)
                value: x['id'],
                text: x['country']
            }));
            $('#fc').append($('<option>', {
                //add to selected on main page(filter)
                value: x['id'],
                text: x['country']
            }));
        });
    });
    $.get('/loadFac', function (data3){
        //add to filter on main page
        $.each(data3, function (index3){
            let faculty = data3[index3];
            $('#fil_fac').append($('<option>', {
                value: faculty['id'],
                text: faculty['fac']
            })); //Name of option = faculty['fac'] == Name; value = faculty['id'] == Fac_ID
        });
    });
});


//<button type="button">Click Me!</button>
//<button className='change' type='button'>change</button>