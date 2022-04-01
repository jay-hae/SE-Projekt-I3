function addFilterChangeEvents(){
    $(' .filter').on('change', function (){
        //beim Auswählen eines Filters werden alle Select optionen mit jeweiligen Werten an das Backend geschickt
        let fil_form = $('#filter_form');
        $.ajax({
            type: 'POST',
            url: '/filterInstitute',
            data: fil_form.serialize(), // serializes the form's elements.
            success: function(data)
            {
                insertData(data);
            }
        });
    });
    //clear filter after reset
    //immplement to check if reset really changes anything; if not then prevent action
    $('#fil_reset').on('click', function (event){
        event.preventDefault();
        //kill all child elements created by loadInstitutes to clear page for reload child
        $('#addItems').empty();
        loadAll();
        $('#filter_form').trigger('reset');
    });
}