
/** Immer wenn einer der Filter der Seite Institute.html durch den Nutzer verändert wurde, 
 * sendet die Funktion einen Post-Request mit den aktuell gewählten Filtern an app.py
 * und erhält die so gefilterten Hochschul-Daten aus der Datenbank zurück. +
 * Außerdem werden alle Filter auf den ursprungszustand zurückgesetzt, wenn der Nutzer
 * den Zurücksetzen-Button drückt.
 */
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
    $('#fil_reset').on('click', function (event){
        event.preventDefault();
        //kill all child elements created by loadInstitutes to clear page for reload child
        $('#addItems').empty();
        loadAll();
        $('#filter_form').trigger('reset');
    });
}