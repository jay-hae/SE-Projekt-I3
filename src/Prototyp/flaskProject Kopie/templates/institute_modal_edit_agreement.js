function trackAgreementChange() {
    $('#space_edit_agreement').on('change', (e) => { //create new sessionStorage object that contains all agreements where the input was changed
        updateChangedAgreement(sessionStorage.getItem('currentAgID'), e.target['id'], e.target.value);
    });
}

function updateChangedAgreement (agreementID, changedVal, value) {
    if (agreementID) {
        let agreements = JSON.parse(sessionStorage.getItem('updatedAgreements')); //get duplicated array of all agreements, no matter if updated or not
        for (let iterator = 0; iterator < agreements.length; iterator++) {
            let agreement = agreements[iterator];
            if (Number(agreement.ID) === Number(agreementID)) {
                agreement[changedVal] = value;
                if (changedVal === "inactive") {
                    checkProp(agreement, changedVal)
                }
                break;
            }
        }
        sessionStorage.setItem('updatedAgreements', JSON.stringify(agreements));
        setChanged(agreementID);
    }
    else {
        let agreement = JSON.parse(sessionStorage.getItem('createAg'));
        if (changedVal === "inactive") {
            alert('test')
            checkProp(agreement, changedVal);
        }
        else {
            agreement[changedVal] = value;
            sessionStorage.setItem('createAg', JSON.stringify(agreement));
        }
    }
}

function checkProp(agreement, changedVal) {
    let x = $('#inactive').prop('checked');
    if (x === true) {
        agreement[changedVal] = "1";
        // what to do when clicked on checkbox to set it
    } else {
        // what to do when clicked to "uncheck" it
        agreement[changedVal] = "0";
    }
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
    if (agreementID) {
        sessionStorage.setItem('agArray', JSON.stringify([agreementID]));
    }
}

function agreementFilter(agreementType) {
    let children = $('#addAgreements').children();
    for (let index = 0; index < children.length; index++) {
        if (children[index].children[0].innerText === agreementType) {
            children[index].style.display = '';
        }
        else {
            children[index].style.display = 'none';
        }
    }
}

function sendNewData() {
    let newAgreements = JSON.parse(sessionStorage.getItem('newAgreements'));
    newAgreements.forEach(ag => console.log(ag));
}