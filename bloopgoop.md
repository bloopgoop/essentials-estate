Headings: Use # for headings, with one # for the largest heading and six # for the smallest heading. <br>
Bold and italic text: Use ** to bold text and _ or * to italicize text.<br>
Lists: Use - or * to create unordered lists and 1. to create ordered lists.<br>
Links: Use [link text](URL) to create a hyperlink.<br>
Images: Use ![alt text](image URL) to insert an image.<br>
Code: Use `code` to format inline code and indent code blocks with four spaces or a tab.<br>

# Development tools
- JSON server, see https://fullstackopen.com/en/part2/getting_data_from_server#axios-and-promises<br>
This mimics a backend server and was used to develop some frontend APIs.<br><br>
cd into frontend and run the command
`npm run server`
to start the json-server.<br>
To view the details of the server, see package.json's "scripts".<br>
`npm run server ` is equivalent to `json-server -p3001 --watch dev/property-data.json`
which runs the json server on port 3001 and watches the file dev/property-data.json

# Design choices
Using React for the frontend, Django for backend. React useful in creating reusable components.

- User authentication: Session? JWT? 
- Database: Postgres?
- Tables: 
- 

# Struggles
*Creating reusable styled React components* <br>
Creating css styling for a component to be used in multiple pages proved to be more difficult than expected. I had to hardcode certain values of padding and margin to get elements to fit perfectly in one page. When using the same component in another page, I found myself either using inline styling or writing a new class for the same component. 

*UI/UX design* <br>
Color schemes, spacing, animations, and flow of the website was a lot of trial and error. I watched many videos of tips to create a good UI/UX but still struggled in making something look enterprise ready.


## Application summary
This is a web application based on a business scenario provided to me in my Systems Analysis and Design class. It aims to streamline tenant and property owner interactions and provide a system for all parties to rent/list/approve property.

## Required libraries
django<br>
django-cors-headers<br>
djangorestframework<br>
djangorestframework-simplejwt<br>
node.js<br>
npm<br>
react<br>
react-router-dom v6<br>
axios<br>
react-infinite-scroll-component<br>
jwt-decode<br>
python-dotenv<br>
Pillow<br>
psycopg2<br>
six<br>
