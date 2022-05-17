function trackRestrictionChange(parent, value) {
    let key = parent['id'];
    let restriction_id = parent['parentElement'];
    setRestrictionChange(key, value, restriction_id);
}

function setRestrictionChange(key, value, id) {
    console.log(id);
    let updatedRestrictions = JSON.parse(sessionStorage.getItem('updatedRestrictions'));
    let filtered = [];
    updatedRestrictions.forEach(obj => obj[1]['restriction_ID']);
    console.log(updatedRestrictions);
}