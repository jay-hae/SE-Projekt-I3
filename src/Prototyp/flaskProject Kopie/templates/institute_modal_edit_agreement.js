
/** 
 * Diese Funktion wird aufgerufen, wenn der "Bearbeiten"-Button der Hochschulen gedrückt wurde
 * Funktion sendet einen Post-Request an app.py mit der ID der gewünschte Hochschule.
 * Die Funktion erhält dann aus der Datenbank die Mobilityagreements zurück
*/
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
            ps_types = {};
            let agreementObjects = [];
            const addField = $('#addAgreements');
            $.each(data, (index, val) => {
                trackPartnershipType((data[index])['partnership_type']);
                let cur_data = data[index];
                agreementObjects.push(insertAgreementInTable(cur_data, addField, "fromDatabase"));
            });
            activeDeleteButton();
            showGuidedAgreements(ps_types);
            sessionStorage.setItem('currentAgreements', JSON.stringify(agreementObjects));
            sessionStorage.setItem('updatedAgreements', JSON.stringify(agreementObjects));
            sessionStorage.setItem('currentRestrictions', JSON.stringify(restrict));
            sessionStorage.setItem('updatedRestrictions', JSON.stringify(restrict));
            agreementFilter("Hochschulvereinbarung");
        });
}

/**
 * Diese Funktion wird in der Funktion loadAgreements() aufgerufen
 * Es wird mitgezählt wie viele Vertragstypen es für die jeweils aufgerufene Hochschule bereits gibt
 */
function trackPartnershipType(ps_type) {
    if (ps_types[ps_type]) {
        ps_types[ps_type] += 1;
        return null;
    }
    ps_types[ps_type] = 1;
}

/**
 *  Diese Funktion wird in der Funktion loadAgreements() aufgerufen
 *  Ihr wird die Anzahl der für die Hochschule bereits vorhandenen Agreement Types übergeben
 *  Im Modal "Bearbeiten" der Hochschulen wird direkt unter der Überschrift "Verträge" die Anzahl der Verträge als "Hochschulpartnerschaften: " angezeigt
 */
function showGuidedAgreements(agreements_object) {
    const div_types = document.getElementById('show-all-ps-types');
    div_types.innerHTML = "";
    for (const type in agreements_object) {
        $('#show-all-ps-types').append($('<div>', {
            text: `${type}: ${agreements_object[type]}`
        }));
    }
}

/** Die in loadAgreements aus der Datenbank geladenen Mobility Agreements werden innerhalb der Tabelle 
 * im Modal 'Hochschule bearbeiten' bereitgestellt.
 * 
*/
function insertAgreementInTable(data, addField, addType) {
    let newRow = '';
    let id = '';
    let style = 'none;';
    if (checkAdmin()) {
        style = 'block;';
    }
    const activeState = String(data['agreement_inactive']) === '0' ? 'Ja' : 'Nein';
    if (addType === 'fromDatabase') {
        createRestriction(data['agreement_ID'], data['course_restrictions']);
        id = data['agreement_ID'];
        let notes = data['notes'] !== null ? data['notes'] : '';
        newRow = "<tr style='display: none' id='" + data['agreement_ID'] + "' class='agreement_rows'><th style='display: none'>" + data['partnership_type'] + "</th><th> " + data['faculty'] + "</th><th>" + activeState + "</th><th> " + data['mentor_firstname'] + " " + data['mentor_lastname'] + "</th><th>" + notes + "</th><th><button class='btn btn-sm btn-light delete-agreement btn-delete' style='display: " + style + "'>Del</button></th></tr>";
    }
    else {
        let index = 0;
        if ('agreement_Index' in sessionStorage) {
            index = JSON.parse(sessionStorage.getItem('agreement_Index')) + 1;
            sessionStorage.setItem('agreement_Index', JSON.stringify(index));
        }
        else {
            sessionStorage.setItem('agreement_Index', JSON.stringify(0));
        }
        let mentor_data = getStorageData("mentors", data['mentor_ID']); //provide mentor data to insert in new row; keys = firstname, lastname, title
        //first + lastname for mentor and faculty name
        let status = "";
        data['inactive'] = data['inactive'] ? data['inactive'] : '0';
        status = String(data['inactive']) === '0' ? 'Ja' : 'Nein';
        id = 'new_' + index;
        let notes = data['notes'] ? data['notes'] : '';
        newRow = "<tr id='new_" + index + "' class='agreement_rows'><th style='display: none'>" + data['partnership_type'] + "</th><th> " + data['faculty_ID'] + "</th><th>" + status + "</th><th> " + mentor_data['firstname'] + " " + mentor_data['lastname'] + "</th><th>" + notes + "</th><th><button onclick='deletion((this).parentElement.parentElement, `agreement`)' class='btn btn-sm btn-light delete-agreement btn-delete' style='display: " + style +"'>Del</button></th></tr>";
    }
    addField.append(newRow);
    makeRowClickable(id, "agreement");
    let agreementObj = createAgreementObject(data);
    agreementObj = checkInput(agreementObj);
    return agreementObj;
}

/** Funktion wird in Funktion insertAgreementInTable() aufgerufen und erzeugt ein Vertragstyp entsprechend der übergebenen Daten
*/
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

/** Erzeugen einer Restriktion für ein bestimmtes Agreement/Vertragstyp (ag_ID) anhand der übergebenen restrictions.
*/
function createRestriction(ag_ID, restrictions) {
    if (restrictions.length > 0) {
        restrictions.forEach(obj => restrict.push([ag_ID, obj]));
    }
}

/** Speichert die Auswahl des Nutzers im Filter-Dropdown der Verträge im Modal 'Hochschule bearbeiten' und
 * ruft die Funktion agreementFilter mit diesem Wert auf. 
 */
function functionalityAgreementFilter() {
    $('#vertragstyp-filter').on('change', (e) => {
         let ag = e.target.selectedOptions[0].innerText; //extract agreement type from chosen value
        agreementFilter(ag);
        sessionStorage.setItem('agreement_type', JSON.stringify(ag));
        //clearAgreementSpace();
        //sessionStorage.removeItem('currentAgID');
    });
}

/** Funktion wird die Auswahl des Nutzers aus dem Filter Vertragstyp im Modal 'Hochschule bearbeiten' übergeben.
 * Die Verträge in der Tabelle werden nur dann angezeigt wenn sie der Auswahl im Filter 'Vertragstyp' entsprechen.
*/
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

/** Jede Zeile in der Tabelle der Vertragstypen im Modal 'Partnerhochschulen bearbeiten' wird mit einem Event-Listener versehen,
 * sodass diese angeklickt werden können. Klickt der Nutzer eine Zeile an wird die ID an die Funktion 
 * insertAgreementInformation() übergeben sowie die Funktionen insertRestriction() und addNewAgreement() aufgerufen.
 * 
*/
function makeRowClickable(rowID, type) {    //for every single row, easier to create eventListener for new added agreement
    if (type === 'agreement') {
        $(' #'+rowID).on('click', (e) => {
            let row = e.target.parentElement;
            let rowID = row['id']; //get ID of mob_agreement that was clicked
            insertAgreementInformation(rowID);
            insertRestriction();
            addNewAgreement();
        });
    }
}


/** Erzeugt ein neues Session Storage Objekt sobald im Formular unter dem Button 'Agreement speichern' etwas geändert wird.
 * Funktion ruft außerdem updateChangedAgreement() auf und übergibt dieser die ID des aktuellen Agreements und die ID des Textfeldes welches verändert wurde (Bsp. Mentor, Fakutltät,etc.) sowie den Wert der eingegeben wurde.
 */

function trackAgreementChange() {
    $('#space_edit_agreement').on('change', (e) => { //create new sessionStorage object that contains all agreements where the input was changed
        let agreement_ID = sessionStorage.getItem('currentAgID');
        updateChangedAgreement(agreement_ID, e.target['id'], e.target.value);
    });
}

/** Wird durch trackAgreementChange aufgerufen und erhält die ID des aktuellen Agreements und die ID des Textfeldes welches verändert wurde (Bsp. Mentor, Fakutltät,etc.) sowie den Wert der eingegeben wurde.
 * Wenn es eine agreementID gibt, werden die Werte dieser entsprechend der Nutzereingabe verändert
 * anderfalls wird eine neue Session Storage erzeugt.
*/
function updateChangedAgreement (agreementID, changedVal, value) {
    if (agreementID) {
        let agreements = agreementID.includes('new') ? JSON.parse(sessionStorage.getItem('newAgreements')): JSON.parse(sessionStorage.getItem('updatedAgreements')); //get duplicated array of all agreements, no matter if updated or not
        for (let iterator = 0; iterator < agreements.length; iterator++) {
            let agreement = agreements[iterator];
            if (agreement.ID == agreementID) {
                agreement[changedVal] = value;
                if (changedVal === "inactive") {
                    agreement[changedVal] = checkProp();
                }
                break;
            }
        }
        agreementID.includes('new') ? sessionStorage.setItem('newAgreements', JSON.stringify(agreements)) : sessionStorage.setItem('updatedAgreements', JSON.stringify(agreements));
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

/** Funktion prüft, ob Checkbox 'Agreement Inaktiv?' ausgewählt wurde oder nicht.
 * Gibt dementsprechend 1 oder 0 zurück.
 * 
 */
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

/** Funktion wird durch updateChangedAgreement() aufgerufen. Ihr wird die ID des aktuell durch den Nutzer bearbeiteten Agreements übergeben.
 * Wenn 'agArray' bereits im sessionStorage existiert wird überprüft, ob die Agreement ID bereits in sessionStorage vorhanden ist
 * Falls die ID noch nicht existiert, wird sie der sessionStorage hinzugefügt.
 * Wenn es kein 'agArray' in der sessionStorage gibt wird dieses mit der Agreement ID erzeugt.
*/
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

/** Wird im Modal 'Partnerhochschulen bearbeiten' Ansicht 'Partnerschaftsverträge' einer der Verträge in der Tabelle
 *  angeklickt, werden die Daten dieses Vertrages in das Formular geladen.
 * Die Daten werden über die Funktion returnAgreement() geladen.
 */
function insertAgreementInformation(agreement) {
    let setAgreement = returnAgreement(agreement);
    setAgreement = (setAgreement['object'])[setAgreement['index']];
    sessionStorage.setItem('currentAgID',setAgreement['ID']);
    console.log(setAgreement.notes);
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
    $('#notes').val(setAgreement.notes);
}

/** Wird durch die Funktion insertAgreementInformation() aufgerufen
 *  Dieser Funktion wird die ID des ausgewählten Agreements übergeben.
 *  Sie stellt der Funktion insertAgreementInformation() die Daten des Agreements bereit. 
 */
function returnAgreement(id) {  //get updated information if updated, otherwise use the data taken from database
    
    // Falls es sich um ein in dieser Session bearbeitets Agreement handelt
    if ("agArray" in sessionStorage) {
        let arr = JSON.parse(sessionStorage.getItem("agArray"));
        if (arr.includes(id) && !id.includes('new')) {
            let updatedAg = JSON.parse(sessionStorage.getItem("updatedAgreements"));
            return {'object': updatedAg.filter(obj => Number(obj.ID) === Number(id)), 'index': 0};
        }
    }
    //Falls es sich um ein in dieser Session neu angelegtes Agreement handelt
    if (id.includes("new")) {
        let extract = (id.split('_'))[1]; //get "index" of new agreement of current institute -> get agreement data from sessionStorage
        let newAgreement = JSON.parse(sessionStorage.getItem('newAgreements'));
        return {'object': newAgreement, 'index': extract};
    }
    //Falls es sich um ein bereits existierendes Agreement handelt
    else {
        const allAgreements = JSON.parse(sessionStorage.getItem('currentAgreements')); //current Agreements sind alle in der Datenbank existierenden Agreements
        return {'object': allAgreements.filter(obj => Number(obj.ID) === Number(id)), 'index': 0};
    }
}

/** Wird durch instituteButtonEvents() ausgelöst.
 * Leert das Formular im Modal 'Partnerhochschulen bearbeiten' Ansicht 'Partnerschaftsverträge'
*/
function clearAgreementSpace() {
    let kids = Array.from(document.getElementsByClassName('agreementInformation'));
    kids.forEach(kid => {
       $(kid).val("");
    });
}

/** Wird durch instituteButtonEvents() (Button 'Vertrag Speichern') und makeRowClickable() aufgerufen
 *  Speichern der durch den Nutzer ins Formular eingetragenen Daten eines neuen Vertrags in SessionStorage.
 *  Formular: 'Hochschule bearbeiten' > 'Partnerschaftsverträgeansicht' > 'neuen Vertrag anlegen'
 */
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

/** Funktion wird durch ButtonEvent ('Neuen Vertrag anlegen'-Button)
 *  Bereitet das Formular zur Eingabe der Daten des neuen Vertrags vor
 *  Erzeugt ein JSON-Object für den neu angelegten Vertrag und speichert die Daten in SessionStorage
 */
function createNewAgreementObj() {
    let ag_val = $('#vertragstyp-filter').val();
    let inst_id = JSON.parse(sessionStorage.getItem('currentInstitute'));
    let agreement = {};
    agreement['partnership_type_ID'] = ag_val;
    agreement['institute_ID'] = inst_id['ID'];
    sessionStorage.setItem('createAg', JSON.stringify(agreement));
}

