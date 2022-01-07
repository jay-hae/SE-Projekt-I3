// do everything below as soon as document is ready (document loaded)
$(document).ready(function () {
    //Laden der Daten für Startseite
    loadStartpage();
    //add events to modal; submit form & add button events
    modal_events();
 /*   $('#mod_add_institute').on('click', function (event) {
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
            .done(function (data) {
                //if data inserted into table, close modal box
                event.submit(); //do event(close modal; default event declared in universities.html
            });
    });*/
    //main page; declare change events
    // trigger events after select filter
    addFilterChangeEvents();
    // load countries and add to select option
    $.get('/loadCountries', function (data2) {
        $.each(data2, function (index2) {
            let x = data2[index2];
            //add new option to my dropdown select items
            //country ID = value
            //country eng = name (text)
            $(' .filter_country').append($('<option>', {
                //add to selected in modal (modal to add new institute)
                value: x['id'],
                text: x['country']
            }));
        });
    });
    $.get('/loadFac', function (data3) {
        //add to filter on main page
        $.each(data3, function (index3) {
            let faculty = data3[index3];
            $('#fil_fac').append($('<option>', {
                value: faculty['id'],
                text: faculty['fac']
            })); //Name of option = faculty['fac'] == Name; value = faculty['id'] == Fac_ID
        });
    });
}
);


//<button type="button">Click Me!</button>
//<button className='change' type='button'>change</button>