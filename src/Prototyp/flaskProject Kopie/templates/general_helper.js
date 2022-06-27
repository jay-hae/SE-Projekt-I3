function setMandatoryInput() {
    const elements = $('.mandatory');
    elements.append('*');
    elements.attr('style', 'color: red;');
}