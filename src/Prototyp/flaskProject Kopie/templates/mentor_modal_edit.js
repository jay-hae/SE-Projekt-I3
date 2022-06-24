/** Funktion wird aufgerufen von mentorInsert()
 *  Dem 'Bearbeiten'-Button wird ein Buttonevent zugewiesen.
 *  Drückt Nutzer den Button, wird die Funktion loadMentor() mit der ID des gewählten Mentoren aufgerufen.
 *  Außerdem wird das Modal 'Mentor'-Bearbeiten aufgeklappt
 */
function editMentorButton() {
    $(" .modal_edit_mentor").on('click', function() {
       //load stored information out of sessionStorage into edit modal
       //get id
       let column = $(this).parent(); //Spalte <th> in der, der Button liegt
       let row = column.parent(); //ganze Zeile in der der gewählte Mentor steht
       let id = row.attr('id'); //Id des Mentoren der gewählten Zeile
       loadMentor(id);
       const guided_agreements = document.getElementById('guided-agreements');
       guided_agreements.innerHTML = "";
       // let obj = JSON.parse(sessionStorage.getItem(row.attr('id')));
       // richtiges Item aus Clientspeicher holen und in Javascript Objekt parsen
       // console.log(obj);
       $('#modal_edit_mentor').toggle();
    });
}

/** Funktion wird durch das ButtonEvent editMentorButton() ('Bearbeiten'-Button eines Mentoren) aufgerufen
 * Ein Post-Reqeuest wird über app.py an die Datenbank gesendet und die Daten des gewünschten Mentoren geladen.
 */

function loadMentor(mentor_id) {
    $.ajax({
        data: {
            id: mentor_id
        },
        type: 'POST',
        url: '/openMentorModal'
    })
    .done(function (data) { //put data into modal
        const agreements = data['agreements'];
        const chosen_mentor = (data['modal'])[0];
        $('#edit_mentor_id').val(chosen_mentor['id']);
        $('#edit_mentor_title').val(chosen_mentor['title']);
        $('#edit_mentor_firstname').val(chosen_mentor['firstname'])
        $('#edit_mentor_lastname').val(chosen_mentor['lastname']);
        $('#edit_mentor_homepage').val(chosen_mentor['website']);
        $('#edit_mentor_email').val(chosen_mentor['mail']);
        $('#edit_mentor_gender').val(chosen_mentor['gender']);
        $('#edit_mentor_active').prop('checked', setCheckbox(chosen_mentor['active']));
        $('#edit_men_fac').val(chosen_mentor['faculty']);
        agreements.forEach(agreement => {
            insertAgreement(agreement);
        });
    });
}

/** Funktion wird durch loadMentor() aufgerufen
 *  Falls der Parameter active 1 oder 0 ist wird die Checkbox im Bearbeiten-Modal auf checked oder nicht checked gesetzt
 */
function setCheckbox(value) {
    return value !== 1;
 }

/** Funktion wird durch loadMentor() aufgerufen
 *  Die aus der Datenbank geladenen Mentoren-Daten werden in das Bearbeiten-Modal für Mentoren geladen
 */
function insertAgreement(agreement){
    let object = `${agreement['faculty_ID']} | ${agreement['institute']} | ${agreement['partnership']}<br>`
    $('#guided-agreements').append(object);
}


/** Funktion ist ein Button-Event für den Speichern-Button im Mentoren-Bearbeiten-Modal
 *  Die bearbeiteten Daten aus dem Bearbeiten-Modal werden zu einem JSON-Object zusammengefasst
 *  und per Post-Request über app.py an die Datenbankgesendet 
 */
function saveMentorButton() {
    const mentor_id = $('#edit_mentor_id');
    const data = {};
    data['id'] = String(mentor_id['0']['value']);
    if ('changedMentor' in sessionStorage) {
        const changedData = JSON.parse(sessionStorage.getItem('changedMentor'));
        delete changedData['edit_mentor_active'];
        for (let key in changedData) {
            //extract column name for database from html element id
            let toSplit = String(key);
            toSplit = toSplit.split('_')[2];
            if (toSplit === 'gender' || toSplit === 'faculty') {
                data[`${toSplit}_ID`] = changedData[key];
            }
            else {
                data[toSplit] = changedData[key];
            }
        }
        data['active'] = $('#edit_mentor_active').prop('checked') ? 0 : 1;
        $.ajax({
            type: 'POST',
            url: '/changeData/mentor',
            data: data
        });
    }
}

