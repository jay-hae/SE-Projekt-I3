function insertAgreementInformation(agreement) {
    let setAgreement = returnAgreement(agreement);
    setAgreement = setAgreement[0];
    console.log(setAgreement);
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