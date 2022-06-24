// do everything below as soon as document is ready (document loaded)
$(document).on('DOMContentLoaded', startUp);

/**
 * Die Funktion wird aufgerufen sobald institutes.html vollstädnig geladen wurde
 * Dieser Funktion bildet den Startpunkt der Anwendung.
 * Es werden die Filter bereitgesteltt und die Tabelle mit den Informationen zu den Hochschulen aus der Datenbank geladen
 */
function startUp() {
    //file institute_modal_add.js
    validateForm();
    //file institute_buttons
    instituteButtonEvents();
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
    setMandatoryInput();
}
/**
 * Wenn die Seite institute.html vollständig geladen wurde, wird ein GET-Request an app.py gesendet, um
 * Hochschuledaten aus der Datenbank abzufragen. 
 * Wenn der Nutzer auf den 'Zurücksetzen'-Button gedrückt hat, dann wird der Filter aufgehoben 
 * und wieder alle Hochschulen in die Tabelle geladen.
 * Funktion sendet dazu über app.py eine Abfrage an die Datenbank.
 */
function loadAll() {
    $.get('/get/institutes', function (data) {
        // load institutes from database
        sessionStorage.setItem('admin', JSON.stringify(data[2]['admin']));
        insertInstitutes(data);
    })
        .then(checkAdmin());
}


/** Funktion wird durch addFilterChangeEvents() und loadAll() aufgerufen
 * Wenn der GET-Request die Hochschulen-Informationen aus der Datenbank geladen hat, wird per HTML eine Tabelle mit den Inhalten erzeugt.
 * Dabei wird zwischen einem normalen Nutzer und einem Admin mit Löschrechten unterschieden
 * Handelt es sich beim Nutzer um den Admin werden in der Tabelle außerdem für jede Hochschule ein Lösch-Button sichtbar.
 */
function insertInstitutes(data) {
    let style = 'none;';
    if (checkAdmin()) {
        style = 'block;';
    }
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
            $('#addItems').append("<tr><th style=\"display:none;\">" + now['id'] + "</th><th >" + now['name'] + "</th><th >" + x + "</th><th >" + now['agreements'] + "</th><th ><button type=\"button\" class=\"btn btn-sm btn-light edit_inst_btn\" >Bearbeiten</button></th><th><button class='btn btn-sm btn-light del-institute btn-delete' style='display: " + style + "'>Del</button></th></tr>");
        }
        else {
            $('#addItems').prepend("<tr><th style=\"display:none;\">" + now['id'] + "</th><th class='tbl_column_huge'>" + now['name'] + "</th><th class='tbl_column_small'>" + x + "</th><th class='tbl_column_small'>" + now['agreements'] + "</th><th class='tbl_column_small' ><button type=\"button\" class=\"btn btn-sm btn-light edit_inst_btn\" >Bearbeiten</button></th><th><button class='btn btn-sm btn-light del-institute btn-delete' style='display: " + style + "'>Del</button></th></tr>");
        }
    });
    addButtonEvent();
}