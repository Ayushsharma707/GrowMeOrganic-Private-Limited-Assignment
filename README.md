# PrimeReact DataTable - Row Selection with Server-Side Pagination

## Overview  
This is a React project built using **Vite** and **TypeScript** that implements a PrimeReact `DataTable` component to fetch and display data from the              
[Art Institute of Chicago API](https://api.artic.edu/api/v1/artworks?page).                            
The table supports:
- **Server-side pagination**
- **Row selection across pages**
- **Persistence of selected rows when switching between pages**

The application ensures optimal performance by fetching only the required data for each page while adhering to best practices.

## Technologies Used  
- **React**: For building the UI components.  
- **Vite**: To quickly create and build the React application.  
- **TypeScript**: For strong typing and better development experience.  
- **PrimeReact**: For the DataTable and UI components.  
- **CSS**: For styling and layout.  
- **Fetch API**: For making API requests.  
- **Netlify**: For application deployment.

## Core Features

### 1. Server-Side Pagination  
- **Feature**: Data is fetched dynamically from the server for the respective page.  
- **How it Works**: When a user navigates to a new page, an API call is made to fetch data for that specific page.

### 2. Row Selection with Persistence  
- **Feature**: Rows can be selected (or deselected) across multiple pages.  
- **How it Works**: Row selection persists across different pages, and the selection panel updates accordingly.

### 3. Custom Row Selection Panel  
- **Feature**: A custom panel allows users to manage selected rows seamlessly.  
- **How it Works**: The panel displays the selected rows across all pages, ensuring easy management.

### 4. Double-Click to Select a Row  
- Users can double-click any row to quickly select it.

### 5. Data Rendering  
The following fields are displayed in the DataTable:  
- **Title**  
- **Place of Origin**  
- **Artist Display**  
- **Inscriptions**  
- **Start Date**  
- **End Date**  

### 6. Error Handling  
Proper error handling ensures that failed API requests display an appropriate message to the user.    

## How to Run the Project Locally

### 1. Prerequisites
Make sure you have the following installed:
- **Node.js** (v16 or later)
- **NPM** or **Yarn**

### 2. Clone the Repository 

### 1. Prerequisites
Make sure you have the following installed:
- **Node.js** (v16 or later)
- **NPM** or **Yarn**

### Install Dependencies
- npm install

### Run the Application
- npm run dev

## GitHub Repository  
[https://github.com/Ayushsharma707/GrowMeOrganic-Private-Limited-Assignment](https://github.com/Ayushsharma707/GrowMeOrganic-Private-Limited-Assignment)

## Live Demo  
[https://primereact-datatable.netlify.app/](https://primereact-datatable.netlify.app/)
