/** Button Event für den Button 'Bearbeiten' für die Hochschulen.
 *  Wird der Button gedrückt merkt sich die Funktion die ID der Zeile in der sich die Hochschule in der Tabelle befindet
 *  und ruft die Funktionenn loadAgreements() und loadModal() mit dieser ID auf.
 */
function addButtonEvent() {
    $(".edit_inst_btn").on('click', function () {
        let institute_row = $(this).parent().parent(); // speichere die Zeile in der sich der gedrückte Button befindet
        let first_column = institute_row[0].children; // extract <th> where id is inside
        let id = first_column[0].innerHTML; // get ID of institute
        loadAgreements(id);
        loadModal(id);
    });
    $('.del-institute').on('click', (e) => {
        let tgt = e.currentTarget;
        const id = tgt.parentElement.parentElement.children[0].innerHTML;
        deletion(id, "institute");
    });
}

/** Wird der Bearbeiten Button in der Zeile einer Hochschule gedrückt, werden die Daten des ausgewählten Instituts 
 * aus der Datenbank in das Modal 'Hochschule bearbeiten' geladen und angezeigt
 */ 
function loadModal(inst_id) {
    sessionStorage.setItem('currentInstitute', JSON.stringify(inst_id));
    // $('#edit_modal_anz').prop('checked', true); set checkbox true manually
    $('#vertragstyp-filter').val("1");
    $.ajax({
        data: {
            id: inst_id
        },
        type: 'POST',
        url: '/openModal'
    })
        //open modal after information got inserted into form
        .done(function (data) { //put data into modal
            let chosen_inst = data[0];
            $('#exampleModalToggleLabel')[0].textContent = chosen_inst['eng'];
            $('#edit_mod_country').val(chosen_inst['country']);
            $('#edit_modal_eng').val(chosen_inst['eng']);
            $('#edit_modal_local').val(chosen_inst['local']);
            $('#edit_modal_adr').val(chosen_inst['adr']);
            $('#edit_modal_ws').val(chosen_inst['website']);
            $('#edit_modal_ntzn').val(chosen_inst['notes']);
            if (chosen_inst['display'] === 1) {
                $('#edit_modal_anz').prop('checked', true);
            }
            $('#edit_modal_ec').val(chosen_inst['ec']);
            $('#edit_mod_dep').val(chosen_inst['dep']);
            $('#edit_mod_tel').val(chosen_inst['tel']);
            $('#edit_mod_mail').val(chosen_inst['mail']);
            $('#edit_mod_int_off_ws').val(chosen_inst['off_website']);
            $('#edit_mod_func').val(chosen_inst['function']);
            $('#edit_mod_gender').val(chosen_inst['gender']);
            $('#edit_mod_title').val(chosen_inst['title']);
            $('#edit_mod_vn').val(chosen_inst['firstname']);
            $('#edit_mod_nn').val(chosen_inst['lastname']);
            $('#edit_mod_ap_tel').val(chosen_inst['pers_tel']);
            $('#edit_mod_ap_mail').val(chosen_inst['pers_mail']);
            $('#modal_edit').toggle();
            chosen_inst = createObjectInstitute(chosen_inst);
            chosen_inst = checkInput(chosen_inst);
            sessionStorage.setItem('currentInstitute', JSON.stringify(chosen_inst));
            trackAgreementChange();
        });
}

/** Funktion erzeugt ein JSON-Object einer Hochschule mit den übergebenen Daten
 * 
*/
// HOCHSCHULINFO ANSICHT
function createObjectInstitute(institute) {
    return {
        ID: Number(institute['id']),
        country_ID: Number(institute['country']),
        eng: String(institute['eng']),
        local: String(institute['local']),
        address: String(institute['adr']),
        homepage: String(institute['website']),
        display: Number(institute['display']),
        erasmus_code: String(institute['ec']),
        note: String(institute['notes']),
        department: String(institute['dep']),
        phone: String(institute['tel']),
        email: String(institute['mail']),
        int_office_homepage: String(institute['off_website']),
        function: String(institute['function']),
        title: String(institute['title']),
        gender_ID: Number(institute['gender']),
        firstname: String(institute['firstname']),
        lastname: String(institute['lastname']),
        person_phone: String(institute['pers_tel']),
        person_email: String(institute['pers_mail'])
    }
}

/** Funktion löscht alle Einträge aus der aktuellen sessionStorage */
function clearSessionStorage() {
    try {
        sessionStorage.removeItem('currentInstitute');
        sessionStorage.removeItem('updatedInstitute');
        sessionStorage.removeItem('currentAgreements');
        sessionStorage.removeItem('updatedAgreements');
        sessionStorage.removeItem('currentAgID');
        sessionStorage.removeItem('agArray');
        sessionStorage.removeItem('updatedRestrictions');
        sessionStorage.removeItem('currentRestrictions');
        sessionStorage.removeItem('agreement_type');
        sessionStorage.removeItem('createAg');
        sessionStorage.removeItem('newAgreements');
        sessionStorage.removeItem('agreement_Index');
        sessionStorage.removeItem('newRestrictCounter');
        sessionStorage.removeItem('newRestrictions');
        //remove mob agreements (information und neu angelegte ag's)
    }

    catch (e) {
        console.log(e);
    }
}

/** Funktion aktualisiert die Hochschul-Daten entsprechend der Einträge in der sessionStorage wenn die Daten 
 * im Modal 'Hochschule bearbeiten' verändert wurden.
*/
function instituteObjectUpdated() {
    const update = {
        id: (JSON.parse(sessionStorage.getItem('currentInstitute'))).ID,
        country: $('#edit_mod_country').val(),
        eng: $('#edit_modal_eng').val(),
        local: $('#edit_modal_local').val(),
        adr: $('#edit_modal_adr').val(),
        website: $('#edit_modal_ws').val(),
        display: $('#edit_modal_anz').prop('checked'),
        ec: $('#edit_modal_ec').val(),
        notes: $('#edit_modal_ntzn').val(),
        dep: $('#edit_mod_dep').val(),
        tel: $('#edit_mod_tel').val(),
        mail: $('#edit_mod_mail').val(),
        off_website: $('#edit_mod_int_off_ws').val(),
        function: $('#edit_mod_func').val(),
        title: $('#edit_mod_title').val(),
        gender: $('#edit_mod_gender').val(),
        firstname: $('#edit_mod_vn').val(),
        lastname: $('#edit_mod_nn').val(),
        pers_tel: $('#edit_mod_ap_tel').val(),
        pers_mail: $('#edit_mod_ap_mail').val()
    }
    let newObj = createObjectInstitute(update);
    newObj = checkInput(newObj);
    sessionStorage.setItem('updatedInstitute', JSON.stringify(newObj));
}


/**  Prüft alle Einträge eines veränderten/neuen Hochschulobjektes auf 'null'-Werte und ändert diese
 * gegebenenfalls auf einen leeren String ''.
*/
function checkInput(object) {
    let keys = Object.keys(object);
    keys.forEach(key => {
        if (object[key] === "null") {
            object[key] = "";
        }
    });
    return object;
}



/**
 * Wenn im "Bearbeiten"-Modal der "Speichern"-Button gedrückt wird, wird diese Funktion ausgeführt.
 * Sie prüft, ob neue Einträge bezüglich Hochschule, Agreement oder Restriktion getätigt wurden. 
 * Falls dem so ist, werden die geänderten Daten über app.py an die Datenbank gesendet.
 * Für jede der drei Daten wird eine eigene URL in app.py angesteuert:
 * /changeData/updateInstitute = für geänderte Hochschulen
 * /changeData/updateAgreement = für geänderte Hochschulvereinabrungen
 * /changeData/updateRestriction = für geänderte Restriktionen
 */
function checkIfUpdated() {
    let oldArr = ['currentInstitute', 'currentAgreements', 'currentRestrictions'];
    let newArr = ['updatedInstitute', 'updatedAgreements', 'updatedRestrictions'];
    let types = ['institute', 'agreement', 'restriction'];
    let updatedAgs = [];
    let updatedRestrictions = [];
    let updatedInst;
    let instCheck = false;
    let agreeCheck = false;
    let restrictionCheck = false;
    for (let i=0; i < oldArr.length; i++) {
        instCheck = false;
        agreeCheck = false;
        restrictionCheck = false;
        let skip = false;
        let old = JSON.parse(sessionStorage.getItem(oldArr[i]));
        let newest = JSON.parse(sessionStorage.getItem(newArr[i]));
        if (newest == null) {
            skip = true;
        }
        if (old === newest) {
            skip = true;
        }
        if (!skip) {
            if (types[i] === 'institute'){
                updatedInst = createDifferenceArray(old, newest);
                instCheck = true;
            }
            else{
                if (types[i] === 'agreement') {
                    for (let j = 0; j < old.length; j++) {
                        updatedAgs.push(createDifferenceArray(old[j], newest[j]));
                }
                    agreeCheck = true;
                }
                else {
                    for (let j = 0; j < old.length; j++) {
                        updatedRestrictions.push(createDifferenceArray(old[j][1], newest[j][1]));
                }
                    restrictionCheck = true;
                }
            }
        }
        if(instCheck) {
        postData(updatedInst, '/changeData/updateInstitute');
        }
        if (agreeCheck) {
            let sendData = Array.from(updatedAgs.filter(obj => obj !== undefined));
            sendData.forEach(obj => postData(obj, '/changeData/updateAgreement'));
        }
        if (restrictionCheck) {
            let sendData = Array.from(updatedRestrictions.filter(obj => obj !== undefined));
            sendData.forEach(obj => postData(obj, '/changeData/updateRestriction'));
        }
    }
}

/**
 *  Wenn im "Bearbeiten"-Modal der "Speichern"-Button gedrückt wird, wird diese Funktion ausgeführt.
 *  Sie überprüft, ob es sich bei den eingegebenen Daten um neue Agreements und/oder Restriktions handelt.
 *  Falls ja, wird jeweils ein Alert und die Daten in der console ausgegeben.
 */
function checkIfNew() {
    if ('newAgreements' in sessionStorage) {
        if ('newRestrictions' in sessionStorage) {
            alert('new agreement & restriction was created');
            checkNewRestForNewAgreement();
            console.log('123');
            let newRestrictions = JSON.parse(sessionStorage.getItem('newRestrictions'));
            let newAgreements = JSON.parse(sessionStorage.getItem('newAgreements'));
            //newAgreements.forEach(obj => postData(obj, '/add/Agreement'));
            //newRestrictions.forEach(obj => postData(obj, '/add/Restriction'));
            console.log("R's mit bestehendem Vertrag: ", newRestrictions);
            console.log("Neue Ags + ihre Restriktionen: ", newAgreements);
        }
        else {
            alert('new agreement was created')
            let newAgreements = JSON.parse(sessionStorage.getItem('newAgreements'));
            //newAgreements.forEach(obj => postData(obj, '/add/Agreement'));
            console.log('neues Agreement', newAgreements);
        }
    }
    else if ('newRestrictions' in sessionStorage) {
        alert('new restriction was created');
        let rest = JSON.parse(sessionStorage.getItem('newRestrictions'));
        console.log("Neue R's bestehender Vertrag: ", rest);
    }
}

/**
 *  Falls innerhalb der Funktion checkIfNew() festgestellt wird, dass für ein neu angelegtes Agreement
 *  eine neue Restriktion angelegt werden soll, wird diese Funktion ausgeführt.
 *  Es werden alle Restriktionen in der aktuellen SessionStorage überprüft.
 *  Falls eine Restriktion zu einem neuen Mobilityagreement gehört, füge diese Restriktion dem Agreement hinzu (Aufruf: adddNewRestToNewAg() Funktion)
 *  Falls eine Restriktion nicht zu einem neuen Mobilityagreement gehören verbleiben sie in der SessionStorage
 *  gehören alle neuen Restriktion zu einem neuen Agreement wird das SessionStorage Item "newRestrictions" geleert
 */
function checkNewRestForNewAgreement() {
    let newRest = JSON.parse(sessionStorage.getItem('newRestrictions'));
    console.log('checkNewRestForAg:' ,newRest);
    let filteredRest = [];
    newRest.forEach(restriction => {
        if  ((restriction['mobility_agreement_ID']).includes('new')) {
            alert();
            addNewRestToNewAg(restriction);
        }
        else {
            filteredRest.push(restriction);
        }
    });
    console.log('filtered rest:', filteredRest);
    sessionStorage.setItem('newRestrictions', JSON.stringify(filteredRest));
}

/**
 * Diese Funktion wird aufgerufen, wenn eine neue Restriktion zu einem neuen Agreement hinzugefügt werden soll
 * Die übergebene Restriktion wird zu dem zugehörigen Mobilityagreement zugeordnet.
 * Es werden alle Agreements in der aktuellen SessioStorage überprüft.
 * Falls es bereits Restriktions für das Agreement gibt, wird die neue Restriktion hinzugefügt (push)
 * anderfalls ist die Restriktion das erste Objekt für diesen Parameter
 */
function addNewRestToNewAg(restrictionObj) {
    let agreements = JSON.parse(sessionStorage.getItem('newAgreements'));
    agreements.forEach(ag => {
        if (ag.ID === restrictionObj.mobility_agreement_ID) {
            alert();
            if (ag['restrictions']) {
                ag['restrictions'].push(restrictionObj);
            }
            else {
                ag['restrictions'] = [restrictionObj];
            }
        }
    });
    sessionStorage.setItem('newAgreements', JSON.stringify(agreements));
}


/**
 * Diese Funktion wird innerhalb der Funktion checkIfUpdated() aufgerufen.
 * Sie überprüft alle Keys der übergebenen Objekte auf unterschiede.
 * Falls mindestens einer der Keys des neuen Objekts sich von dem alten Objekt unterscheidet
 * werden dieses neuen Keys im Objekt newestAttr gespeichert und returned.
 */
function createDifferenceArray(oldObj, newObj) {
    let keys = Object.keys(oldObj);
    let newestAttr = {};
    let changed = false;
    keys.forEach(key => {
        if (oldObj[key] !== newObj[key]) {
            newestAttr[key] = newObj[key];
            changed = true;
        }
    });
    if (changed) {
        if (oldObj.hasOwnProperty('ID')) {
            newestAttr['ID'] = oldObj['ID'];
        }
        else {
            newestAttr['ID'] = oldObj['restriction_ID'];
        }
        return newestAttr;
    }
}

/**
 * Diese Funktion wird durch die Funktion checkIfUpdated() aufgerufen.
 * Ihr werden JSON Objekte und eine URL übergeben
 * Per Post-Request werden über app.py die neuen bzw. geänderten Daten an dei Datenbank gesendet.
 */
function postData(data, url) {
    $.ajax({
        data: data,
        method: 'POST',
        url: url
    })
        .done(answer => {
            return answer;
        });
}