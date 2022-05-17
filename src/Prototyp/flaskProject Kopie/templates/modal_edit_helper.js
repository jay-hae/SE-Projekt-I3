function insertAgreementInformation(agreement) {
    let setAgreement = returnAgreement(agreement);
    setAgreement = setAgreement[0];
    sessionStorage.setItem('currentAgID',setAgreement['ID']);
    $('#mntr_dropdown').val(setAgreement.mentor_ID);
    $('#fclt_dropdown').val(setAgreement.faculty_ID);
    $('#date_signature').val(setAgreement.date_signature);
    $('#from_date').val(setAgreement.from_date); //möglicher Vorschlag -> alle leeren Felder mit "keine Angabe füllen" setAgreement.from_data.length > 0 ? setAgreement.from_data : "keine Angabe"
    $('#until_date').val(setAgreement.until_date);
    $('#inactive').prop('checked', Number(setAgreement.inactive) === Number(1));
    $('#in_num_mobility').val(setAgreement.in_num_mobility);
    $('#in_num_months').val(setAgreement.in_num_months);
    $('#out_num_mobility').val(setAgreement.out_num_mobility);
    $('#out_num_months').val(setAgreement.out_num_months);
    $('#notes').val(setAgreement.note);
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

function onSave() {

}

function insertRestriction() {
    $('#tbl_restriction').innerHTML = "";
    let restrictions = getRestrictions();
    restrictions.forEach(restriction => {
        restriction = restriction[1];
        //let row = "<tr> id='" + restriction['restriction_ID'] + "' <th><textarea id='course' onchange='trackRestrictionChange(this.parentElement, this.value)'> "+ restriction['course'] + "</textarea></th><th><textarea id='subject_area_code' onchange='trackRestrictionChange(this.parentElement, this.value, this.ID)'>" + restriction['subject_area_code'] + "</textarea></th><th><textarea id='incoming' onchange='trackRestrictionChange(this.parentElement, this.value, this.ID)'>" + restriction['incoming'] + "</textarea></th><th><textarea id='sub_num_mobility' onchange='trackRestrictionChange(this.parentElement, this.value, this.ID)'>"+ restriction['sub_num_mobility'] +"</textarea></th><th><textarea id='sub_num_months' onchange='trackRestrictionChange(this.parentElement, this.value, this.ID)'>"+restriction['sub_num_months']+"</textarea></th></tr>";
        let row = "<tr id='" + restriction['restriction_ID'] + "'><th id='course'><textarea onchange='trackRestrictionChange(this.parentElement, this.value)'> "+ restriction['course'] + "</textarea></th><th id='subject_area_code'><textarea onchange='trackRestrictionChange(this.parentElement, this.value)'>" + restriction['subject_area_code'] + "</textarea></th><th id='incoming'><textarea onchange='trackRestrictionChange(this.parentElement, this.value)'>" + restriction['incoming'] + "</textarea></th><th id='sub_num_mobility'><textarea onchange='trackRestrictionChange(this.parentElement, this.value)'>"+ restriction['sub_num_mobility'] +"</textarea></th><th id='sub_num_months'><textarea onchange='trackRestrictionChange(this.parentElement, this.value)'>"+restriction['sub_num_months']+"</textarea></th></tr>";
        $('#tbl_restriction').append(row);
    })
}

function getRestrictions() {
    let matchingAgreement = JSON.parse(sessionStorage.getItem('currentAgID'));
    let allRestrictions = JSON.parse(sessionStorage.getItem('currentRestrictions'));
    return allRestrictions.filter(obj => obj[0] === matchingAgreement);
}