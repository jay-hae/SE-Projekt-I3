// Laden aller Werte für Dropdowns in der Mentoren übersicht -> gleiche funktionsweise wie das Laden der Filterelemente in der Hochschulübersicht

$(document).on('DOMContentLoaded', () => {
    $.ajax({
        type: 'GET',
        url: '/get/faculties'
    })
        .done((data) => {
            $.each(data, (index, obj) => {
                $(' .edit_mentor_fac').append($('<option>', {
                    value: obj['id'],
                    text: obj['fac']
                }));
            })
        });
})