function addButtonFunctionality() {
    //set functionality for all abbrechen/X Buttons
    $(' .cancel').on('click', t => {
       console.log(t);
    });
}