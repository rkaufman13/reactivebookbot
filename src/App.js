import React from 'react';
import logo from './logo.jpg';
import './App.css';
import Results from './Results';

//import helper functions here
import {titleCase, reverseAuthor, randomDateYYYYMMDD,shortenDescription} from "./helpers.js"

const api = 'fz5eh6lFVdKu8o8S5MEDJ2Ap6pIp6Cla'
  const url = 'https://api.nytimes.com/svc/books/v3/lists/'
  let date;
  const querystring = '/hardcover-fiction.json?api-key='
  let booksfromNYT;


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      books: [
     
      ],
      date: 'YYYY-MM-DD'
  }

  this.parseNYTBooks = this.parseNYTBooks.bind(this)
  this.getOpenLibraryBookData = this.getOpenLibraryBookData.bind(this)
  this.main = this.main.bind(this)
  }
  
  //query NYT hardcover fiction bestseller API with random YYYY-MM-DD date string
  async findAListOfBooks(){
  
  date = randomDateYYYYMMDD();
  this.setState({'date':date})
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
  
parseNYTBooks(json){
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

//take the object which contains 10x titles and authors and scrape the DC library website with them one at a time
  async searchDCPL(booksfromNYT,index){
      const url = 'https://catalog.dclibrary.org/client/en_US/dcpl/search/results?qf=FORMAT%09Format%09E_BOOK%09eBook+%7C%7C+BOOK%09Book&qu=';
      let bookTitle = booksfromNYT[index].title;
      bookTitle = bookTitle.split(" ");
      bookTitle = bookTitle.join("+");
      const query = bookTitle;
      const endpoint = `${url}${query}`;
      const response = await fetch(endpoint);
      if (response.ok){
          const result = await response.text();
      return result;
      }
  
  }
  //now walk through the DCLibrary DOM to find the information we need
// async parsebooks(result, index, booksfromNYT){
//       const parser = new DOMParser();
//       const dom = parser.parseFromString(result,"text/html")
//       console.log(dom);
//       let DCLibraryparams = {};
//       let available;
//       let currentBooks = booksfromNYT;    
//      //now we check to make sure it's not too popular     
//      const holdscount = dom.getElementsByClassName('holdsCountNumber')[0].innerHTML;
//      console.log(holdscount);
//      if (!holdscount){
//         available = dom.getElementsByClassName('availableNumber')[0].innerHTML;
//         console.log(available);
//      }
//      if (holdscount < 5 || available > 0){
//      const authorBackwards = dom.getElementsByClassName('searchlink')[0].getElementsByTagName('a')[0].innerHTML;
//       //check to make sure we have the right book (sometimes DCPL search just gives us crazy results)
//       let author = reverseAuthor(authorBackwards).trim();
//       if (!Object.values(booksfromNYT[index]).includes(author)){
//         //don't continue
//        return currentBooks;
//       }
//      const format = dom.getElementsByClassName('formatText')[0].innerHTML;
//      const bookUrl = dom.getElementsByClassName('detailLink')[0].getAttribute('href');
//      const ISBN = dom.getElementsByClassName('isbnValue')[0].getAttribute('value')
//      console.log(holdscount,author,format,bookUrl)  
//      DCLibraryparams = {'DCHolds': holdscount, 'DCUrl':bookUrl, 'ISBN': ISBN, 'DCAvail':available}
//      const intermediateBookObj = Object.assign(currentBooks[index], DCLibraryparams)
//      currentBooks[index] = intermediateBookObj;
//     console.log(currentBooks)
//      return currentBooks;
    
//      }
//      else {
//        return currentBooks;
//       }
//      }
  
  
  async main(){
  let matchedBooks = [];
  
  //get json from pinging NYT
  const jsonString = await this.findAListOfBooks();

  //turn that json into an object and set it to state
  const booksfromNYT = await this.parseNYTBooks(jsonString);
  console.log(booksfromNYT)
const booksfromOL = await this.getOpenLibraryBookData(booksfromNYT)
  
      }
  
  
  

//THIS function takes an ISBN and returns an "Open Library ID" to fetch yet more metadata on books and append it to our book object
  async getOpenLibraryBookData(currentBooks) {
    console.log('im just a girl, standing in front of an open library api, begging it to respond')
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
    
      this.setState({books: currentBooks})
      console.log(this.state.books)
    }
  }
  }
  }



  render(){
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
      <button onClick={this.main}>Time machine...GO!</button>
    </section>
    <Results className="Results" Books={this.state.books} date={this.state.date}>
    </Results>
    </div>
    
    </div>
    
  );}
}

export default App;
