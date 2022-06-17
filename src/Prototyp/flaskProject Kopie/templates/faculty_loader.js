/** Wenn die Seite faculty.html vollständig geladen wurde, wird ein GET-Request an app.py gesendet, um
 * Fakultäts-Daten aus der Datenbank abzufragen. Wenn die Daten geladen wurde, werden diese an die Funktion
 * insertFac übergeben.
*/
$(document).on('DOMContentLoaded', () => {
    $.ajax({
        type: 'GET',
        url: '/loader/faculty'
    })
        .done((data) => {
           insertFac(data);
        });
});

/** Wenn der GET-Request die Fakultäts-Informationen aus der Datenbank geladen hat, wird per HTML eine Tabelle mit den Inhalten erzeugt.
 *  
 * */
function insertFac(allFaculties) {
    const myTbl = $('#addFaculty');
    allFaculties.forEach(entity => {
        myTbl.append("<tr><th>" + entity['de'] + "</th><th>" + entity['eng'] + "</th><th>" + entity['agreements'] + "</th></tr>");
    });
}