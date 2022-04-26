function insertAgreementInformation(agreement) {
    let setAgreement = returnAgreement(agreement);
    setAgreement = setAgreement[0];
    sessionStorage.setItem('currentAgID',setAgreement['ID']);
    $('#mntr_dropdown').val(setAgreement.mentor_ID);
    $('#fclt_dropdown').val(setAgreement.faculty_ID);
    $('#date_signed').val(setAgreement.date_signature);
    $('#valid_begin').val(setAgreement.from_date); //möglicher Vorschlag -> alle leeren Felder mit "keine Angabe füllen" setAgreement.from_data.length > 0 ? setAgreement.from_data : "keine Angabe"
    $('#valid_until').val(setAgreement.until_date);
    $('#ag_active').prop('checked', Number(setAgreement.inactive) === Number(1));
    $('#in_num_mob').val(setAgreement.in_num_mobility);
    $('#in_num_months').val(setAgreement.in_num_months);
    $('#out_num_mob').val(setAgreement.out_num_mobility);
    $('#out_num_months').val(setAgreement.out_num_months);
    $('#notes').val(setAgreement.note);
}

function returnAgreement(id) {
    const allAgreements = JSON.parse(sessionStorage.getItem('currentAgreements'));
    return allAgreements.filter(obj => Number(obj.ID) === Number(id));
}