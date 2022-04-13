function setupFilter() {
    $.get('/get/countries', function (data2) {
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
    $.get('/get/faculties', function (data3) {
        //add to filter on main page
        const arr = Array.from(data3)
        console.log(arr);
        $.each(data3, function (index3) {
            let faculty = data3[index3];
            $('#fil_fac').append($('<option>', {
                value: faculty['id'],
                text: faculty['fac']
            })); //Name of option = faculty['fac'] == Name; value = faculty['id'] == Fac_ID
        });
    });
    $.get('/get/agreements', function (data3) {
        //add to filter on main page
        $.each(data3, function (index3) {
            let agreement = data3[index3];
            $(' .fil_agree').append($('<option>', {
                value: agreement['ID'],
                text: agreement['ps_type']
            })); //Name of option = faculty['fac'] == Name; value = faculty['id'] == Fac_ID
        });
    });
}