// do everything below as soon as document is ready (document loaded)
$(document).on('DOMContentLoaded', function () {
    //file modal_add_form_validation.js
    validateForm();
    //file modal_functionality_general
    modal_button_events();
    //load institutes
    loadAll();
    //add events to modal; submit form & add button events
    // in file "modal_functionality_general.js"
    modal_events();
    //main page; declare change events
    // trigger events after select filter
    // in file "filter_functionality.js"
    addFilterChangeEvents();
    // load countries, faculties and partnerships and add to filter
    setupFilter();
}
);

function loadAll() {
    $.get('/get/institutes', function (data) {
        // load institutes from database
        insertData(data);
    });
}