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
    return adminState === 'true';

}

function clearAgreementStorage(id) {
    let agArray = JSON.parse(sessionStorage.getItem('agArray'));
    agArray.splice(agArray.indexOf(id), 1);
    sessionStorage.setItem('agArray', JSON.stringify(agArray));
    if (id.includes('new')) {
        let newAgreements = JSON.parse(sessionStorage.getItem('newAgreements'));
        newAgreements.filter(ag => {

        });
    }
    else {

    }
}

function clearRestrictionStorage(id) {
    if (id.includes('new')) {

    }
    else {

    }
}