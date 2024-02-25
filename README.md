# Fullstack Scraping App

Due to technical challenges, web scraping from the Amazon website was not feasible, as it returned a status code 503 (Service Unavailable). As an alternative, this project focuses on web scraping from the Mercado Livre website, which closely aligns with the initial proposal. The goal is to extract product information such as title, rating and reviews, and images from the Mercado Livre product listings.

Please refer to the documentation below for instructions on running the project and utilizing the web scraping functionality.

This is a full-stack web scraping application that allows users to search for products on Mercado Livre and retrieve information such as titles, ratings and reviews, and images.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Backend Setup

1. Open a terminal and navigate to the `backend` directory.

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```
The server will be running at http://localhost:3000.

## API Endpoint

- The backend provides a single API endpoint for web scraping: `/api/scrape`.
- To use the web scraping functionality, make a GET request to the following URL:
  - Example: http://localhost:3000/api/scrape?keyword=your_search_term
- Replace `your_search_term` with the keyword you want to search for.
- The server will respond with scraped product data in JSON format.

## Frontend Setup

1. Open another terminal and navigate to the frontend directory.

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```
After starting the frontend using `npm start`, you may see a list of available ports in your terminal. Simply click on one of the provided URLs to open the web page in your browser.

## Technologies

- **Frontend:**
  - HTML
  - CSS
  - JavaScript

- **Backend:**
  - Node.js
  - Express.js
  - Axios
  - Cheerio
  - Cors

- **Others:**
  - npm

## Author

- [@MattBastos](https://www.github.com/MattBastos)
