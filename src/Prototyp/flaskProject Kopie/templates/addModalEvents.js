function modal_events(){
    $('#mod_add_institute').on('click', function (event){
        event.preventDefault();
        let form = $('#form_add');
        $.ajax({
            type: 'POST',
            url: '/addInstitute',
            data: form.serialize(), // serializes the form's elements.
            success: function(data)
            {

              event.submit();
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
            success: function(data)
            {
                //if edit was successful close modal; sonst Fehlermeldung o.Ä.
                event.submit();
            }
        });
    });
    $(' .modal').on($.modal.CLOSE, function(event, modal) {
        //$(' .my_check').prop('checked', false);
        $(' .modal_form').trigger('reset'); //clear modal after closing it
    });
}