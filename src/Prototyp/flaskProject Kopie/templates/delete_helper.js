function deletion(row, type) {
    let id = row['id'];
    if (confirm('Bestätigen mit "OK" wenn das Objekt unwiderruflich gelöscht werden soll!')) {
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
                } else {
                    if (String(type) === 'agreement') {
                        clearAgreementStorage(id);
                    } else if (String(type) === 'restriction') {
                        if ('currentRestrictions' in sessionStorage || 'newRestrictions' in sessionStorage) {
                            clearRestrictionStorage(id);
                        }
                    }
                    row.hidden = true;
                }
            });
    }
}

/**
 * Funktion prüft welcher Nutzer die Anwendung gerade ausführt (normaler Nutzer oder Admin mit Löschrechten)
 */
function checkAdmin() {
    const adminState = JSON.parse(sessionStorage.getItem('admin'));
    return adminState === 'true';

}

function clearAgreementStorage(id) {
    if ('agArray' in sessionStorage) {
        let agArray = JSON.parse(sessionStorage.getItem('agArray'));
        agArray.splice(agArray.indexOf(id), 1);
        sessionStorage.setItem('agArray', JSON.stringify(agArray));
    }
    if (id.includes('new')) {
        //kick new agreement out of sessionStorage to prevent it from being created
        let newAgreements = JSON.parse(sessionStorage.getItem('newAgreements'));
        newAgreements = newAgreements.filter(ag => ag['ID'] !== id);
        sessionStorage.setItem('newAgreements', JSON.stringify(newAgreements));
    }
    else {
        let currentAgs = JSON.parse(sessionStorage.getItem('currentAgreements'));
        let updatedAgs = JSON.parse(sessionStorage.getItem('updatedAgreements'));
        currentAgs = currentAgs.filter(ag => ag['ID'] !== id);
        sessionStorage.setItem('currentAgreements', JSON.stringify(currentAgs));
        updatedAgs = updatedAgs.filter(ag => ag['ID'] !== id);
        sessionStorage.setItem('updatedAgreements', JSON.stringify(updatedAgs));
    }
}

function clearRestrictionStorage(id) {
    if (id.includes('new')) {
        let newRestrictions = JSON.parse(sessionStorage.getItem('newRestrictions'));
        newRestrictions = newRestrictions.filter(res => res['restriction_ID'] !== id);
        console.log('new rest', newRestrictions);
        sessionStorage.setItem('newRestrictions', JSON.stringify(newRestrictions));
    }
    else {
        let currentRestrictions = JSON.parse(sessionStorage.getItem('currentRestrictions'));
        currentRestrictions = currentRestrictions.filter(res => res[1]['restriction_ID'] !== id);
        console.log('rest', currentRestrictions);
        sessionStorage.setItem('currentRestrictions', JSON.stringify(currentRestrictions));
        let updatedRestrictions = JSON.parse(sessionStorage.getItem('updatedRestrictions'));
        updatedRestrictions = updatedRestrictions.filter(res => res[1]['restriction_ID'] !== id);
        console.log('upd', updatedRestrictions);
        sessionStorage.setItem('updatedRestrictions', JSON.stringify(updatedRestrictions));
    }
}