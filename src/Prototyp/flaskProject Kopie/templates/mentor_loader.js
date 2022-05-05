function cacheMentors(mentorArray) {    //mentoren lokal auf rechner im browser zwischenspeichern für einen einfacheren Zugriff
    const mentArr = [];
    $.each(mentorArray, (index) => {
        let cur = mentorArray[index];
        let obj = {
            faculty_ID: cur['faculty_ID'],
            mentor_ID: cur['ID'],
            active: cur['active'],
            title: cur['title'],
            firstname: cur['firstname'],
            lastname: cur['lastname'],
            gender_ID: cur['gender_ID'],
            homepage: cur['homepage'],
            email: cur['email'],
            agreements: cur['agreements']
        }
        mentArr.push(cur['ID'], obj)
    });
    sessionStorage.setItem('mentor', JSON.stringify(mentArr));
}


function mentorInsert(mentors) {
    $('#mnt_body').empty();
    $.each(mentors, function (index){
        let mentor = mentors[index];
        $('#mnt_body').append("<tr id='"+ mentor['ID'] + "'>" +
                                "<th class='lastname_m'>" + mentor['lastname'] + "</th>" +
                                "<th class='firstname_m'>"+ mentor['firstname'] + "</th>" +
                                "<th>" + mentor['active'] + "</th>" +
                                "<th>" + mentor['agreements'] + "</th>" +
                                "<th><button type='button' class='btn modal_edit_mentor'>Bearbeiten</button></th></tr>");
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
        let id = row['id'];
        let firstname = cells[1].innerHTML;
        let lastname = cells[0].innerHTML;
        if (!(firstname.toLowerCase().includes(search_for) || lastname.toLowerCase().includes(search_for))) {
            $('#'+id).attr("style", "display: none");
        }
        else {
            $('#'+id).attr("style", "display: ");
        }
    });
}

/*function mentorSelect(mentors, selectID) {
    const selectObj = document.getElementById(selectID);
    $.each(mentors, function(index) {
        const cur = mentors[index];
        selectObj.append($('<option>'), {
            value: cur['ID'],
            text: cur['title'] + " " + cur['firstname'] + " " + cur['lastname']
        });
    });
}*/

$(document).on('DOMContentLoaded', function (){
    $.ajax({
        type: 'GET',
        url: '/loader/mentor'
    })
        .done((data) => {
            mentorInsert(data);
            cacheMentors(data);
        });
});



