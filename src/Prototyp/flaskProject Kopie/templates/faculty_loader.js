$(document).on('DOMContentLoaded', () => {
    $.ajax({
        type: 'GET',
        url: '/loader/faculty'
    })
        .done((data) => {
           insertFac(data);
        });
});

function insertFac(allFaculties) {
    const myTbl = $('#addFaculty');
    allFaculties.forEach(entity => {
        myTbl.append("<tr><th>" + entity['de'] + "</th><th>" + entity['eng'] + "</th><th>" + entity['agreements'] + "</th></tr>");
    });
}