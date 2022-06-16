function trackRestrictionChange(parent, value) {
    let key = parent['id'];
    let restriction_id = parent['parentElement'];
    setRestrictionChange(key, value, restriction_id['id']);
}

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
    console.log(updatedRestrictions);
    sessionStorage.setItem(sessionKey, JSON.stringify(updatedRestrictions));
}

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
    const input = Array.from($('#input-new-restriction').children('input, select'));
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
    insertRestriction([sessionStorage.getItem('currentAgID'), new_rest]);
    sessionStorage.setItem('newRestrictions', JSON.stringify(restrictions));
}