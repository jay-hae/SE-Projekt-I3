$(document).on('DOMContentLoaded', () => {
    $.get('/loader/course', data => {
        const myTbl = $('#addCourses');
        data.forEach(entity => {
           myTbl.append("<tr><th>" + entity['de'] + "</th><th>" + entity['eng'] + "</th></tr>");
        });
    });
});