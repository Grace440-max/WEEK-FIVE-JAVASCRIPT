# User Directory

A simple, searchable user directory built with HTML, CSS and JavaScript. It loads sample users from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users) and displays each person as a card showing their name, email, city and organization.

## Features

Load and reload users from the API using fetch() and async/await
Search by name or email (not case-sensitive)
Clear messages for loading, errors, empty results and no matches

## Project structure
 
index.html
style.css
script.js
README.md


## How to run

1. Download or clone this repository.
2. Open index.html in a web browser (an internet connection is required).
3. Click **Load Users**, then type in the search box to filter.

## How to test error handling

In script.js, temporarily change API_URL to an invalid address, reload the page and click Load Users. An error message should appear. Restore the correct URL afterwards.

## Author

Grace Kabanyana