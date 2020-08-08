## FULL-STACK PROJECT - COVIDsimple - 

### OVERVIEW 

* Our web-app will provide tools for COVID-19 data visualization, comparisons, and news.

* Provide graphic representations to make COVID data more accessible.

* Lots of sites provide numerical data. We want to provide visualization tools to more directly show the progress of the disease over time in the United States, and to allow for comparisons across states.

* Provide users CDC and WHO updates related to COVID in line with the numerical data and allow users to rate those articles

* Provide curated set of articles we think are important or particularly relevant as the “recommended” news.

### FEATURES

1. Data Visualizations for US COVID data
	* 	Map of US as a heat map indicating recent state-by-state trends.
	* Display live country-wide data alongside historical data as line graph and histogram.
	* Filter visualizations by date ranges with custom slider, possibly have charts animate using slider to show how data changes based on date.
2. Allow users to perform comparisons between states 
	* Same types of graphs listed above but state specific.
	* Allow multiple states’ data to be overlaid on same chart for comparison.
	* Allow users to view hospitalizations, icu cases, deaths, testing data, recovered cases.
3. Present articles or news relevant to COVID
	* Allow users to rate articles with a database preserving user ratings.
	* Allow users to sorted latest articles by source, date, name (asc, desc)
	* Allow users to sort rated articles by source, date, rating (asc, desc)
	* Allow users to filter latest and rated articles by source
	* Allow users to preview latest article

### Tutorials Used
1. Full Stack React/Express with Postgres: https://www.youtube.com/watch?v=Z4jCvpSROp8
2. Full Stack React/Express: https://www.youtube.com/watch?v=7CqJlxBYj-M
3. React-Strap Sample Code for understanding how to implement their components: https://reactstrap.github.io/
4. Attempted to do 404 redirecting using examples here: 

### Stack Technologies
1. React
2. React-Strap Bootstrap4 for React package
3. CSS
4. Express
5. PostgresSQL hosted in Google Cloud using environment variables

### Packages integrated
#### Client
1. Packages to support graphing: d3, re-charts, react-simple-maps
2. Packages to support forms associated with graphs: react-country-region-selector, react-datepicker, jquery, react-input-slider, moment, react-tooltip
3. General purpose packages used: typescript, 
4. Packages to help with news: react-html-parser
#### Server
1. Packages to support external apis; axios, rss-parser
2. Packages to support general infrastructure: pg, dotenv, cors, cookie-parser, body-parser

### Install Insructions for Developers
1. Please note that the db expects to connect to our Google Cloud hosted DB, or another PG instance we use environment variable to connect. See the create_table.sql file for context
2. Environment variable file (env) should include (with appropriate values assigned of course):
DB_USER=
DB_NAME=
DB_HOST=
DB_PWD=
PG_PORT=
3. Dev install: 
   * checkout code
   * cd covidsimple/
   * run npm install
   * cd covidsimple/client/
   * run npm install
   * run npm start 
4. At this point both the client and server should be running
5. If you are not immediately redirected, navigate to http://localhost:3000/
6. To just excercise the server api endpoints navigate to http://localhost:5000 and the appropriate end point

