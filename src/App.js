import React, {useState} from 'react';
import logo from './logo.jpg';
import './App.css';
import {Results} from './Results';

//import helper functions here
import {titleCase, randomDateYYYYMMDD,shortenDescription} from "./helpers.js"

const api = 'fz5eh6lFVdKu8o8S5MEDJ2Ap6pIp6Cla'
  const url = 'https://api.nytimes.com/svc/books/v3/lists/'
  let date;
  const querystring = '/hardcover-fiction.json?api-key='
  

export const App = () => {
  const [books,setBooks] = useState([]);
  const [date,setDate] = 'YYYY-MM-DD';

  //hit the NYT bestseller API
  async function findAListOfBooks(){
    const date = randomDateYYYYMMDD();
    const api = 'fz5eh6lFVdKu8o8S5MEDJ2Ap6pIp6Cla'
    const url = 'https://api.nytimes.com/svc/books/v3/lists/'
    const querystring = '/hardcover-fiction.json?api-key='
      setDate(date);
      const endpoint = `${url}${date}${querystring}${api}`
      try {
      const response = await fetch(endpoint, {cache:'no-cache',method:'GET'});
      if (response.ok){
          const books = await response.json();
          return books;
      }
      else throw new Error ("Error");
      }
      catch (error){
          console.log(error);
      }
    }
  //turn the response from NYT into an object we can use
    function parseNYTBooks(json){
      //this function takes in raw JSON data from NYT bestseller API and saves it to state
    const obj = json;
    let basicbookdata= [];
    const booklistsize = Object.keys(obj).length;
      if (!obj){
          console.log("problem") //if there's no json object here, we have a problem
      }
      if(!booklistsize){
          console.log("No books, ya goofed");//No books found??? this is bad
      }
      //get the first 10 results from json and put them into status
      for (let i = 0; i < 10; i++){
          let bookTitle = titleCase(obj.results.books[i].title);
          let bookAuthor = obj.results.books[i].author;
          let rank = obj.results.books[i].rank;
          let isbn = obj.results.books[i].primary_isbn13;
        //  //put in title case because formatting
           bookTitle = titleCase(bookTitle);
          basicbookdata[i] = {'title': bookTitle, 'author': bookAuthor, 'NYTRank': rank, 'ISBN':isbn};
          }
        // this.setState({books: basicbookdata})
        return basicbookdata;
      }
    //get additional metadata from OpenLibrary API
    async function getOpenLibraryBookData(currentBooks) {
      console.log(currentBooks.length);
  for (let i = 0; i<currentBooks.length; i++){
      const isbn = currentBooks[i].ISBN;
      console.log(`gonna try this isbn next ${isbn}`);
     let OLid;
     let description;
      const bookurl = `https://openlibrary.org/isbn/${isbn}.json`
      const OLresponse = await fetch (bookurl);
      if (OLresponse.ok){
        
      const OLData = await OLresponse.json();  
      
      OLid = OLData.works[0].key;
      const numPages = OLData.number_of_pages;
  const OLurl = `https://openlibrary.org${OLid}.json`;
      const response = await fetch (OLurl);
      if(response.ok){
      const olJSON = await response.json();
      try {
      description = olJSON.description.value;
      if (description.length>200){
        description = shortenDescription(description)
      }
      }
      catch(err) {
        description = '';
        console.log(err)
      }
  
        const newParams = {'OLID': OLid, 'numPages':numPages, 'description': description }
  
        const bookObj = Object.assign(currentBooks[i], newParams)
        currentBooks[i] = bookObj;
        console.log(bookObj)
      
        setBooks(currentBooks)
        console.log(books)
      }
    }
    }
    }
  

//execute all the functions in order
      async function main(){
        let matchedBooks = [];
        
        //get json from pinging NYT
        const jsonString = await findAListOfBooks();
      
        //turn that json into an object and set it to state
        const booksfromNYT = await parseNYTBooks(jsonString);
        console.log(booksfromNYT)
      await getOpenLibraryBookData(booksfromNYT);
      
        
 }
 return (
              <div className="App">
                <header className="App-header">
                  <div className="logo-container"><img src={logo} className="App-logo" alt="bookbot logo" /></div>
                  <p>
                  Explore a random week from the NYT Bestsellers list.
                  </p>
                </header>
          
                <div className="main">
              <section className="Instructions">
                <p>Click the button to be taken to a random date and see what the best-selling books were of that week!</p>
              </section>
              <section className="button">
                <button onClick={main}>Time machine...GO!</button>
              </section>
              <Results className="Results" Books={books} date={date}>
              </Results>
              </div>
              
              </div>
              
            );

}
export default App;
