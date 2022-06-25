/** Funktion wird durch loadMentor() aufgerufen
 *  Die Daten aus dem Formular 'Mentor hinzufügen' werden sobald der Nutzer den 'Speichern'-Button drückt
 *  über app.py an die Datenbank gesendet und persistiert.
 */
function insertMentor() {
    $('.new_mentor').on('click', () => {
    $.ajax({
        method: 'POST',
        url: '/add/Mentor',
        data: $('#mentor_add_form').serialize()
    })
        .done((data) => {
            console.log(data);
            // wenn einfügen erfolgreich war, Modal wieder ausgeblendet
            // sonst Fehlermeldung in Modal anzeigen
           $('#modal_add_mentor').toggle();
           location.reload();
        });

    });
}

