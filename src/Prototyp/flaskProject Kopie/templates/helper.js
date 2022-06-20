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
                alert('Löschen nicht möglich. Bitte vorher alle Verträge der Hochschule entfernen um fortfahren zu können');
            }
        });
}