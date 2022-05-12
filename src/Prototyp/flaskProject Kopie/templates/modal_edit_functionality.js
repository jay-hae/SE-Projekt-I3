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
        .done(function (data) { //put data into modal
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
            $('#modal_edit').toggle();
            chosen_inst = createObjectInstitute(chosen_inst);
            chosen_inst = checkInput(chosen_inst);
            sessionStorage.setItem('currentInstitute', JSON.stringify(chosen_inst));
            trackAgreementChange();
        });
}

function loadAgreements(inst_id) {
    //einfügen der Daten auf zweiter Seite des Modals
    $.ajax({
        method: 'POST',
        url: '/loader/mobAgreements',
        data: {
            id: inst_id
        }
    })
        .done((data) => {
            let agreementObjects = [];
            const addField = $('#addAgreements');
            console.log(data)


            $.each(data, (index, val) => {
                if((data[index])['agreement_inactive'] == 0){
                (data[index])['agreement_inactive'] = 'Ja'
                 }else (data[index])['agreement_inactive'] = 'Nein'

                let newRow = "<tr id='" + (data[index])['agreement_ID'] + "' class='agreement_rows'><th> " + (data[index])['faculty'] + "</th><th>" + (data[index])['agreement_inactive'] + "</th><th> " + (data[index])['mentor_firstname'] + " " + (data[index])['mentor_lastname'] + "</th><th>" + (data[index])['notes'] + "</th></tr>";
                addField.append(newRow);
                let agreementObj = createAgreementObject(data[index]);
                agreementObj = checkInput(agreementObj);
                agreementObjects.push(agreementObj);
            });
            sessionStorage.setItem('currentAgreements', JSON.stringify(agreementObjects));
            sessionStorage.setItem('updatedAgreements', JSON.stringify(agreementObjects));
            makeRowClickable('agreement_rows', 'agreement');
        });

}

function setRestrictions(agreementID, restrictions) { //called when trying to open restriction to one mob_ag

}

function makeRowClickable(rowClass, type) {
    if (type === 'agreement') {
        $(' .'+rowClass).on('click', (e) => {
            let row = e.target.parentElement;
            let rowID = row['id']; //get ID of mob_agreement that was clicked
            insertAgreementInformation(rowID);
        });
    }
    else if (type === 'restriction') {

    }
}

function createObjectInstitute(institute) {
    return {
        ID: Number(institute['id']),
        country_ID: Number(institute['country']),
        eng: String(institute['eng']),
        local: String(institute['local']),
        address: String(institute['adr']),
        homepage: String(institute['website']),
        display: Number(institute['display']),
        erasmus_code: String(institute['ec']),
        note: String(institute['notes']),
        department: String(institute['dep']),
        phone: String(institute['tel']),
        email: String(institute['mail']),
        int_office_homepage: String(institute['off_website']),
        function: String(institute['function']),
        title: String(institute['title']),
        gender_ID: Number(institute['gender']),
        firstname: String(institute['firstname']),
        lastname: String(institute['lastname']),
        person_phone: String(institute['pers_tel']),
        person_email: String(institute['pers_mail'])
    }
}

function createAgreementObject(agreement) {
    console.log(agreement['course_restrictions'].length); // if > 0, pass all restrictions to new function to create restrictions that refer to our mobility agreement ID
    return {
        ID: Number(agreement['agreement_ID']),
        partnership_ID: Number(agreement['partnership_ID']),
        faculty_ID: Number(agreement['faculty']),
        mentor_ID: Number(agreement['mentor_ID']),
        date_signature: String(agreement['date_signature']),
        from_date: String(agreement['valid_since']),
        until_date: String(agreement['valid_until']),
        inactive: String(agreement['agreement_inactive']),
        in_num_mobility: String(agreement['in_num_mob']),
        in_num_months: String(agreement['in_num_months']),
        out_num_mobility: String(agreement['out_num_mob']),
        out_num_months: String(agreement['out_num_months']),
        notes: String(agreement['notes'])
    }
}

function clearSessionStorage() {
    try {
        sessionStorage.removeItem('currentInstitute');
        sessionStorage.removeItem('updatedInstitute');
        sessionStorage.removeItem('currentAgreements');
        sessionStorage.removeItem('updatedAgreements');
        sessionStorage.removeItem('currentAgID');
        sessionStorage.removeItem('agArray');

        //remove mob agreements (information und neu angelegte ag's)
    }

    catch (e) {
        console.log(e);
    }
}

function instituteObjectUpdated() {
    const update = {
        id: (JSON.parse(sessionStorage.getItem('currentInstitute'))).ID,
        country: $('#edit_mod_country').val(),
        eng: $('#edit_modal_eng').val(),
        local: $('#edit_modal_local').val(),
        adr: $('#edit_modal_adr').val(),
        website: $('#edit_modal_ws').val(),
        display: $('#edit_modal_anz').prop('checked'),
        ec: $('#edit_modal_ec').val(),
        notes: $('#edit_modal_ntzn').val(),
        dep: $('#edit_mod_dep').val(),
        tel: $('#edit_mod_tel').val(),
        mail: $('#edit_mod_mail').val(),
        off_website: $('#edit_mod_int_off_ws').val(),
        function: $('#edit_mod_func').val(),
        title: $('#edit_mod_title').val(),
        gender: $('#edit_mod_gender').val(),
        firstname: $('#edit_mod_vn').val(),
        lastname: $('#edit_mod_nn').val(),
        pers_tel: $('#edit_mod_ap_tel').val(),
        pers_mail: $('#edit_mod_ap_mail').val()
    }
    let newObj = createObjectInstitute(update);
    newObj = checkInput(newObj);
    sessionStorage.setItem('updatedInstitute', JSON.stringify(newObj));
}

function checkInput(object) {
    let keys = Object.keys(object);
    keys.forEach(key => {
        if (object[key] === "null") {
            object[key] = "";
        }
    });
    return object;
}

function checkIfUpdated() {
    let oldArr = ['currentInstitute', 'currentAgreements'];
    let newArr = ['updatedInstitute', 'updatedAgreements'];
    let routes = ['updateInstitute', 'updateAgreement'];
    let types = ['institute', 'agreement'];
    let updatedAgs = [];
    let updatedInst;
    let instCheck = false;
    let agreeCheck = false;
    for (let i=0; i < oldArr.length; i++) {
        let skip = false;
        let old = JSON.parse(sessionStorage.getItem(oldArr[i]));
        let newest = JSON.parse(sessionStorage.getItem(newArr[i]));
        if (newest == null) {
            skip = true;
        }
        if (old === newest) {
            skip = true;
        }
        if (!skip) {
            if (types[i] === 'institute'){
                updatedInst = createDifferenceArray(old, newest);
                instCheck = true;
            }
            else {
                for (let j = 0; j < old.length; j++) {
                    updatedAgs.push(createDifferenceArray(old[j], newest[j]));
                }
                agreeCheck = true;
            }
        }
    }
    if(instCheck) {
        postData(updatedInst, '/changeData/updateInstitute');
    }
    if (agreeCheck) {
        postData(JSON.stringify(updatedAgs.filter(obj => obj !== undefined)), '/changeData/updateAgreement');
    }
}

function createDifferenceArray(oldObj, newObj) {
    let keys = Object.keys(oldObj);
    let newestAttr = {};
    let changed = false;
    keys.forEach(key => {
        if (oldObj[key] !== newObj[key]) {
            newestAttr[key] = newObj[key];
            changed = true;
        }
    });
    if (changed) {
        newestAttr['ID'] = oldObj['ID'];
        return newestAttr;
    }
}

function postData(data, url) {
    $.ajax({
        data: data,
        method: 'POST',
        url: url
    })
        .done(answer => {
            return answer;
        });
}
