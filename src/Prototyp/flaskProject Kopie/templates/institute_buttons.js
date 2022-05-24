function modal_events(){
    // MODAL: HOCHSCHULE ANLEGEN -> SPEICHERN BUTTON
    $('#mod_add_inst_save_btn').on('click', function (event) {
        
        // Eingaben der Mitarbeiter werden zusammengefasst und an den Server gesendet (per POST Request an '/addInstitute')
        // mehrere Formen parallel auswerten; aneinanderhängen der Forminhalte
        let all = $('#form_left_col, #form_mid_col, #form_right_col').serialize();  

        $.ajax({
            // Daten im Hintergrund an die aufgeführte URL schicken
            // app.route('/addInstitute) in der Datei app.py
            type: 'POST',
            url: '/addInstitute', 
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
        $('.modal_form').trigger('reset'); 
        $('#mod_add_inst_save_btn').attr('disabled', "true")
    });
}

function modal_button_events() {
    // MODAL: HOCHSCHULE BEARBEITEN - PARTNERSCHAFTSVERTRAEGEANSICHT -> VERTRAG ANLEGEN BUTTON
    $('#add_mob_agreement').on('click', function () {

    });
    // MODAL: HOCHSCHULE BEARBEITEN - PARTNERSCHAFTSVERTRAEGEANSICHT -> RESTRIKTION BUTTON
    $('#rtn-agreement').on('click', function () {
        $('#modal_agreement_restrictions').toggle();
        $('#modal_edit').toggle();
    });
    $('#show_restrictions').on('click', () => {
        $('#modal_edit').toggle();
        $('#modal_agreement_restrictions').toggle();
    });
    // HAUPTANSICHT: HOCHSCHULE -> HOCHSCHULE ANLEGEN BUTTON
    $('#add_institute').on('click', function (){
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
        clearSessionStorage(); //delete cached data from local storage (important data to keep up edit functionality)
        clearAgreementSpace();
    });

}
