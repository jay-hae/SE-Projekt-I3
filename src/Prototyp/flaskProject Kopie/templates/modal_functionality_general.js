function modal_events(){
    $('#mod_add_institute').on('click', function (event){
        //Eingaben der Mitarbeiter werden zusammengefasst und an den Server gesendet (per POST Request an '/addInstitute')
        let all = $('#form_left_col, #form_mid_col, #form_right_col').serialize();  //mehrere Formen parallel auswerten; aneinanderhängen der Forminhalte
        $.ajax({ //Daten im Hintergrund an die aufgeführte URL schicken
            type: 'POST',
            url: '/addInstitute', //app.route('/addInstitute) in der Datei app.py
            data: all
        })
            .done(() => {
                //wenn einfügen erfolgreich war, Modal wieder ausgeblendet
               $('#modal_add').toggle();
               //sonst Fehlermeldung in Modal anzeigen
            });
    });
    $('#mod_edit').on('click', function (event){
        event.preventDefault();
        checkIfUpdated();
        $('#close_edit_trigger').trigger('click');
    });
    $(' .modal').on('close', function(event, modal) {
        //$(' .my_check').prop('checked', false);
        $(' .modal_form').trigger('reset'); // clear modal of user input after closing it
        $('#mod_add_institute').attr('disabled', "true")
    });
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
}

function modal_button_events() {
    $('#btn_hs_add').on('click', function (){
        $(' .modal_form_add').trigger("reset");
        $('#modal_add').toggle();
    });
    $(' .close_modal_add').on('click', function (){
        $('#modal_add').toggle();
        $('#modal_add_mentor').toggle();
    });
    $(' .close_modal_edit').on('click', function (){
        $('#first_slide').show();
        $('#second_slide').hide();
        $('#addAgreements').empty();
        $('#modal_edit').toggle();
        clearSessionStorage(); //delete cached data from local storage (important data to keep up edit functionality)
        clearAgreementSpace();
    });
}