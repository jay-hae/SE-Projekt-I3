$(document).on('DOMContentLoaded', loadMentor);

/** Wenn die Seite mentor.html vollständig geladen wurde, wird ein GET-Request an app.py gesendet, um
 * Mentorendaten aus der Datenbank abzufragen.
 */
function loadMentor(){
    $.ajax({
        type: 'GET',
        url: '/loader/mentor'
    })
        .done((data) => {
            mentorInsert(data);
            cacheMentors(data);
        });

    trackMentorChange(); 
    mentorButtonFunctionality();
    insertMentor();
    // Laden aller Werte für Dropdowns in der Mentoren übersicht -> gleiche funktionsweise wie das Laden der Filterelemente in der Hochschulübersicht
    $.ajax({
        type: 'GET',
        url: '/get/faculties'
    })
        .done((data) => {
            $.each(data, (index, obj) => {
                $(' .edit_mentor_fac').append($('<option>', {
                    value: obj['id'],
                    text: obj['fac']
                }));
            })
        });

}


/** Funktion wird durch loadMentor() aufgerufen
 * Ihr werden die Mentorendaten aus der Datenbank übergeben
 * Mentorendaten werden lokal auf dem Rechner im Browser zwischengespeichert um einen einfacheren Zugriff zu ermöglichen
 */
function cacheMentors(mentorArray) {    
    const mentArr = [];
    $.each(mentorArray, (index) => {
        let cur = mentorArray[index];
        let obj = {
            faculty_ID: cur['faculty_ID'],
            mentor_ID: cur['ID'],
            active: cur['active'],
            title: cur['title'],
            firstname: cur['firstname'],
            lastname: cur['lastname'],
            gender_ID: cur['gender_ID'],
            homepage: cur['homepage'],
            email: cur['email'],
            agreements: cur['agreements']
        }
        mentArr.push(cur['ID'], obj)
    });
    sessionStorage.setItem('mentor', JSON.stringify(mentArr));
}

/** Funktion wird durch loadMentor() aufgerufen
 * Wenn der GET-Request die Mentoren-Informationen aus der Datenbank geladen hat, 
 * wird per HTML eine Tabelle mit den Inhalten erzeugt.
 */
function mentorInsert(mentors) {
    $('#mnt_body').empty();
    $.each(mentors, function (index){
        let mentor = mentors[index];
        $('#mnt_body').append("<tr id='"+ mentor['ID'] + "'>" +
                                "<th class='lastname_m'>" + mentor['lastname'] + "</th>" +
                                "<th class='firstname_m'>"+ mentor['firstname'] + "</th>" +
                                "<th>" + mentor['active'] + "</th>" +
                                "<th>" + mentor['faculty_ID'] + "</th>" +
                                "<th>" + mentor['agreements'] + "</th>" +
                                "<th><button type='button' class='btn btn-sm btn-light modal_edit_mentor'>Bearbeiten</button></th></tr>");
    });
    editMentorButton();
}

/** Funktion wird aufgerufen sobald Nutzer im Suchfeld der Mentoren einen oder mehrere Zeichen eingegeben hat und
 * die Taste wieder loslässt (onkeyup).
 * Funktion zum Suchen der Mentoren
 * Funktion vergleicht die im Suchfeld eingetragene Zeichenkette mit allen Einträgen der Tabelle Mentoren
 * und filtert dementsprechend
 */
function searchMentor() {
    let element = $('#mnt_body');
    let children = element.children();
    let search_for = $('#tbl_search').val().toLowerCase();
    $.each(children, function (index){
        let row = children[index];
        let cells = row.children;
        let id = row['id'];
        let firstname = cells[1].innerHTML;
        let lastname = cells[0].innerHTML;
        if (!(firstname.toLowerCase().includes(search_for) || lastname.toLowerCase().includes(search_for))) {
            $('#'+id).attr("style", "display: none");
        }
        else {
            $('#'+id).attr("style", "display: ");
        }
    });
}

/*function mentorSelect(mentors, selectID) {
    const selectObj = document.getElementById(selectID);
    $.each(mentors, function(index) {
        const cur = mentors[index];
        selectObj.append($('<option>'), {
            value: cur['ID'],
            text: cur['title'] + " " + cur['firstname'] + " " + cur['lastname']
        });
    });
}*/

/** Funktion wird durch loadMentor() aufgerufen
 *  Für die Buttons auf der Seite Mentoren und im Mentorenmodal werden verschiedene Funktionalitäten bereitgestellt.
 *  add_mentor_btn = Öffnet Modal 'Mentor Hinzufügen'
 *  close_modal_edit_mentor = Schließt das Modal 'Bearbeiten' sowohl für X-Button als auch 'Abbrechen'
 *  close_modal_add_mentor = Schließt das Modal 'Mentor Hinzufügen' sowohl für X-Button als auch 'Abbrechen'
 */
function mentorButtonFunctionality() {

    // HAUPTANSICHT: MENTOR -> MENTOR ANLEGEN BUTTON
    $('#add_mentor_btn').on('click', function (){
        // reset the form / clear input before open the modal
        $('.modal_form_mentor').trigger("reset");
        $('#modal_add_mentor').toggle();
    });

    
   $('.close_modal_edit_mentor').on('click', function (){
        $('#modal_edit_mentor').toggle();
        sessionStorage.removeItem('changedMentor');
    });
   
   //set functionality for all abbrechen/X Buttons
    $('.close_modal_add_mentor').on('click', event => {
       let parent = event['currentTarget']['parentElement']['parentElement']['parentElement']['parentElement'];
       parent.style.display = "none";
    });
}

/** Funktion wird durch loadMentor() aufgerufen
 *  Sie speichert alle Änderungen an den Daten der Mentoren im Formular 'Bearbeiten' der Mentoren im SessionStorage
 */
function trackMentorChange() {
    $('#mentor_edit_form').on('change', (e) => {
        //extract name of input field and value that's now in there
        const field = e.target.id;
        const value = e.target.value;
        let trackProgress = {};
        if ('changedMentor' in sessionStorage) {
            trackProgress = JSON.parse(sessionStorage.getItem('changedMentor'));
            trackProgress[field] = value;
        }
        else {
            trackProgress[field] = value;
        }
        sessionStorage.setItem('changedMentor', JSON.stringify(trackProgress));
    });
}
