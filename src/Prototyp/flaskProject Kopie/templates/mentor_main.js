$(document).on('DOMContentLoaded', function (){
    $.ajax({
        type: 'GET',
        url: '/loader/mentor'
    })
        .done((data) => {
            mentorInsert(data);
            cacheMentors(data);
        });
    trackMentorChange();
    buttonFunctionality();
    // Laden aller Werte für Dropdowns in der Mentoren übersicht -> gleiche funktionsweise wie das Laden der Filterelemente in der Hochschulübersicht
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


});

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
                                "<th>" + mentor['faculty_ID'] + "</th>" +
                                "<th>" + mentor['agreements'] + "</th>" +
                                "<th><button type='button' class='btn modal_edit_mentor'>Bearbeiten</button></th></tr>");
    });
    editMentorButton();
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

function buttonFunctionality() {
    // HAUPTANSICHT: MENTOR -> MENTOR ANLEGEN BUTTON
    $('#add_mentor_btn').on('click', function (){
        // reset the form / clear input before open the modal
        $('.modal_form_mentor').trigger("reset");
        $('#modal_add_mentor').toggle();
    });
    
   $('.close_modal_edit_mentor').on('click', function (){
        $('#modal_edit_mentor').toggle();
        sessionStorage.removeItem('changedMentor');
    });
   
   //set functionality for all abbrechen/X Buttons
    $(' .cancel').on('click', event => {
       let parent = event['currentTarget']['parentElement']['parentElement']['parentElement']['parentElement'];
       parent.style.display = "none";
    });
}

function saveMentorButton() {
    const mentor_id = $('#edit_mentor_id');
    const data = {};
    data['id'] = String(mentor_id['0']['value']);
    if ('changedMentor' in sessionStorage) {
        const changedData = JSON.parse(sessionStorage.getItem('changedMentor'));
        delete changedData['edit_mentor_active'];
        for (let key in changedData) {
            //extract column name for database from html element id
            let toSplit = String(key);
            toSplit = toSplit.split('_')[2];
            if (toSplit === 'gender' || toSplit === 'faculty') {
                data[`${toSplit}_ID`] = changedData[key];
            }
            else {
                data[toSplit] = changedData[key];
            }
        }
        data['active'] = $('#edit_mentor_active').prop('checked') ? 0 : 1;
        $.ajax({
            type: 'POST',
            url: '/changeData/mentor',
            data: data
        });
    }
}