# TextNotes

## Introduzione

Il progetto consiste in una full-stack web app per la gestione di note testuali. L'applicazione fornisce le funzionalità base per la gestione di note di testo, come:

1. Creazione di una nota
2. Eliminazione di una nota
3. Modifica di una nota esistente
4. Ricerca di una specifica nota mediante titolo
5. Visualizzazione di tutte le note
6. Visualizzazione nel dettaglio di una singola nota

All'avvio dell'applicazione, l'utente visualizza una schermata contenente la lista di tutte le sue note (se presenti), oppure una schermata bianca con un'intestazione che contiene i tasti per l'aggiunta (tasto '+') e per la ricerca di una nota.

Cliccando sul tasto '+', l'utente naviga verso una nuova schermata che consente l'inserimento degli appunti da salvare.

Una volta compilati i due campi, comparirà il tasto "save" in basso a destra per il salvataggio della nota. Dopo aver completato il salvataggio, l'utente verrà indirizzato nella schermata principale, in cui è possibile visualizzare la nuova nota nella propria lista di appunti.

L'intestazione consente di effettuare una ricerca mediante il titolo di una nota all'interno della lista per facilitare il recupero dei propri appunti.

Per visualizzare l'intero contenuto di una nota, basta selezionare con il mouse una di esse e l'app naviga in una schermata che consente sia di visualizzare il contenuto, sia di effettuare modifiche agli appunti.

## Tecnologie

Il progetto è composto da:

1. Un web server implementato in Spring Boot (Java)
2. Una web app client implementata in React (TypeScript)
3. Un database PostgreSQL (mediante un'immagine Docker)

All'interno del repository inoltre è possibile trovare:
1. Dockerfile per la creazione di un'immagine Docker del server all'interno della directory `TestWebServerContainer`
2. Dockerfile per la creazione di un'immagine Docker del client all'interno della directory `TextNotesClient`
3. Manifesto OpenAPI utilizzato per l'implementazione della comunicazione fra client e server mediante API REST all'interno della directory `ManifestOpenApi`

### Server

Il web server è stato implementato utilizzando i principali starter offerti da Spring Boot, fra questi sono presenti:

1. `spring-boot-starter-web`: necessario per l'implementazione di un web server in Spring Boot
2. `postgresql`: specifica il database utilizzato e consente la comunicazione con esso
3. `lombok`: fornisce le annotazioni utilizzate per specificare quale servizio offrono le diverse componenti del server come, ad esempio, controller, service, repository
4. `spring-boot-starter-data-jpa`: utilizzato per l'implementazione delle funzionalità di salvataggio e recupero dei dati all'interno del database

Le componenti sono state strutturate utilizzando il Model View Controller (MVC) design pattern. All'interno della directory `TextNotes/src/main/java` sono presenti diverse componenti, fra queste quelle che implementano il MVC design pattern sono:

1. `MyController`: si occupa di intercettare le richieste provenienti dalla rete. Per ogni richiesta vengono utilizzati i servizi offerti dal componente service.
2. `NotesService`: si occupa di effettuare l'elaborazione delle richieste utilizzando il componente repository per leggere e scrivere i dati nel database.
3. `MyRepo`: è un'interfaccia che estende l'interfaccia `JpaRepository`, si occupa quindi di fornire le operazioni di lettura, scrittura e aggiornamento dei dati del database al service.

### Client

L'applicazione client è stata implementata in React utilizzando come linguaggio TypeScript e come tool di build Vite. Le componenti necessarie alla comunicazione con il server sono state implementate a partire da un manifest OpenAPI v3 presente all'interno della directory `ManifestOpenApi`. Il client prodotto si trova all'interno della directory `out`, contenuta in `TextNotes/TextNotesClient/text-notes-client`.

I componenti grafici utilizzati per l'implementazione sono quelli forniti dalla libreria open-source di React Material UI. La struttura del codice dell'app client segue quella di una classica React App. All'interno della cartella source (`TextNotes/TextNotesClient/text-notes-client/src`), oltre ai file di default, sono presenti:

1. `myComponents`: directory contenente i moduli utilizzati
2. `myInterface`: directory contenente le interfacce che definiscono i tipi di dato utilizzati durante l'esecuzione dell'app
3. `style`: directory contenente i file .css usati per la personalizzazione dei componenti grafici

### Note Aggiuntive

Si tratta di una semplice app giocattolo con molte limitazioni. Fra queste andrebbe aggiunta, all'interno del client, l'interazione grafica con l'utente nel caso in cui un'operazione non andasse a buon fine. Un esempio è quando viene salvata una nuova nota senza titolo o contenuto: in tal caso l'operazione non viene completata ma non viene segnalato all'utente cosa è successo. Si può solo vedere che la nota non è stata aggiunta alla lista. Inoltre, potrebbero essere implementate ulteriori operazioni come, ad esempio, la possibilità di allegare immagini alle note, oppure aggiungere un sistema di preferenze delle note.

# Istruzioni Complete Per Eseguire L'app Senza Container Docker Per Client E Server Da Terminale Wsl_2 (Linux)

## Tool necessari

1. Docker version 27.2.0, build 3ab4256
2. Maven: Apache Maven 3.8.7 Java version: 21.0.5, vendor: Ubuntu
3. java-21-openjdk-amd64
4. Node: v18.19.1 

## DataBase

1. Scaricare l'immagine docker per il database postgrSQL: 
docker pull postgres:latest

2. Creazione del volume per il database postgrSQL: 
docker volume create postgresqldata

3. Creare una network:
docker network create mynetwork

4. Eseguire il container per il database:
docker run -d --name postgres --network mynetwork -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -p 5432:5432 -v postgresqldata:/var/lib/postgresql/data postgres:latest

## Esecuzione Server 

1. Posizionarsi nella directory del progetto: 
cd `TextNotes/TextNotes`

2. Compilare il progetto:
mvn clean install

3. Esecuire il server:
mvn spring-boot:run

## Esecuzione Client

1. Posizionarsi nella directory del progetto: 
cd `TextNotes/TextNotesClient/text-notes-client/`

2. Eeguire il client
npm run dev

## Apertura App Da Browser
http://localhost:5174

# Istruzioni Complete Per Eseguire L'app Con Container Docker Per Client E Server Da Terminale Wsl_2 (Linux)

## DataBase

1. Scaricare l'immagine docker per il database postgrSQL: 
docker pull postgres:latest

2. Creazione del volume per il database postgrSQL: 
docker volume create postgresqldata

3. Creare una network:
docker network create mynetwork

4. Eseguire il container per il database:
docker run -d --name postgres --network mynetwork -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -p 5432:5432 -v postgresqldata:/var/lib/postgresql/data postgres:latest


## Esecuzione Server

1. Posizionarsi nella directory contenente il dockerfile:
cd `TextNotes/TestWebServerContainer`

2. Crea l'immagine docker del server:
docker build -t textnotes-app .

3. Eseguire il container docker del server:
docker run --name textnotes-app --rm -p 8080:8080 --network mynetwork -e SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/postgres textnotes-app

## Esecuzione Client

1. Posizionarsi nella directory contenente il dockerfile:
cd `TextNotes/TextNotesClient`

2. Crea l'immagine docker del client:
docker build -t client-app .

3. Eseguire il container del client:
docker run -d --name client-app-note --network mynetwork -p 5174:5174 client-app

## Apertura App Da Browser
http://localhost:5174