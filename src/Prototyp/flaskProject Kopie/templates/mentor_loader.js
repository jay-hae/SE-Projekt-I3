$(document).on('DOMContentLoaded', function (){
    $.get('/loader/mentor', function (data){
       insertMentor(data);
       cacheMentors(data);
       sortMentor("firstname");
    });

});

function cacheMentors(mentorArray) {    //mentoren lokal auf rechner im browser zwischenspeichern für einen einfacheren Zugriff
    $.each(mentorArray, (index) =>{
        let cur = mentorArray[index];
        let obj = {
            faculty_ID: cur['faculty_ID'],
            active: cur['active'],
            title: cur['title'],
            firstname: cur['firstname'],
            lastname: cur['lastname'],
            gender_ID: cur['gender_ID'],
            homepage: cur['homepage'],
            email: cur['email'],
            agreements: cur['agreements']
        }
        sessionStorage.setItem(cur['ID'], JSON.stringify(obj));
    });
}

function insertMentor(mentors) {
    $('#mnt_body').empty();
    $.each(mentors, function (index){
        let mentor = mentors[index];
        $('#mnt_body').append("<tr id='"+ mentor['ID'] + "'><th class='firstname_m'>" + mentor['firstname'] + "</th><th class='lastname_m'>"+ mentor['lastname'] + "</th><th>" + mentor['active'] + "</th><th>" + mentor['agreements'] + "</th><th><button type='button' class='btn modal_edit_mentor'>Edit</button></th></tr>");
    });
    editButton();
}

function searchMentor() {
    let element = $('#mnt_body');
    let children = element.children();
    let search_for = $('#tbl_search').val().toLowerCase();
    $.each(children, function (index){
        let row = children[index];
        let cells = row.children;
        let id = cells[0].innerHTML;
        let rowid = "#mentor" + id;
        let firstname = cells[1].innerHTML;
        let lastname = cells[2].innerHTML;
        if (!(firstname.toLowerCase().includes(search_for) || lastname.toLowerCase().includes(search_for))) {
            $('#mentor'+id).attr("style", "display: none");
        }
        else {
            $('#mentor'+id).attr("style", "display: ");
        }
    });
}

function sortMentor(attribute) {
    let all_rows = $('#mnt_body').children();

    if (attribute === "firstname") {
        //sort table after firstname; after first click z-a; a-z; ...;

    }
    else if (attribute === "lastname") {
        //sort lastname after first click: a-z; z-a; ...;

    }
}

