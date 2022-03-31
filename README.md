<!--
# Vorlage Projektstruktur & OpenUP-Templates
Das Repository enthält die Vorlage einer Projektstruktur und Template-Dokumente im AsciiDoc-Format. Dies wird für die Bearbeitung der Belegarbeit in Software Engineering I und II benötigt. Im Detail wären dies:

- Projektstruktur anhand der Work Products im OpenUP
- Templates der benötigten OpenUP-Dokumente (AsciiDoc-Format)
- Vorlage für die Belegabgabe in SE I (AsciiDoc-Format)
-->

# Arbeitsweise und Hinweise des SE-Projekt-I3

Dieses Dokument enthält die allgemiene Arbeitsweise die seit SE II gilt, damit eine effektive Arbeitsweise 
etabliert und für mehr transparenz in der Projektarbeit gesorgt wird. Es ist daher wichtig, dass jedes Teammitglied sich an diese Abmachungen hält!
Weiter unten stehen die allgemiene Informationen zu dem genutzten Repository-Template aus SE I.

**Inhaltsverzeichnis**
- [Meetings](#meetings)
- [Protokolle](#protokolle)
- [Dokumentierung](#dokumentierung)
- [Iterationen](#iterationen)
- [Kritik an der Arbeitsorga](#kritik_an_der_arbeitsorganisation)
- [Dateistruktur](#dateistruktur)
- [Hilfe](#hilfe)
- [Unified Process - Templates](#unified-process---templates)
- [Hinweise zu AsciiDoc](#hinweise-zu-asciidoc)
- [Belegabgabe in SE I](#belegabgabe-in-se-i)
- [Lizenz](#lizenz)

## Meetings

### Agenda
**VOR** jedem Meeting sind folgende Dinge, in Bezug auf die Agenda, zu tun: 
* in dem Chat "offene-fragen-und-agenda" sind die gewünschten Gesprächsthemen zu posten 
* Gesprächswunsch template: \[Meeting Art(zB. Teammeeting)\] \[Datum (falls bekannt, siehe Chat "termine")\] TOP: (zB. Planung nächstes SI Meeting) 
* Vom Protokollverantwortlichen sind die Punkte aus dem Chat als TOP's (Topics) in das Protokoll zu übernehmen
    * von allen ist während des Meetings darauf zu achten, dass die Reihenfolge der TOP's eingehlaten wird bzw. eine Idee zu einem späteren TOP schriftlich (ohne Diskussion) festgehalten wird
    * neue, in dem Gespräch aufkommende TOP's sind  

### Teammeeting
Es folgt der generelle Ablauf eines Teammeetings:
* Begrüßung / Ankunft
* Besprechung des aktuellen Arbeitsstandes (Was wurde in den Subteams erreicht, was nicht)

### SI Meeting
Diese Meetings finden (vorerst) alle 2 Wochen statt.
* Grund: war letztes Semester auch so

### Protokolle
* Zu jedem Meeting ist ein Protokoll zu führen.
* VOR jedem Meeting wird ein Protokollverantwortlicher festgelegt. Dessen Aufgaben sind:
    * Archivierung des Protokolls in den GitHub Ordner protocol als txt (einfache Kopie des PentaPad's)
    * Gewärleistung, dass die Protokolle verständlich formuliert sind
    * die ToDos nach dem Meeting als Issue eintragen
    * dafür sorgen, dass das Protokoll nicht alleine geschreiben wird
* Was muss in das Protokoll:
    * Thema/Anlass (Teammeeting, SI Meeting, Meeting mit Herrn Ringel)
    * Datum
    * Protokollverantwortliche
    * Anwesende
    * besprochene Punkte (wenn möglich Hauptthemen durchnummerieren)

## Subteams
Ein Subteam ist eine Arbeitsgruppe die sich zur Bearbeitung eines Issues / Work Items zusammen gefunden hat.
Jedes Subteam macht sich einen Verantwortlichen aus, der dafür sorgt, dass der Fortschritt/Rückschlag/Änderung in der Datei fortschritt.adoc (im Root verzeichnis des Projekts auf Git) festgehlaten wird.
Beispiele finden sich in der Datei.

## Dokumentierung
Jeder muss sich bewusst sein, welche Dokumente in der [Dateistruktur](#dateistruktur), von seiner gerade zu erledigenden Aufgabe beeinflusst werden.
Ist dies nicht der Fall sind die Dokumente zu dem Themengebiet durch zu gehen und zu prüfen wo sich Änderungen in den Dokumenten ergeben könnten oder es ist im [OpenUP](https://www2.htw-dresden.de/~anke/openup/index.htm) unter "Work Products" nachzulesen was gemacht werden muss.

Die Dokumente sind spätestens zum Ende einer Arbeitsphase (nach abschluss der Aufgabe) zu updaten.

## Iteration
* eine Iteration dauert 1 Wochen (erstmal nur Vorschlag)
    * Grund: Regelmäßiges Treffen am Montag zu dem alle können, bessere Planbarkeit, kleinere Meilensteine zu jedem nächsten Montag
    * Dadurch kann Retropsektive jede Woche statt finden und sich die benötigte Zeit dafür insgesamt Verkürzen.

* Aufgaben für die jeweilige Iteration sind als Issue formuliert oder in project_management/Iterationen.xlsx notiert

## Kritik an der Arbeitsorganisation
Die hier verfassten Punkte können sich je nach der praktischen Erprobung ändern.
Dafür ist in der Retrospektive unter dem Punkt "Was hat uns zurück gehalten" eine Begründete Kritik anzubringen, welche dann diskutiert werden kann.

## Dateistruktur
**Alle Dateien die im Bezug zu dem Projekt stehen müssen in das Repository**

Die Projektstruktur im Verzeichnis **docs** orientiert sich an den <ins>Work Products</ins> im OpenUP und den für die <ins>Abgabe im SE 1 Beleg</ins> geforderten Dokumenten.

```
docs
├── architecture
│   └── architecture_notebook.adoc
├── deployment
├── development
│   └── design.adoc
├── environment
├── project_management
│   ├── iteration_plan_01.adoc
│   ├── project_plan.adoc
│   ├── risk_list.adoc
│   └── risks.csv
├── requirements
│   ├── domain_model.adoc
│   ├── glossary.adoc
│   ├── system-wide_requirements.adoc
│   ├── use-case_model.adoc
│   ├── use_case_01.inc.adoc
│   └── vision.adoc
└── test
    └── test_cases.adoc
```

## Hilfe
Wenn unklar ist wie man sich einer Aufgabe nähern soll gibt es hier ein paar Hinweise:
* wurde das Thema in der Vorlesung behandelt? (Vorlesungsscripte mit Schlagwort oder das Inhaltsverzeichnis durch suchen)
* gibt es Hinweise im [OpenUP](https://www2.htw-dresden.de/~anke/openup/index.htm) ?
* schon mal den Aufgabengegenstand gegooglet?
* Teammitglieder fragen oder Personen aus anderen Teams mit gleicher Rolle fragen
* Herrn Ringel, Herrn Anke oder Herrn Zirkelbach fragen

## Unified Process - Templates
Dieses Repositority enthält Vorlagen im AsciiDoc-Format für die Arbeit mit dem Open Unified Process. Die Vorlagen basieren auf den Templates der offiziellen OpenUP Dokumentation in der Version 1.5x aus dem Eclipse Process Framework (EPF) und wurden bis auf geringe inhaltliche / strukturelle Anpassungen lediglich auf deutsch übersetzt.

### Hinweise
* Im Unified Process gibt es eine "Supplementary Specification", die Anforderungen enthält, die nicht als Use Case Model spezifiziert werden können. Das sind z.B. nicht-funktionale und systemweite Anforderungen. Im OpenUP (und in diesem Repository) heißt dieses Dokument "System-wide Requirements".
* Falls Sie Fehler korrigieren oder Verbesserungen machen möchten, können Sie dies gern über einen _Pull Request_ tun.

### Referenzen
* [Eclipse Process Framework](https://www.eclipse.org/epf/downloads/configurations/pubconfig_downloads.php)
* [Open Unified Process 1.5 Dokumentation](https://www2.htw-dresden.de/~anke/openup/index.htm)

## Hinweise zu AsciiDoc
Die Datei _default-attributes.inc.adoc_ im **docs/\_includes** Verzeichnis enthält die gemeinsamen Dokumentenattribute für alle AsciiDoc-Dokumente. In jedem Dokument selbst können, nach dem include der Datei, entsprechend noch extra benötigte Attribute mit aufgenommen werden.

### Projektnamen definieren

In der _default-attributes.inc.adoc_ Datei ist am Anfang der **Projektname** definiert, welcher in jedem Dokument im Title verwendet wird. Ersetzen Sie hier bitte `<Projektname (T00)>` mit Ihrem Belegthema:

```
// Meta
:project-name: <Projektname (T00)>
```

### Bilder einbinden

In dem Dokumentenattribut `:imagesdir: images` ist das Standardverzeichnis für die Bilder festgelegt. Somit reicht es, in den jeweiligen Dokumenten, die Bilder ohne Angabe des **images** Verzeichnis einzubinden:

```
requirements
├── images
│   └── example.jpg
└── vision.adoc
```
```
// vision.adoc
image::example.jpg[Beispielbild]
```

## Belegabgabe in SE I

Im Verzeichnis **belegabgabe_se1** finden Sie die Vorlagedatei *se1_belegabgabe_t00.adoc*, welche alle Ihre erzeugten Dokumente für die Abgabe als PDF in <ins>ein</ins> Dokument bündelt.

(Nutzen Sie nicht die Projektvorlage **Projektstruktur_OpenUP-Templates**, kopieren sie sich die Vorlagedatei *se1_belegabgabe_t00.adoc* in Ihr Projektrepository)

Folgende Schritte sind für eine Belegabgabe durchzuführen:

1. Ändern Sie die Themennummer **t00** in der Vorlagedatei *se1_belegabgabe_t00.adoc* in Ihre Themennummer (t01, t02, ...).
3. Inhalt der Vorlagedatei anpassen:
    - Ist in Ihrem Projekt in der Datei _docs/\_includes/default-attributes.inc.adoc_ der Projektname im Attribut `:project-name:` nicht gesetzt bzw. nutzen Sie eine andere Struktur, können Sie im Dokumententitel nach dem `:` das `{project-name}` mit Ihrem Projektthema ersetzen:

        ```
        // --- 1. Projektthema -------------------------
        = SE I - Belegabgabe: {project-name}
        ```

    - Tragen Sie **alle** Teammitglieder als Autoren ein:

        ```
        // --- 2. Teammitglieder -----------------------
        Vorname Nachname <s00000@htw-dresden.de>; Vorname Nachname <s00000@htw-dresden.de>; ...
        ```
        > Lange Autorennamen (mehr als 3 Teile) in den Dokumentenattributen müssen mit einem `_` (Unterstrich) zu einer Gruppe von Vor- bzw. Nachnamen zusammengefasst werden. Es treten sonst Formatierungsfehler beim erzeugen der HTML- oder PDF-Dokumente auf. Der `_` (Unterstrich) wird im erzeugten Dokument nicht dargestellt.
        >
        > - `Vorname1_Vorname2 Nachname1_Nachname2 <mail@example.com>`
        > - `Vorname Nachname1_Nachname2_Nachname3 <mail@example.com>`

    - Tragen Sie als Versionsdatum Ihr **Abgabedatum** ein:

        ```
        // --- 3. Abgabedatum --------------------------
        01. Januar 2020
        ```

    - Passen Sie bei abweichender Projektstruktur die **include-Pfade** und **Dateinamen** zu den einzelnen Dateien (*path/to/file.adoc*) an bzw. erweitern Sie es für zusätzliche Dokumente:

        ```
        include::path/to/file.adoc[lines=1..1;4..-1,leveloffset=+1]
        ```
        > Beim `include` wird über die `lines=1..1;4..-1` Angabe jeweils die 1. und alles ab der 4. Zeile übernommen. Jedes Dokument ist eigenständig und somit werden über die Zeilen 2 und 3 die jeweiligen Authoren und das Versionsdatum nicht mit übernommen.

4. Erzeugen Sie das Abgabe-PDF _*se1_belegabgabe_t00.pdf*_ ([Hinweise aus dem Praktikum](https://www.informatik.htw-dresden.de/~zirkelba/praktika/se/arbeiten-mit-git-und-asciidoc/praktikumsaufgaben-teil-2.html#_2_generieren_des_ausgabeformates)):

    ```sh
    $ asciidoctor-pdf se1_belegabgabe_t00.adoc
    ```
    oder:
    ```sh
    $ asciidoctor -r asciidoctor-pdf -b pdf se1_belegabgabe_t00.adoc
    ```
5. Prüfen Sie, dass das korrekte **Projektthema**, alle **Teammitglieder** und das **Abgabedatum** auf dem Deckblatt stehen und dass ebefalls alle erforderlichen **Dokumente** mit ihren Inhalten enthalten sind.

6. Geben Sie das finale Abgabe-PDF _*se1_belegabgabe_t00.pdf*_ über den mitgeteilten Weg ab.


## Lizenz
Sämtliche Inhalte dieses Repositories unterliegen der [CC-BY-4.0](https://choosealicense.com/licenses/cc-by-4.0/) Lizenz.
