$(document).ready(function (){
    $.get('/loader/mentor', function (data){
       insertMentor(data);
    });
});


function insertMentor(mentors) {
    $('#mnt_body').empty();
    $.each(mentors, function (index){
        let mentor = mentors[index];
        $('#mnt_body').append("<tr id='mentor"+ mentor['ID'] + "'><th style='display: none'>" + mentor['ID'] + "</th><th class='firstname_m'>" + mentor['f_name'] + "</th><th class='lastname_m'>"+ mentor['l_name'] + "</th><th>" + mentor['act'] + "</th><th>" + mentor['amount'] + "</th><th><button type='button' class='btn'>Edit</button></th></tr>");
    });
}

function sortMentor() {
    let element = $('#mnt_body');
    let children = element.children();
    let search_for = $('#tbl_search').val().toLowerCase();
    $.each(children, function (index){
        let row = children[index];
        let cells = row.children;
        let id = cells[0].innerHTML;
;       let rowid = "#mentor" + id;
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