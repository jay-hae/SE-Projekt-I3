/* load data of the chosen institute from the database into the modal */
function addButtonEvent() {
    $(".edit_inst_btn").on('click', function () {
        let institute_row = $(this).parent().parent(); // speichere die Zeile in der sich der gedrückte Button befindet
        let first_column = institute_row[0].children; // extract <th> where id is inside
        let id = first_column[0].innerHTML; // get ID of institute
        loadAgreements(id);
        loadModal(id);
    });
}

function loadModal(inst_id) {
    sessionStorage.setItem('currentInstitute', JSON.stringify(inst_id));
    // $('#edit_modal_anz').prop('checked', true); set checkbox true manually
    $('#vertragstyp-filter').val("1");
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
            $('#exampleModalToggleLabel')[0].textContent = chosen_inst['eng'];
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

// HOCHSCHULINFO ANSICHT
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

function createRestriction(ag_ID, restrictions) {
    if (restrictions.length > 0) {
        restrictions.forEach(obj => restrict.push([ag_ID, obj]));
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
        sessionStorage.removeItem('updatedRestrictions');
        sessionStorage.removeItem('currentRestrictions');
        sessionStorage.removeItem('agreement_type');
        sessionStorage.removeItem('createAg');
        sessionStorage.removeItem('newAgreements');
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
    let oldArr = ['currentInstitute', 'currentAgreements', 'currentRestrictions'];
    let newArr = ['updatedInstitute', 'updatedAgreements', 'updatedRestrictions'];
    let types = ['institute', 'agreement', 'restriction'];
    let updatedAgs = [];
    let updatedRestrictions = [];
    let updatedInst;
    let instCheck = false;
    let agreeCheck = false;
    let restrictionCheck = false;
    for (let i=0; i < oldArr.length; i++) {
        instCheck = false;
        agreeCheck = false;
        restrictionCheck = false;
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
            else{
                if (types[i] === 'agreement') {
                    for (let j = 0; j < old.length; j++) {
                        updatedAgs.push(createDifferenceArray(old[j], newest[j]));
                }
                    agreeCheck = true;
                }
                else {
                    for (let j = 0; j < old.length; j++) {
                        console.log(old[j]);
                        updatedRestrictions.push(createDifferenceArray(old[j][1], newest[j][1]));
                }
                    restrictionCheck = true;
                }
            }
        }
        if(instCheck) {
        postData(updatedInst, '/changeData/updateInstitute');
        }
        if (agreeCheck) {
            let sendData = Array.from(updatedAgs.filter(obj => obj !== undefined));
            console.log(sendData);
            sendData.forEach(obj => postData(obj, '/changeData/updateAgreement'));
        }
        if (restrictionCheck) {
            let sendData = Array.from(updatedRestrictions.filter(obj => obj !== undefined));
            console.log(sendData);
            sendData.forEach(obj => postData(obj, '/changeData/updateRestriction'));
        }
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
        if (oldObj.hasOwnProperty('ID')) {
            newestAttr['ID'] = oldObj['ID'];
        }
        else {
            newestAttr['ID'] = oldObj['restriction_ID'];
        }
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

function insertAgreementInformation(agreement) {
    let setAgreement = returnAgreement(agreement);
    setAgreement = setAgreement[0];
    sessionStorage.setItem('currentAgID',setAgreement['ID']);
    $('#mentor_ID').val(setAgreement.mentor_ID);
    $('#faculty_ID').val(setAgreement.faculty_ID);
    $('#date_signature').val(setAgreement.date_signature);
    $('#from_date').val(setAgreement.from_date); //möglicher Vorschlag -> alle leeren Felder mit "keine Angabe füllen" setAgreement.from_data.length > 0 ? setAgreement.from_data : "keine Angabe"
    $('#until_date').val(setAgreement.until_date);
    $('#inactive').prop('checked', Number(setAgreement.inactive) === Number(1));
    $('#in_num_mobility').val(setAgreement.in_num_mobility);
    $('#in_num_months').val(setAgreement.in_num_months);
    $('#out_num_mobility').val(setAgreement.out_num_mobility);
    $('#out_num_months').val(setAgreement.out_num_months);
    $('#notes').innerText = setAgreement.notes;
}

function returnAgreement(id) {  //get updated information if updated, otherwise use the data taken from database
    if ("agArray" in sessionStorage) {
        let arr = JSON.parse(sessionStorage.getItem("agArray"));
        console.log(arr);
        if (arr.includes(id)) {
            let updatedAg = JSON.parse(sessionStorage.getItem("updatedAgreements"));
            return updatedAg.filter(obj => Number(obj.ID) === Number(id));
        }
    }
    const allAgreements = JSON.parse(sessionStorage.getItem('currentAgreements'));
    return allAgreements.filter(obj => Number(obj.ID) === Number(id));
}

function clearAgreementSpace() {
    let kids = Array.from(document.getElementsByClassName('agreementInformation'));
    kids.forEach(kid => {
       $(kid).val("");
    });
}

function insertRestriction() {
    $('#tbl_restriction').innerHTML = "";
    let restrictions = getRestrictions();
    restrictions.forEach(restriction => {
        restriction = restriction[1];
        let row = "<tr id='" + restriction['restriction_ID'] + "'><th id='course'><textarea onchange='trackRestrictionChange(this.parentElement, this.value)'> "+ restriction['course'] + "</textarea></th><th id='subject_area_code'><textarea onchange='trackRestrictionChange(this.parentElement, this.value)'>" + restriction['subject_area_code'] + "</textarea></th><th id='incoming'><textarea onchange='trackRestrictionChange(this.parentElement, this.value)'>" + restriction['incoming'] + "</textarea></th><th id='sub_num_mobility'><textarea onchange='trackRestrictionChange(this.parentElement, this.value)'>"+ restriction['sub_num_mobility'] +"</textarea></th><th id='sub_num_months'><textarea onchange='trackRestrictionChange(this.parentElement, this.value)'>"+restriction['sub_num_months']+"</textarea></th></tr>";
        $('#tbl_restriction').append(row);
    })
}

function getRestrictions() {
    let matchingAgreement = JSON.parse(sessionStorage.getItem('currentAgID'));
    let allRestrictions = JSON.parse(sessionStorage.getItem('currentRestrictions'));
    return allRestrictions.filter(obj => obj[0] === matchingAgreement);
}

function createNewAgreementObj() {
    let ag_val = $('#vertragstyp-filter').val();
    let inst_id = JSON.parse(sessionStorage.getItem('currentInstitute'));
    let agreement = {};
    agreement['partnership_type_ID'] = ag_val;
    agreement['institute_ID'] = inst_id['ID'];
    console.log(agreement);
    sessionStorage.setItem('createAg', JSON.stringify(agreement));
}

function addNewAgreement(){
    if (sessionStorage.getItem('createAg')) {
        let newAG = JSON.parse(sessionStorage.getItem('createAg'));
        if (sessionStorage.getItem('newAgreements')) {
            let agreements = JSON.parse(sessionStorage.getItem('newAgreements'));
            agreements.push(newAG);
            sessionStorage.setItem('newAgreements', JSON.stringify(agreements));
        }
        else {
            let agreements = [];
            agreements.push(newAG);
            sessionStorage.setItem('newAgreements', JSON.stringify(agreements));
        }
        sessionStorage.removeItem('createAg');
    }
}