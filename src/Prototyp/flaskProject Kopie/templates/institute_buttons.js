
/** Wird im Modal 'Partnerhochschule hinzufügen' der Button 'Speichern' gedrückt, werden die Eingaben der Nutzer zusammengefasst 
 * und an den Server gesendet (per POST Request an '/addInstitute')
 * Wird im Modal 'Hochschule Bearbeiten' der Button 'Speichern' gedrückt, werden die Eingaben der Nutzer zusammengefasst 
 * und an den Server gesendet
 * Wird im Modal 'Hochschule Bearbeiten' der Button 'zu Partnerschaftsverträgeansicht wechseln' gedürckt, wird die Ansicht 
 * mit den Daten zur Hochschule versteckt und dei Seite mit den Daten zu den Partnerschaftsvertägen angezeigt.
 * Wird im Modal 'Partnerhochschule hinzufügen' oder im Modal 'Hochschule Bearbeiten' der 'X' bzw. 'Abbrechen' Button gedrückt
 * werden die getätigten aber nicht gespeicherten eingaben des Nutzers aus dem Formular gelöscht.
 */
function modalEvents(){
    // MODAL: HOCHSCHULE ANLEGEN -> SPEICHERN BUTTON
    $('#mod_add_inst_save_btn').on('click', function (event) {
        // Eingaben der Mitarbeiter werden zusammengefasst und an den Server gesendet (per POST Request an '/addInstitute')
        // mehrere Formen parallel auswerten; aneinanderhängen der Forminhalte
        let all = $('#form_left_col, #form_mid_col, #form_right_col').serialize();
        $.ajax({
            // Daten im Hintergrund an die aufgeführte URL schicken
            // app.route('/addInstitute) in der Datei app.py
            type: 'POST',
            url: '/add/Institute',
            data: all
        })
            .done(() => {
                // wenn einfügen erfolgreich war, Modal wieder ausgeblendet
                // sonst Fehlermeldung in Modal anzeigen
               $('#modal_add_inst').toggle();
            });
    });

    // MODAL: HOCHSCHULE BEARBEITEN  -> SPEICHERN BUTTON
    $('#mod_edit_inst_save_btn').on('click', function (event){
        event.preventDefault();
        checkIfUpdated();
        checkIfNew();
        $('#close_edit_trigger').trigger('click');
    });

    // MODAL: HOCHSCHULE BEARBEITEN -> ANSICHT WECHSELN BUTTONS
    // Funktionalität des Buttons erlaubt Wechseln zwischen den
    // Bearbeiten der Hochschule und der dazugehörige Partnerschaften
    $('#next').on('click', () => {
        $('#first_slide').hide();
        $('#second_slide').show();
    });
    $('#previous').on('click', () =>{
         $('#first_slide').show();
         $('#second_slide').hide();
    });

    // CLEAR INPUT WHEN CLOSING MODAL
    $('.modal').on('close', function(event, modal) {
        //$(' .my_check').prop('checked', false);
        // clear modal of user input after closing it
        console.log("institute_button.js Z.47");
        $('.modal_form_inst').trigger('reset');
        $('#mod_add_inst_save_btn').attr('disabled', "true")
    });
}

/**add-new-restriction = Wird im Modal 'Hochschule Bearbeiten' in der Ansicht zu Partnerschaftsverträgeansicht wechseln' der Button 'Restriktionen' gedrückt, 
 * öffnet sich ein Formular zur Eingabe der Daten für die neue Restriktion.
 * save-new-restriction = 'Speichern' Button ruft newRestricion() Funktion zum Anlegen und Speichern einer neuen Restriktion auf.
 * add-new-agreement = Wurde der Button 'Neuen Vertrag anlegen' gedrückt erscheint der Button 'Agreement' speichern. Wird dieser vom Nutzer gedrückt,
 * wird ein neues Agreement in die Tabelle gespeichert.
 * add_mob_agreement = 'Neuen Vertrag anlegen'-Button im Modal 'Hochschule Bearbeiten' und 'zu Partnerschaftsverträgeansicht wechseln' öffnet das Formular 
 * zur Eingabe neuer Agreement-Informationen.
 * rtn-agreement = im Modal 'Partnerhochschule bearbeiten' im Formular 'Restriktionen' kann über den Button 'Partnerschaftverträge'
 * zu der Ansicht 'Partnerschaftsvertäge' zurückgekehrt werden.
 * show_restrictions = Anzeige der Restriktionen.
 * add_institute_btn = Anlegen eines neues Institutes
 * close_modal_add = Schließen des Modals 'Partnerschaften hinzufügen' über 'X' bzw. 'Abbrechen'-Button
 * close_modal_restriction = Schließen des Modal 'Restrikionen' über 'X' -Button
 * close_modal_edit = Schließen des Modals 'Bearbeiten'
 * */
function instituteButtonEvents() {
    $('#add-new-restriction').on('click', () =>{
       $('#input-new-restriction').attr('style', 'display: block;');
    });
    $('#save-new-restriction').on('click', () => {
        newRestriction();
    });
    $('#add-new-agreement').on('click', () => {
        insertAgreementInTable(JSON.parse(sessionStorage.getItem('createAg')), $('#addAgreements'), "newAgreement");
        addNewAgreement();
        clearAgreementSpace();
        $('#add-new-agreement-container').attr('style', 'display: none');
    });
    // MODAL: HOCHSCHULE BEARBEITEN - PARTNERSCHAFTSVERTRAEGEANSICHT -> VERTRAG ANLEGEN BUTTON
    $('#add_mob_agreement').on('click', function () {
        $('#add-new-agreement-container').attr('style', 'display: ""');
        clearAgreementSpace();
        sessionStorage.removeItem('currentAgID');
        createNewAgreementObj();
    });
    // MODAL: HOCHSCHULE BEA RBEITEN - PARTNERSCHAFTSVERTRAEGEANSICHT -> RESTRIKTION BUTTON
    $('#rtn-agreement').on('click', function () {
        $('#modal_agreement_restrictions').toggle();
        $('#modal_edit').toggle();
    });
    $('#show_restrictions').on('click', () => {
        if ('currentAgID' in sessionStorage) {
            $('#modal_edit').toggle();
            $('#modal_agreement_restrictions').toggle();
        }
        else {
            alert('Bitte erst ein Agreement auswählen!');
        }
    });
    // HAUPTANSICHT: HOCHSCHULE -> HOCHSCHULE ANLEGEN BUTTON
    $('#add_institute_btn').on('click', function (){
        console.log("institute_button.js Z.76");
        $('.modal_form_add').trigger("reset");
        $('#modal_add_inst').toggle();
    });
    // MODAL: HOCHSCHULE ANLEGEN -> ABBRECHEN / X BUTTON
    $(' .close_modal_add').on('click', function (){
        $('#modal_add_inst').toggle();
    });
    $('.close_modal_restriction').on('click', function (){
        $('#modal_agreement_restrictions').toggle();
    });
    // MODAL: HOCHSCHULE BEARBEITEN -> ABBRECHEN / X BUTTON
    $(' .close_modal_edit').on('click', function (){
        $('#first_slide').show();
        $('#second_slide').hide();
        $('#addAgreements').empty();
        $('#modal_edit').toggle();
        console.log("institute_button.js Z.92");
        clearSessionStorage(); //delete cached data from local storage (important data to keep up edit functionality)
        clearAgreementSpace();
    });
}

function activeDeleteButton() {
    const delButtons = Array.from($('.delete-agreement'));
    delButtons.forEach(button => {
        button['onclick'] = (e) => {
            clickEvent(e);
        }
    });
}

function clickEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    deletion(e.target.parentElement.parentElement.id, "agreement");
}