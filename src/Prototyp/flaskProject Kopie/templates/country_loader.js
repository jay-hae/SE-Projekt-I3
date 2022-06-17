//dient


/** Wenn die Seite Country.html vollständig geladen wurde, wird ein GET-Request an app.py gesendet, um
 * Länderdaten aus der Datenbank abzufragen. Wenn die Daten geladen wurde, werden diese an die Funktion
 * insertCountries übergeben.
*/
$(document).on('DOMContentLoaded', function() {
   $.ajax({
       method: "GET",
       url: "/loader/country"
   })
       .done((data) => insertCountries(data));
});

/** Wenn der GET-Request die Länder-Informationen aus der Datenbank geladen hat, wird per HTML eine Tabelle mit den Inhalten erzeugt.
 *  
 * */
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