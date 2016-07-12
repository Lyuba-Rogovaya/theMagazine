# theMagazine
a portfolio project: SPA  online magazine (state: under development)

theMagazine is an online magazine, where one can read articles grouped/filtered by publication date, author, popularity rate and rubric. The website is built of independent modules keeping in mind separation of the views controllers and data as per MVC framework. The project was inspired by the book “Single Page Web Applications - JavaScript end-to-end.” by M. Mikowsi, J. Powell.

Currently supported features: 
- Browser support: latest versions of IE, Chrome, Firefox;
- Modular, MCV-based architecture;
- Client side: JQuery, CSS and HTML, AJAX, ES6 Promises, Mustache.js
- Back-end: NodeJS, MongoDB;
- Basic handling of 404 and server errors;

Featured that will be added and/or improved in the nearest future:
- Add support for earlier browsers;
- Improve style (including adaptive design and printed pages);
- Clean up and improve client and server-side scripts (to comply with best practices);
- Enhance UI, add more UI components (e.g. back-to-top button);
- Extend functionality (e.g. enable readers to rate articles)

To run the project you need: 
- > git clone https://github.com/Lyuba-Rogovaya/theMagazine
- > cd theMagazine
- > mongoimport --db theMagazine --collection articles --file articles.json --jsonArray // upload the database of articles
- > npm install
- > npm start

Prerequisites
A running instance of MongoDB (> mongod ).

