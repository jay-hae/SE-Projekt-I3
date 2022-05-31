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

function getMentorData(mentor_ID) {
    return (JSON.parse(sessionStorage.getItem('mentors')))[mentor_ID];
}