function modal_events(){
    $('#mod_add_institute').on('click', function (event){

        let all = $('#form_left_col, #form_mid_col, #form_right_col').serialize();  //mehrere Formen parallel auswerten; aneinanderhängen der Forminhalte
        console.log(all);
        $.ajax({
            type: 'POST',
            url: '/addInstitute',
            data: all,
            success: function(data)
            {
                alert('Hi');
            }
        });
    });
    $('#mod_edit').on('click', function (event){
        event.preventDefault();
        let form = $('#form_edit');
        $.ajax({
            type: 'POST',
            url: '/editInstitute',
            data: form.serialize(), // serializes the form's elements.
        });
    });
    $(' .modal').on('close', function(event, modal) {
        //$(' .my_check').prop('checked', false);
        $(' .modal_form').trigger('reset'); //clear modal after closing it
        $('#mod_add_institute').attr('disabled', "true")
    });
    $('#next').on('click', () => {
        $('#first_slide').hide();
        $('#second_slide').show();
    });
    $('#previous').on('click', () =>{
         $('#first_slide').show();
         $('#second_slide').hide();
    });
}