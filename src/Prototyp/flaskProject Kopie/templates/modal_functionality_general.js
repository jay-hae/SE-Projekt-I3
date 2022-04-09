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
                //wenn einfügen erfolgreich war
               $('#modal_add').toggle();
               //sonst Fehlermeldung in Modal anzeigen
            });
    });
    $('#mod_edit').on('click', function (event){
        event.preventDefault();
        let all = $('#edit_left_col').serialize();
        $.ajax({
            type: 'POST',
            url: '/editInstitute',
            data: all,
        });
    });
    $(' .modal').on('close', function(event, modal) {
        //$(' .my_check').prop('checked', false);
        $(' .modal_form').trigger('reset'); //clear modal after closing it
        $('#mod_add_institute').attr('disabled', "true")
    });
    //Funktion Buttons zum wechsel der Ansicht in Popup welches erscheint, sobald man den editieren-Button betätigt
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
    });
    $(' .close_modal_edit').on('click', function (){
        $('#modal_edit').toggle();
    });
}