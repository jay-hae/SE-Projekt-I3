function insertAgreementInformation(agreement) {
    let setAgreement = returnAgreement(agreement);
    setAgreement = (setAgreement['object'])[setAgreement['index']];
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
            return {'object': updatedAg.filter(obj => Number(obj.ID) === Number(id)), 'index': 0};
        }
    }
    if (id.includes("new")) {
        let extract = (id.split('_'))[1]; //get "index" of new agreement of current institute -> get agreement data from sessionStorage
        let newAgreement = JSON.parse(sessionStorage.getItem('newAgreements'));
        console.log(extract);
        return {'object': newAgreement, 'index': extract};
    }
    else {
        const allAgreements = JSON.parse(sessionStorage.getItem('currentAgreements'));
        return {'object': allAgreements.filter(obj => Number(obj.ID) === Number(id)), 'index': 0};
    }
}

function clearAgreementSpace() {
    let kids = Array.from(document.getElementsByClassName('agreementInformation'));
    kids.forEach(kid => {
       $(kid).val("");
    });
}

function insertRestriction(object=false) {
    let restrictions = [];
    if (object === false) {
        let tbl_rest = document.getElementById('tbl_restriction');
        tbl_rest.innerHTML = "";
        restrictions = getRestrictions();
    }
    else
        restrictions.push(object);
    const dropdown = $('<select onchange="trackRestrictionChange(this.parentElement, this.value)">');
    dropdown.attr('id', 'exchange-type-dropdown');
    //maybe flip values -> wait for raphaels answer
    dropdown.append($('<option>', {
        value: '0',
        text: 'Outgoing'
    }));
    dropdown.append($('<option>', {
        value: '1',
        text: 'Incoming'
    }));
    console.log(restrictions);
    restrictions.forEach((restriction, index) => {
        restriction = restriction[1];
        dropdown[0].id = `exchange-type-dropdown-${index}`;
        let row = "<tr id='" + restriction['restriction_ID'] + "'><th id='course'><p> "+ restriction['course'] + "</p></th><th id='subject_area_code'><textarea onchange='trackRestrictionChange(this.parentElement, this.value)'>" + restriction['subject_area_code'] + "</textarea></th><th id='incoming'>" + dropdown[0].outerHTML + "</th><th id='sub_num_mobility'><textarea onchange='trackRestrictionChange(this.parentElement, this.value)'>"+ restriction['sub_num_mobility'] +"</textarea></th><th id='sub_num_months'><textarea onchange='trackRestrictionChange(this.parentElement, this.value)'>"+restriction['sub_num_months']+"</textarea></th></tr>";
        $('#tbl_restriction').append(row);
        document.getElementById(`exchange-type-dropdown-${index}`).value = restriction['incoming'];
    })
}

function getRestrictions() {
    let matchingAgreement = sessionStorage.getItem('currentAgID');
    let allRestrictions = JSON.parse(sessionStorage.getItem('currentRestrictions'));
    return allRestrictions.filter(obj => Number(obj[0]) === Number(matchingAgreement));
}

function createNewAgreementObj() {
    let ag_val = $('#vertragstyp-filter').val();
    let inst_id = JSON.parse(sessionStorage.getItem('currentInstitute'));
    let agreement = {};
    agreement['partnership_type_ID'] = ag_val;
    agreement['institute_ID'] = inst_id['ID'];
    sessionStorage.setItem('createAg', JSON.stringify(agreement));
}

function addNewAgreement(){
    if (sessionStorage.getItem('createAg')) {
        let newAG = JSON.parse(sessionStorage.getItem('createAg'));
        newAG['ID'] = 'new_' + JSON.parse(sessionStorage.getItem('agreement_Index'));
        if (!newAG['inactive']) {
            newAG['inactive'] = "0";
        }
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

function getStorageData(storage_key, object_id) {
    return (JSON.parse(sessionStorage.getItem(storage_key)))[object_id];
}

function loadCourseDropdown() {
    const element = $('#restriction-course');
    console.log(element);
    const dropdownElements = JSON.parse(sessionStorage.getItem('courses'));
    for (let index = 0; index < dropdownElements.length; index++) {
        let cur = dropdownElements[index];
        element.append($('<option>', {
           text: cur['de'],
           value: cur['ID']
        }));
    }
}