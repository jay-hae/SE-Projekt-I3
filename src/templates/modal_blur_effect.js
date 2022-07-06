//es wird ein Event für jeden Button, der ein Modal öffnet/schließt, hinzugefügt welcher auf den Hintergrund einen Blur Effekt legt / diesen entfernt

function setBlur() {
    $('#Page_one').attr('style', 'filter: blur(3px)');
}

function unsetBlur() {
    $('#Page_one').attr('style', 'filter: ""');
}