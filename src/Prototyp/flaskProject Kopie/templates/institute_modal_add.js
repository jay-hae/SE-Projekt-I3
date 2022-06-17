
/** Im Modal 'Partnerhochschule anlegen' den Speichern Button auf 'disable' setzen solange keine englische Bezeichnung eingetragen wurde
 */
function validateForm() {
    // MODAL: HOCHSCHULE ANLEGEN -> disable Speichern Button solange keine Englische Bezeichnung eingetragen wurde
    $('#add-eng').on('blur', function (){
        if ($(this).val() !== ''){
            $('#mod_add_inst_save_btn').removeAttr('disabled');
        }
        else {
            $('#mod_add_inst_save_btn').attr('disabled', true);
        }
    });
}