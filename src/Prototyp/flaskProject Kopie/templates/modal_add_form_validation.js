function validateForm() {
    $('#add-eng').on('blur', function (){
        if ($(this).val() !== ''){
            $('#mod_add_institute').removeAttr('disabled');
        }
        else {
            $('#mod_add_institute').attr('disabled', true);
        }
    });
}