**For å kjøre applikasjonen**   
Last ned .zip filen av prosjektet eller kjør følgende kode i terminalen:  
git clone https://gitlab.stud.idi.ntnu.no/IT2810-H19/teams/team-4/project-4.git   
Navigér til prosjektmappen i terminal:  
$ cd project-4  

Navigér til front-end prosjeket i project-4-mappen:  
$ cd client  

$ expo start  

Åpne kamera på iOS eller Android, og scann QR-koden på nettsiden som dukker opp.  

**Obs:** Dersom internett er tregt og expo cli sliter med å kobe seg til serveren -  eksempelvis  hvis ingen filmer vises på home page, anbefales det å avslutte expo-cli appen og scanne QR-koden på nytt.  

**Innhold og funksjonalitet i brukergrensesnittet**  

Applikasjonen vår, MongoFlix er en søkbar katalog med 4759 ulike filmer hvor brukeren kan søke etter filmtitler, filtrere på kategorier, sortere etter dato, gi en stemme (opp eller ned) på en film, samt mulighet til å se en liste over alle filmer, sortert etter høyest antall stemmer som er relativt i forhold til IMDb sin rating. Applikasjonen er en mobil versjon av nettsiden vår, MongoFlix fra prosjekt 3.  
- En form for input av søk: Brukeren kan søke etter filmtittel  
- Listebasert presentasjon av søk hvor det er lagt opp til håndtering av store resultatsett med enten blaing i sider: Ved søk som gir resultat i databasen finner man resultatet ved å scrolle ned. Ved hvert søk vil det hentes maks 9 filmer om gangen. Dersom søket har flere enn 9 resultater, får man mulighet til å trykke på “load more” og deretter hente 9 flere filmer med samme søkeinput.  
- Muligheten for å se mer detaljer om hvert av objetene: Den listebaserte presentasjonen av søkene viser bilde av filmen. Brukeren har mulighet til å trykke på bildet til hver film og kunne se filmtittel, produksjonsår,  director, genre, actors, votes og en liten filmbeskrivelse.  
- Mulighet for sortering og filtrering av resultatsettet: Man kan filtrere ulike kategorier samt sortere ut i fra dato (nyest til eldst). Brukeren kan huke av for kun filtere/sortering med eller uten søketittel i tillegg. Dersom brukeren ikke skriver inn en filmtittel, men kun huker av for kategorier/sortering, vil alle filmer innenfor kategoriene vises. Når man trykker på “load more” dersom det er flere filmer i resultatet, vil det fhentes 9 flere filmer med samme søkekriteriene fra databasen.  
- Noe bruker/brukergenererte data som skal lagres på den mobile enheten: Brukeren kan stemme opp eller ned på hver film. Når brukeren først har stemt opp eller ned på en film, kan ikke brukeren stemme igjen på samme film. Dette sjekkes ved å lagre film-id og handlingen i asyncStorage. Stemmen som brukeren har gitt blir lagret i databasen, og viser oppdatert antall stemmer i en toast-boks som dukker opp når man har stemt.  

**Backend:**
Vi har benyttet den samme back-enden som i prosjekt 3.  
**MongoDB**  
- Databasen vår består av 4759 filmer med masse relevant informasjon til hver av filmene. All informasjon har blitt fetchet fra en annen API og lagret ved bruk at en python script.  
- Vi vil kreditere Brian Fritz fantastiske API [https://www.patreon.com/omdb]. All informajson eies av han vi vi har både betalt og benyttet oss av den.  
- MongoDB er en database teknologi som kategoriseres NOSQL som betyr at gjennfinning foregår ikke ved bruk av tunge og lange SQL Queries. Dette synes vi er lettere og en bedre løsning til dette prosjektet.  
- Denne databasen eksisterer på en server på NTNU som er koblet til en RESTAPI lagd ved bruk av Node Express.  

**Node Express**  
- Node Express er en teknolig som gjør det enkelt å lage en REST API. Et RESTAPI er meget relevant i dette prosjektet siden mye av logikken for å hente relevant data fra DB på NTNU vil bli håndtert enklet av RESTAPIet.  
- Hovedprogrammet i RestApiet kalles server og befinner seg i backend mappen. APIet har kun en route som sender deg videre etter "/".  
- Parameterne som brukes gjennom hele er APIet er:  

| **Parameter**  | **Forklaring** |
| ------------- | ------------- |
| sort  | Forteller sorteringmåten som er ønsket. Date/Vote og alfabetisk  |
| page  | Forteller nåværende side slik at dersom ønsket så blir de neste 9 elementete i resultat hentet  |
| title  | (Option) Dersom det blir brukt tekst for å søke. Ord med mellomrom blir splittet med + istedenfor  |
| genre  | (Option) Dersom det hukes av sjangere. Flere sjangere sorteres med +  |

**Muligheten for henting er:**  
- all: Alle sammen uten spesifikajsoner. Dette får du ved å søke ingenting  
- title: kun bruk at title  
- genre: kun bruk av sjanger(e) !(Denne er en unionsøk, det vil si at drama og action gir filmer som inneholder (Bare action, Bare drama eller begge deler))  
- title&genre: Søk med både sjanger og title  

**Bruk av teknologier:**  
**React native:**   
Vi har initialiser applikasjon vår med expo. Gjennom utviklingen har vi benyttet appen expo cli for å kjøre appen vår og teste funksjonaliteten samt utseende.  

**Komponenthierarki:**    
Vi har fire hovedkomponenter, som vi kaller for screens: HomeScreen, SearchScreen, PopularScreen og MovieScreen. Vi har ønsket å gjenbruke flest mulig av komponentene våre, slik at for eksempel MovieResultContainer er brukt flere steder.   

Den største forskjellen fra prosjekt 3 er at vi i dette prosjektet har en home page med ulike bilder, og har menyen vår nederst på siden. Komponentene våre har noe ulik navngiving i dette prosjektet slik at de egner seg bedre for en react-native-app, eksempelvis at vi har en mappe med screens. Ellers er komponenthierarkiet svært likt som react-webapplikasjonen.  

<br>
<img src="https://gitlab.stud.idi.ntnu.no/IT2810-H19/teams/team-4/project-4/raw/master/client/src/img/Component_hierarchy-Page-1.png" />
<br><br>
Figur 1: Illustrasjon av komponenthierarkiet i applikasjonen vår  
<br>



**React vs react native:**  

React native er et rammeverk for å bygge native komponenter. En stor forskjell fra en react webapplikasjon hvor react kompillerer komponentene til React-komponenter og konverterer fra React-DOM til HTML-DOM er at react native kompillerer komponentene til native-komponenter.   

React native letter på overgangen fra en nettside til en mobil plattform ved å opprettholde strukturen til en vanlig side. Native har løsningen tilsvarende feltene HTML og CSS fyller inneholder derfor sine egne komponenter som reflekterer UI-elementer i motsetning til ReactJS. ReactJS kalles for et biblotek siden det er noe som vanligvis implementeres inn i koden der det trengs, men React Native er heller slik at koderen trenger å benytte seg av komponentene allerede laget for å til slutt ha en fungerende applikasjon. Rammeverk inneholder også vanligvis flere andre biblioteker.  Vårt tilfelle har vi funnet det meget lett å konvertere koden vår til ReactJS til React Native komponenter siden den ligner på ReactJS koden vår.  

**Gjenbruk av kode og komponenter fra prosjekt 3**
- For å lese om gjenbruk av koden for håndtering av state: se seksjon “Redux”  
- Forskjell i styling fra react og react native: se seksjon “styling og layout”  
- Forskjell i enkelte tredjepartskomponenter: se seksjon “Tredjepartskomponenter” 

**AsyncStorage:**  
Vi hadde en form for tidligere erfaring med slike lokale lagringsmuligheter med local- og sessionStorage fra prosject 3. Samme som forrige gang, benyttet vi denne muligheten til å lagre informasjon lokalt for å hindre folk fra å stemme mer enn 1 gang på en film. Dette slik at ikke filmene kunne av en person bli nedstemt til 0 av en enkeltperson. Dette sånn at når en stemmer sendes det er request til DB. Når en får en OK-status tilbake, lagres det på den lokale enhetens AsynStorage, med film id-en som key, en string med verdi “voted”. Hver gang stemme knappene (tommel opp eller ned) blir trukket, vil den “get” verdien i Storage ved bruk av id. Dersom den allerede har verdien “voted”, vil den gi en Toast ( melding som dukker opp) for forteller deg statusen på stemmen din er voted og at du kan derfor ikke stemme lenger. Vi benyttet med andre ord denne lokale lagringen for å hindre fusk. Både kommandoen med getitem og setItem fungerte enkel og var meget nyttig for vårt prosjekt.  

**State management: Redux**  
Vi brukte Redux for håndtering av all state i prosjekt 3 og valgte derfor å bruke det i dette prosjeket også ettersom vi kunne kopiere inn nesten 100% av redux-koden vår fra forrige prosjekt som var svært trivielt. Alle actions og reducers er likt fra forrige prosjekt, men vi har lagt til håndtering av forrige tab for å kunne gå tilbake fra en movie-page til der brukeren opprinnelig var. I tillegg håndterer vi den nåværende filmen brukeren har trykket seg inn på, med state.  

Redux har en følgende flyt for managing state:  
<br>
<img src="https://gitlab.stud.idi.ntnu.no/IT2810-H19/teams/team-4/project-4/raw/master/client/src/img/data_flow.jpg" />
<br><br>
Figur 2: Redux data flow 
<br>


 
Redux storen vår som inneholder staten samt reducerne ligger i store.js   
Redux storen vår har følgende reducers som endrer staten vår ved brukerinteraktivitet:   
- expandReducer: Holder styr på om avansert søk vises (filter og sortering)   
- filterSortReducer: Oppdaterer alle filterkategoriene samt sortering etter dato som brukeren har huket av for   
- movieReducer: Søkeresultatet, inneholder en liste av filmobjekter samt antall filmer i søkeresultatet   
- pageReducer: For å holder styr på “load more” knappen, økes med én hver gang brukeren vil laste inn flere filmer, slik at vi vet hvilke filmer som har blitt fetchet   
- searchReducer: Oppdatert tittelsøk i innputformen   
- tabReducer: Holder styr på hvilken tab man er på, samt den forrige taben brukeren var på.

Alle disse reducerne har en tilsvarende action med ulike funksjoner ved brukerinteraktivitet. Eksempelvis når man trykker på taben “Show popular” i menyen vil funksjonen handleTabChange() i tabAction bli dispatchet til den respektive reduceren. Metoden handleTabChange returnerer kun en type slik at tabRedcuer vet hvordan den skal oppdatere staten til tab. Se figur 2 for en visuell fremstilling av flyten fra brukerinteraktivitet til en state i Redux er oppdatert.  

**Tredjepartskomponenter:**  
- Checkbox: Vi har brukt react-native-elements sine checkboxer siden denne komponenten støtter både Android og iOS. Logikken for lagring av verdi av en checkbox var noe ulik material-ui-komponenten vår i forrige React-prosjekt  
- SearchBar: Brukt react-native-elements sin komponent siden den så bra ut på de to største operatørene for mobil, og i tillegg hadde en logisk utforming for mobil.  
- Icons: Ikoner har egenskapen av å formidle informasjon på en kompakt måte. Dette er meget egnet når en designer et platform for en skjerm med begrenset plass. Ikonene blir brukt i footeren og i “mer” informasjons siden.  Dette er erstatningen til “tab”-ene fra forrige prosjekt og for å vise navigasjonsmuligheter (X-en på filmsiden)  
- Toaster: Det ble brukt for å vise at noe har skjedd når en stemmer. Dette ble brukt for å vise statusen av film samtidig til mulighetene om å stemme eller ikke. Toaster er egnet for dette siden dette er informasjon som trengs i et begrenset tidsperiode. Dette ble brukt i prosjekt 3 og var noe vi ønsket å ta med videre. Den viste seg også å gjøre jobben meget bra og enda bedre når plassen av skjermen er begrenset. I tillegg var den meget lett å endre på utseende, varighet og posisjon samt støttet både IOS og Android.  
- Axios: Ble brukt for å kommunisere med backend. NTNU serveren holder all informasjon av filmer. For å oppdatere informasjonen, var det viktig å sende en POST request til vår DB, og dette valgte vi å løse med hjelp av Axios. Dette er en enkel HTTP requester for node.js. Ved stemming for eller imot filmen, blir en post resquest sent.  
- ImageLoader: Etter å ha designet Appen med Image komponenter fant vi ut at noen av dem har “broken” url linker til bildene sine. Dette ble rendret som ingenting og var vanskelig å se nå de dukket opp. Dette ble løst ved å lage en “fallback” bilde der komponenten ImageLoader ble brukt. Denne fungerer akuratt som et image komponent, men med en fallback alternativ. Det vil si, dersom øselagt link, ville den ta i bruk fallback bilde. Dette synes vi var bra, siden i motsetning til prosjekt 3 var kun bildene det som ble vist (med tanke på plass) når det var resultater.  

**Styling og layout**  

<br>
<p float="left">
<img src="https://gitlab.stud.idi.ntnu.no/IT2810-H19/teams/team-4/project-4/raw/master/client/src/img/figma1.png" width="15%"/>
<img src="https://gitlab.stud.idi.ntnu.no/IT2810-H19/teams/team-4/project-4/raw/master/client/src/img/figma2.png" width="15%" />
<img src="https://gitlab.stud.idi.ntnu.no/IT2810-H19/teams/team-4/project-4/raw/master/client/src/img/figma3.png" width="15%" />
<img src="https://gitlab.stud.idi.ntnu.no/IT2810-H19/teams/team-4/project-4/raw/master/client/src/img/figma4.png" width="15%" />
</p>
<br><br>
Figur 3: Mock-up av applikasjonen vår  
<br><br>


Figur 3 viser noen bilder vi lagde i Figma før vi startet å kode. Det var for å ha et bra utgangspunkt for hvordan vi skulle designe layoten på best mulig måte. Vi er veldig fornøyd med resultatet i forhold til bildene over.   

Vi har jobbet mye med designet for å få det så brukervennlig og innbydende som mulig for mange forskjellige mobiler. Å style en React Native app var en større utfordring enn vi trodde siden vi bare kunne style med JavaScript og ikke CSS, men vi skjønte funksjonaliteten fort og er veldig fornøyd med resultatet. Vi implementerte for det meste StyleSheet.create for å definere visse stiler på samme plass. Vil nevne at vi brukte TouchableOpacity i stedet for Button siden det var mye enklere å style. Vi benyttet oss også av Scrollview for å kunne scrolle over infoen på skjermen så funksjonelt som mulig. Vi har også benyttet oss mye av stylingfunksjonene flexdirection, flexwrap og justifyContent for å plassere elementene så fint og oversiktlig som mulig.   

**End to end testing:**  

Vi har testet appen på iphone 6S, iphone X og Samsung Galaxy 9+. Den fungerer akkurat som den skal på både IOS og Android. Vi har testet at størrelsen og flyten til elementene vi har i appen skal passe til ulike skjermstørrelser. Etter å ha end to end testet på våre egne telefoner, i tillegg til noen andre typer Android telefoner, har vi ikke funnet noen åpenbare tekniske eller funksjonelle mangler.   

**Bruk av git, samarbeid og styring av utviklingsoppgaver med issues**  

**Brancher og commitmeldinger:**  
Vi har hatt en dev branch ut i fra master. For hver nye issue som er blitt gjort, har vi laget en egen issue-branch fra dev, og deretter merget med dev når issuen er ferdigstilt.  

**Commits:**  
Alle commits som er tilknyttet en issue starter alltid med issue-id’en.   
**Issues:**  
Da vi hadde planlagt prosjektet med hovedgjøremål for å lage applikasjonen, stykket vi opp arbeidsoppgavene ned til mindre issues som vi kontinuerlig har fordelt til medlemmene i gruppa. Vi har aktivt brukt kanban-boardet på gitLab for å holde styr på issuene. Issuene har vi flyttet fra to-do -> doing -> closed når issuen er ferdigstilt.  

**Kilder:**  
https://facebook.github.io/react-native/  

