function trackAgreementChange() {
    $('#space_edit_agreement').on('change', (e) => { //create new sessionStorage object that contains all agreements where the input was changed
        updateChangedAgreement(sessionStorage.getItem('currentAgID'), e.target['id'], e.target.value);
    });
}

function updateChangedAgreement (agreementID, changedVal, value) {
    let agreements = JSON.parse(sessionStorage.getItem('updatedAgreements')); //get duplicated array of all agreements, no matter if updated or not
    for (let iterator = 0; iterator < agreements.length; iterator++) {
        let agreement = agreements[iterator];
        if (Number(agreement.ID) === Number(agreementID)) {
            agreement[changedVal] = value;
            break;
        }
    }
    sessionStorage.setItem('updatedAgreements', JSON.stringify(agreements));
}