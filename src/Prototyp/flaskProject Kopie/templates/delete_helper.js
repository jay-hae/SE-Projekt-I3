function deletion(id, type) {
    $.ajax({
        type: 'POST',
        url: `/delete/${type}`,
        data: {
            id: id
        }
    })
        .done((data) => {
            if (String(data['state']) === 'failed') {
                alert('Löschen nicht möglich. Bitte vorher alle Verträge/Studiengänge dieser Hochschule entfernen.');
            }
        });
}

/**
 * Funktion prüft welcher Nutzer die Anwendung gerade ausführt (normaler Nutzer oder Admin mit Löschrechten)
 */
function checkAdmin() {
    const adminState = JSON.parse(sessionStorage.getItem('admin'));
    if (adminState !== 'true') {
        //set display of all delete buttons to "display: none;"
    }
}