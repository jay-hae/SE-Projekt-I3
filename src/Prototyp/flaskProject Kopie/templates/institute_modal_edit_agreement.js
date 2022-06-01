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
            restrict = [];
            let agreementObjects = [];
            const addField = $('#addAgreements');
            $.each(data, (index, val) => {
                let cur_data = data[index];
                agreementObjects.push(insertAgreementInTable(cur_data, addField, "fromDatabase"));
            });
            sessionStorage.setItem('currentAgreements', JSON.stringify(agreementObjects));
            sessionStorage.setItem('updatedAgreements', JSON.stringify(agreementObjects));
            sessionStorage.setItem('currentRestrictions', JSON.stringify(restrict));
            sessionStorage.setItem('updatedRestrictions', JSON.stringify(restrict));
            makeRowClickable('agreement_rows', 'agreement');
            agreementFilter("Hochschulvereinbarung");
        });
}

function insertAgreementInTable(data, addField, addType) {
    let newRow = '';
    if (addType === 'fromDatabase') {
        createRestriction(data['agreement_ID'], data['course_restrictions']);
        newRow = "<tr style='display: none' id='" + data['agreement_ID'] + "' class='agreement_rows'><th style='display: none'>" + data['partnership_type'] + "</th><th> " + data['faculty'] + "</th><th>" + data['agreement_inactive'] + "</th><th> " + data['mentor_firstname'] + " " + data['mentor_lastname'] + "</th><th>" + data['notes'] + "</th></tr>";
    }
    else {
        let index = 0;
        if ('agreement_Index' in sessionStorage) {
            let index = JSON.parse(sessionStorage.getItem('agreement_Index')) + 1;
            sessionStorage.setItem('agreement_Index', JSON.stringify(index));
        }
        else {
            sessionStorage.setItem('agreement_Index', JSON.stringify(0));
        }
        let mentor_data = getStorageData("mentors", data['mentor_ID']); //provide mentor data to insert in new row; keys = firstname, lastname, title
        let faculty_data = getStorageData("faculties", data['faculty_ID']);
        //first + lastname for mentor and faculty name
        newRow = "<tr id='new_" + index + "' class='agreement_rows'><th style='display: none'>" + data['partnership_type'] + "</th><th> " + faculty_data + "</th><th>" + data['inactive'] + "</th><th> " + mentor_data['firstname'] + " " + mentor_data['lastname'] + "</th><th>" + data['notes'] + "</th></tr>";
    }
    addField.append(newRow);
    let agreementObj = createAgreementObject(data);
    agreementObj = checkInput(agreementObj);
    return agreementObj;
}

function functionalityAgreementFilter() {
    $('#vertragstyp-filter').on('change', (e) => {
         let ag = e.target.selectedOptions[0].innerText; //extract agreement type from chosen value
        agreementFilter(ag);
        sessionStorage.setItem('agreement_type', JSON.stringify(ag));
        //clearAgreementSpace();
        //sessionStorage.removeItem('currentAgID');
    });
}

function makeRowClickable(rowClass, type) {
    if (type === 'agreement') {
        $(' .'+rowClass).on('click', (e) => {
            let row = e.target.parentElement;
            let rowID = row['id']; //get ID of mob_agreement that was clicked
            insertAgreementInformation(rowID);
            insertRestriction();
            addNewAgreement();
        });
    }
}

function createAgreementObject(agreement) {
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
                    agreement[changedVal] = checkProp();
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
            agreement[changedVal] = checkProp();
        }
        else {
            agreement[changedVal] = value;
        }
        sessionStorage.setItem('createAg', JSON.stringify(agreement));
    }
}

function checkProp() {
    let x = $('#inactive').prop('checked');
    if (x === true) {
        return "1";
        // what to do when clicked on checkbox to set it
    } else {
        // what to do when clicked to "uncheck" it
        return "0";
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