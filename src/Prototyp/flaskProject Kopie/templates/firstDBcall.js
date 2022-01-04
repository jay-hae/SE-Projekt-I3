$(document).ready(function () {
    $('#mod_add_institute').on('click', function (event){
        event.preventDefault();     //dont close modal yet
        $.ajax({
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
    $('#sorting').on('change', function (){     //get val after select
        //sort array a-z / z-a
        alert($('#sorting').val()); //get children from selected and access its ID
    });
    $('#fil_fac').on('change', function (){
        //get the value of selected option
        alert($('#fil_fac').val());
    });
    $.get('/getInstitutes', function (data) {
        $.each(data, function (index) {
            now = data[index];
            $('#addItems').append("<tr id='"+index+"'><td id='name'>" + now['name'] + "</td><td id='cntry'>" + now['agreements'] + "</td><td><a href=\"#ex1\" rel=\"modal:open\"><button class='btn' type='button'>Edit</button></a></tr>");
        });
        $(" .btn").each(function () {
            $(this).click(function(){
                row = $(this).parent();
                parents = row.parent();
                thisID = parents.attr('id');
                nodes = parents.children(); //herausfinden der Elemente welche sich in der Reihe befinden nodes.innerhtml[0] = name; innerhtml[1] == alle Verträge
                /*$.post('', {    //make post request to stored procedure call (get data for modal box)
                    name: nodes.innerHTML[0]
                },
                function (data, status){

                })*/
                $('#leftSide').empty(); //delete child of modal
                $('#leftSide').append("Test for modal reload");
            });
        });
    });
    $.get('/loadCountries', function (data2){
        $.each(data2, function(index2){
            let x = data2[index2];
            //add new option to my dropdown select items
            $('#modal_country').append($('<option>', {
                value: x['id'],
                text: x['country']
            }));
            $('#fc').append($('<option>', {
                value: x['id'],
                text: x['country']
            }));
        });
    });
    $.get('/loadFac', function (data3){
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