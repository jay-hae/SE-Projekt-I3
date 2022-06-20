

// $(document).on('DOMContentLoaded', function() {
//    $.ajax({
//        method: "GET",
//        url: "/loader/country"
//    })
//        .done((data) => insertCountries(data));
// });

$(document).on('DOMContentLoaded', getCountries());


/** 
 * Wenn die Seite Country.html vollständig geladen wurde, wird ein GET-Request an app.py gesendet, um
 * Länderdaten aus der Datenbank abzufragen. Wenn die Daten geladen wurde, werden diese an die Funktion
 * insertCountries() übergeben.
 * See {@link insertCountries }
 * @type {{method: string, url: string}}
 * @return {void}
*/
function getCountries(){
    $.ajax({
        method: "GET",
        url: "/loader/country"
    })
        .done((data) => insertCountries(data));
 }



/**
 * Wenn der GET-Request die Länder-Informationen aus der Datenbank geladen hat, wird per HTML eine Tabelle mit den Inhalten erzeugt.
 * @param {{de: string, en: string, erasmus: int}} allCountries -- enthält jeweils die deutsche und englische Bezeichnung der Länder sowie die Information ob das Land zur Ersasmusvereinbarung gehört (1) oder nicht (0)
 * @return {void}
 */
function insertCountries(allCountries) {
    const countryTbl = $('#addCountries');
    allCountries.forEach(country => {
       //create new line in table with de, eng, erasmus
        let x = "";
        if (country['er'] === 0) {
            x = "Nein";
        }
        else {x = "Ja";}
        countryTbl.append("<tr><th class='country_name_de'>" + country['de'] + "</th><th class='country_name_eng'>"+ country['en'] + "</th><th>" + x + "</th></tr>");
    });
}