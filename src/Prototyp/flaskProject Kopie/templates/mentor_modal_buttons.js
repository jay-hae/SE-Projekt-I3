function addButtonFunctionality() {
    //set functionality for all abbrechen/X Buttons
    $(' .cancel').on('click', t => {
        //get modal of clicked button
       let parent = t['currentTarget']['parentElement']['parentElement']['parentElement']['parentElement'];
       parent.style.display = "none";
    });
}