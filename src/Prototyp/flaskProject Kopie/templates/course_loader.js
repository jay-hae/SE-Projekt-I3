//get all courses from sessionStorage and add them to table
$(document).on('DOMContentLoaded',  loadCourse());

/** Wenn die Seite course.html vollständig geladen wurde, wird ein GET-Request an app.py gesendet, um
 * Studiengängedaten aus der Datenbank abzufragen.
 */
function loadCourse() {
    $.get('/loader/course', data => {
        const courses = [];
        const myTbl = $('#addCourses');
        data.forEach(entity => {
           myTbl.append("<tr><th>" + entity['de'] + "</th><th>" + entity['eng'] + "</th></tr>");
           courses.push(entity);
        });
        sessionStorage.setItem('courses', JSON.stringify(courses));
    })
        .then(() => {
            loadCourseDropdown();
        });
}