// do everything below as soon as document is ready (document loaded)
$(document).on('DOMContentLoaded', function () {
    //file institute_modal_add.js
    validateForm();
    //file institute_buttons
    modalButtonEvents();
    // load institutes
    loadAll();
    // add events to modal; submit form & add button events
    // in file "institute_buttons.js"
    modalEvents();
    //main page; declare change events
    // trigger events after select filter
    // in file "filter_functionality.js"
    addFilterChangeEvents();
    // load countries, faculties and partnerships and add to filter
    setupFilter();
    clearSessionStorage();
    functionalityAgreementFilter();
    loadCourse();
});

// ######### INSTITUTES LOADER #######
function loadAll() {
    $.get('/get/institutes', function (data) {
        // load institutes from database
        insertData(data);
    });
}

function loadCourse() {
    $.get('/loader/course', data => {
        const courses = [];
        const myTbl = $('#addCourses');
        data.forEach(entity => {
           console.log(entity);
           myTbl.append("<tr><th>" + entity['de'] + "</th><th>" + entity['eng'] + "</th></tr>");
           courses.push(entity);
        });
        sessionStorage.setItem('courses', JSON.stringify(courses));
    })
        .then(() => {
            loadCourseDropdown();
        });
}

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
            $('#addItems').append("<tr><th style=\"display:none;\">" + now['id'] + "</th><th >" + now['name'] + "</th><th >" + x + "</th><th >" + now['agreements'] + "</th><th ><button type=\"button\" class=\"btn edit_inst_btn btn-sm\" >Bearbeiten</button></th></tr>");
        }
        else {
            $('#addItems').prepend("<tr><th style=\"display:none;\">" + now['id'] + "</th><th class='tbl_column_huge'>" + now['name'] + "</th><th class='tbl_column_small'>" + x + "</th><th class='tbl_column_small'>" + now['agreements'] + "</th><th class='tbl_column_small' ><button type=\"button\" class=\"btn edit_inst_btn\" >Bearbeiten</button></th></tr>");
        }
    });
    addButtonEvent();
}