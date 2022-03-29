//dient

$(document).on('DOMContentLoaded', function() {
   $.ajax({
       method: "GET",
       url: "/loader/country"
   })
       .done((data) => insertCountries(data));
});

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