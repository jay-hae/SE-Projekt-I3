
/** Wird durch den Speichernbutton bzw. instituteButtonEvents() aufgerufen
 *  Funktion speichert die durch den Nutzer in das Formular eingegebenen Restriktion-Informationen in der SessionStorage
 */
function newRestriction() {
    let restCounter = 0;
    if (!('newRestrictCounter' in sessionStorage)) {
        sessionStorage.setItem('newRestrictCounter', JSON.stringify(restCounter));
    }
    else {
        restCounter = JSON.parse(sessionStorage.getItem('newRestrictCounter'));
    }
    const new_rest = {};
    new_rest['mobility_agreement_ID'] = sessionStorage.getItem('currentAgID');
    const input = Array.from($('#form-add-rest').children('input, select'));
    input.forEach(child => {
        if (child.name === 'incoming') {
            new_rest[child.name] = $('#'+child.id).prop('checked') ? 1 : 0;
        }
        else {
            new_rest[child.name] = child.value;
        }
    });
    new_rest['restriction_ID'] = `new_${restCounter}`;
    const restrictions = 'newRestrictions' in sessionStorage ? JSON.parse(sessionStorage.getItem('newRestrictions')) : [];
    sessionStorage.setItem('newRestrictCounter', JSON.stringify(Number(restCounter)+1));
    restrictions.push(new_rest);
    insertRestriction([sessionStorage.getItem('currentAgID'), new_rest], restCounter);
    sessionStorage.setItem('newRestrictions', JSON.stringify(restrictions));
}

/** Funktoin wird durch newRestriction() ('Studiengang Speicher'-Button) und makeRowClickable() aufgerufen 
 * Wird beim Funktionsaufruf kein Parameter übergeben ist das object = false
 * Restriktions bezüglich des vom Nutzer gewählten Vertrags werden im Formular angezeigt.
 * Formular: 'Hochschule bearbeiten' > 'Zu Partnerschaftverträge wechseln' > einen Vertrag auswählen > 'Studiengänge'-Button > 'Studiengang speichern'
 */
function insertRestriction(object=false, restriction_index) {
    let restrictions = [];
    let style = 'none;';
    if (checkAdmin()) {
        style = 'block;';
    }
    if (object === false) {
        let tbl_rest = document.getElementById('tbl_restriction');
        tbl_rest.innerHTML = "";
        restrictions = getRestrictions();
    }
    else
        restrictions.push(object);
    const dropdown = $('<select class="form-select-sm" onchange="trackRestrictionChange(this.parentElement, this.value)">');
    dropdown.attr('id', 'exchange-type-dropdown');
    //maybe flip values -> wait for raphaels answer
    dropdown.append($('<option>', {
        value: '0',
        text: 'Outgoing'
    }));
    dropdown.append($('<option>', {
        value: '1',
        text: 'Incoming'
    }));
    restrictions.forEach((restriction, index) => {
        restriction = restriction[1];
        console.log(restriction)
        dropdown[0].id = `exchange-type-dropdown-${restriction_index}`;
        let course = restriction['course'] !== undefined ? restriction['course'] : returnCourse(restriction['course_ID']);
        let code = sanitizeAttributes(restriction['subject_area_code']);
        let num_mob = sanitizeAttributes(restriction['sub_num_mobility']);
        let num_months = sanitizeAttributes(restriction['sub_num_months']);
        let row = "<tr id='" + restriction['restriction_ID'] + "'><th id='course'><p> "+ course + "</p></th><th id='subject_area_code'><textarea onchange='trackRestrictionChange(this.parentElement, this.value)'>" + code + "</textarea></th><th id='incoming'>" + dropdown[0].outerHTML + "</th><th id='sub_num_mobility'><textarea style='width: 2rem' onchange='trackRestrictionChange(this.parentElement, this.value)'>"+ num_mob +"</textarea></th><th id='sub_num_months'><textarea onchange='trackRestrictionChange(this.parentElement, this.value)'>"+num_months+"</textarea></th><th><button class='btn btn-sm btn-light' onclick='deletion((this).parentElement.parentElement, `restriction`)' class='btn-delete' style='display: " + style + "'>Del</button></th></tr>";
        $('#tbl_restriction').append(row);
        document.getElementById(`exchange-type-dropdown-${restriction_index}`).value = restriction['incoming'];
    })
}

function sanitizeAttributes(attribute) {
    if (String(attribute).includes('undefined') || String(attribute).includes('null')) {
        return '';
    }
    return attribute;
}


/** Funktion wird durch insertRestriktion() aufgerufen.
 * Ihr wird das vom Nutzer veränderte Feld der aktuelle Zeile der Restriktions und deren Inhalt übergeben
 * Wenn ein Wert einer Restriktion verändert wurde, werden die geänderten Daten an die Funktion setRestrictionChange() gesendet
 */
function trackRestrictionChange(parent, value) {
    let key = parent['id'];
    let restriction_id = parent['parentElement'];
    setRestrictionChange(key, value, restriction_id['id']);
}

/** Funktion wird durch trackRestrictionChange() aufgerufen.
 *  Ihr werden der key (Bezeichnung) des veränderten Werts, der Wert selbst und die ID der betroffenen Restriktion übergeben.
 *  Diese Daten werden unter newRestrictions in der SessionStorage gespeichert.
 */
function setRestrictionChange(key, value, id) {
    let updatedRestrictions;
    let sessionKey;
    if (id.includes('new') === true) {
        updatedRestrictions = JSON.parse(sessionStorage.getItem('newRestrictions'));
        sessionKey = 'newRestrictions';
        updatedRestrictions.forEach(obj => {
            console.log(obj['restriction_ID']);
            if (obj['restriction_ID'] == id) {
                obj[key] = value;
            }
        });
    }
    else {
        updatedRestrictions = JSON.parse(sessionStorage.getItem('updatedRestrictions'));
        sessionKey = 'updatedRestrictions';
        updatedRestrictions.forEach(obj => {
            if (obj[1]['restriction_ID'] == id) {
                obj[1][key] = value;
            }
        });
    }
    sessionStorage.setItem(sessionKey, JSON.stringify(updatedRestrictions));
}

/** Funktion wird durch insertRestriction() aufgerufen
 *  Sie gibt alle Restriktions aus der sessionStorage zurück, die für das aktuell ausgewählte Agreement hinterlegt sind.
 */
function getRestrictions() {
    let matchingAgreement = sessionStorage.getItem('currentAgID');
    let allRestrictions = JSON.parse(sessionStorage.getItem('currentRestrictions'));
    return allRestrictions.filter(obj => Number(obj[0]) === Number(matchingAgreement));
}

function returnCourse(course_ID) {
    const courses = JSON.parse(sessionStorage.getItem('courses'));
    return courses.filter(course => Number(course.ID) === Number(course_ID))[0]['de'];
}