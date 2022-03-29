function loadModal(inst_id){
    // $('#edit_modal_anz').prop('checked', true); set checkbox true manually
    $.ajax({
        data: {
            id: inst_id
        },
        type: 'POST',
        url: '/openModal'
    })
        //open modal after information got inserted into form
        .done(function (data){ //put data into modal
            let chosen_inst = data[0];
            $('#edit_mod_country').val(chosen_inst['country']);
            $('#edit_modal_eng').val(chosen_inst['eng']);
            $('#edit_modal_local').val(chosen_inst['local']);
            $('#edit_modal_adr').val(chosen_inst['adr']);
            $('#edit_modal_ws').val(chosen_inst['website']);
            $('#edit_modal_ntzn').val(chosen_inst['notes']);
            if (chosen_inst['display'] === 1) {
                $('#edit_modal_anz').prop('checked', true);
            }
            $('#edit_modal_ec').val(chosen_inst['ec']);
            $('#edit_mod_dep').val(chosen_inst['dep']);
            $('#edit_mod_tel').val(chosen_inst['tel']);
            $('#edit_mod_mail').val(chosen_inst['mail']);
            $('#edit_mod_int_off_ws').val(chosen_inst['off_website']);
            $('#edit_mod_func').val(chosen_inst['function']);
            $('#edit_mod_gender').val(chosen_inst['gender']);
            $('#edit_mod_title').val(chosen_inst['title']);
            $('#edit_mod_vn').val(chosen_inst['firstname']);
            $('#edit_mod_nn').val(chosen_inst['lastname']);
            $('#edit_mod_ap_tel').val(chosen_inst['pers_tel']);
            $('#edit_mod_ap_mail').val(chosen_inst['pers_mail']);
            $('#exampleModalToggle').toggle();
        });
}

function loadAgreements(inst_id) {
    $.ajax({
        data: {
            id: inst_id
        },
        type: 'POST',
        url: '/loader/mobAgreements'
    })
        .done((data) => {
            //einfügen der Daten auf zweiter Seite des Modals
            const add = $('#addAgreements');
            data.forEach((obj) => {
                allAgreements.push(obj);
                add.append("<tr><th style=\"display:none;\">" + obj['agreement_ID'] + "</th><th >" + obj['faculty'] + "</th><th >" + obj['agreement_inactive'] + "</th><th >" + obj['mentor_ID'] + "</th><th>" + obj['note'] + "</th></tr>");
            });
        });
    return allAgreements;
}
//store all mobility agreement objects
const allAgreements = [];