function trackRestrictionChange(parent, value) {
    let key = parent['id'];
    let restriction_id = parent['parentElement'];
    setRestrictionChange(key, value, restriction_id['id']);
}

function setRestrictionChange(key, value, id) {
    console.log(id);
    let updatedRestrictions = JSON.parse(sessionStorage.getItem('updatedRestrictions'));
    let filtered = [];
    updatedRestrictions.forEach(obj => {
        if (obj[1]['restriction_ID'] == id) {
            obj[1][key] = value;
        }
    });
    sessionStorage.setItem('updatedRestrictions', JSON.stringify(updatedRestrictions));
}