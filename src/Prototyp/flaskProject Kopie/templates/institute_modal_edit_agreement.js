function trackAgreementChange() {
    $('#space_edit_agreement').on('change', (e) => { //create new sessionStorage object that contains all agreements where the input was changed
        updateChangedAgreement(sessionStorage.getItem('currentAgID'), e.target['id'], e.target.value);
    });
}

function updateChangedAgreement (agreementID, changedVal, value) {
    console.log(value, changedVal);
    let agreements = JSON.parse(sessionStorage.getItem('updatedAgreements')); //get duplicated array of all agreements, no matter if updated or not
    for (let iterator = 0; iterator < agreements.length; iterator++) {
        let agreement = agreements[iterator];
        if (Number(agreement.ID) === Number(agreementID)) {
            agreement[changedVal] = value;
            if (changedVal === "inactive") {
                let x = $('#inactive').prop('checked');
                if (x === true) {
                    agreement[changedVal] = "1";
                    // what to do when clicked on checkbox to set it
                }
                else {
                    // what to do when clicked to "uncheck" it
                    agreement[changedVal] = "0";
                }
            }
            break;
        }
    }
    sessionStorage.setItem('updatedAgreements', JSON.stringify(agreements));
    setChanged(agreementID);
}

function setChanged(agreementID) {
    if ('agArray' in sessionStorage) {
        let allAgreements = JSON.parse(sessionStorage.getItem('agArray'));
        if (!allAgreements.includes(agreementID)) {
        allAgreements.push(agreementID);
        sessionStorage.setItem('agArray', JSON.stringify(allAgreements));
        }
        return;
    }
    sessionStorage.setItem('agArray', JSON.stringify([agreementID]));
}