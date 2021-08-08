import React from 'react'
import logo from './logo.jpg';
import './App.css';
import Results from './Results'

//import helper functions here
import {titleCase, reverseAuthor, randomDateYYYYMMDD} from "./helpers.js"

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
        // {title:'Djinn Patrol on the Purple Line', author:'Deepa Anappara', NYTRank: 1, DCHolds: 3, ISBN: 9780593129197, DCUrl: 'https://catalog.dclibrary.org/client/en_US/dcpl/search/detailnonmodal/ent:$002f$002fERC_222_3048$002f0$002f222_3048:OVERDRIVE:d7f3cfad-d675-47a2-8990-65ce544d5ec1/ada?qu=djinn+patrol+on+the+purple+line&d=ent%3A%2F%2FERC_222_3048%2F0%2F222_3048%3AOVERDRIVE%3Ad7f3cfad-d675-47a2-8990-65ce544d5ec1%7EERC_ST_DCPL%7E1&h=8'},
        // {title:'Such a Fun Age', author:'Kiley Reid', NYTRank: 5, DCHolds: 0, ISBN: 9780525541912, DCUrl: 'https://catalog.dclibrary.org/client/en_US/dcpl/search/detailnonmodal/ent:$002f$002fERC_222_3048$002f0$002f222_3048:OVERDRIVE:d7f3cfad-d675-47a2-8990-65ce544d5ec1/ada?qu=djinn+patrol+on+the+purple+line&d=ent%3A%2F%2FERC_222_3048%2F0%2F222_3048%3AOVERDRIVE%3Ad7f3cfad-d675-47a2-8990-65ce544d5ec1%7EERC_ST_DCPL%7E1&h=8'},
        // {title:'Title3', author:'Author 3', NYTRank: 2, DCHolds: 2, ISBN: 9780393062625, DCUrl: 'https://catalog.dclibrary.org/client/en_US/dcpl/search/detailnonmodal/ent:$002f$002fERC_222_3048$002f0$002f222_3048:OVERDRIVE:d7f3cfad-d675-47a2-8990-65ce544d5ec1/ada?qu=djinn+patrol+on+the+purple+line&d=ent%3A%2F%2FERC_222_3048%2F0%2F222_3048%3AOVERDRIVE%3Ad7f3cfad-d675-47a2-8990-65ce544d5ec1%7EERC_ST_DCPL%7E1&h=8'}
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
let basicbookdata= {};

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
    //  //put in title case because formatting
    //   bookTitle = titleCase(bookTitle);
      basicbookdata[i] = {'title': bookTitle, 'author': bookAuthor, 'NYTRank': rank};
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
async parsebooks(result, index){
      const parser = new DOMParser();
      const dom = parser.parseFromString(result,"text/html")
      let DCLibraryparams = {};
     
     const holdscount = dom.window.document.getElementsByClassName('holdsCountNumber')[0].innerHTML;
     //now we check to make sure it's not too popular
     if (holdscount < 5){
     const authorBackwards = dom.window.document.getElementsByClassName('searchlink')[0].getElementsByTagName('a')[0].innerHTML;
     const format = dom.window.document.getElementsByClassName('formatText')[0].innerHTML;
     const bookUrl = dom.window.document.getElementsByClassName('detailLink')[0].getAttribute('href');
     const ISBN = dom.window.document.getElementsByClassName('isbnValue')[0].getAttribute('value')
     let author = reverseAuthor(authorBackwards).trim();
     console.log(holdscount,author,format,bookUrl)  
     const currentBooks = this.state.books;    
     DCLibraryparams = {'DCHolds': holdscount, 'DCUrl':bookUrl, 'ISBN': ISBN}
     const intermediateBookObj = Object.assign(currentBooks[index], DCLibraryparams)
     currentBooks[index] = intermediateBookObj;
    //  this.setState({books:currentBooks})
    //  console.log(this.state.books)
    return currentBooks;
     }
     }
  
  
  async main(){
  let matchedBooks = {};
  
  //get json from pinging NYT
  const jsonString = await this.findAListOfBooks();

  //turn that json into an object and set it to state
  const booksfromNYT = await this.parseNYTBooks(jsonString);
  
  for(let i = 0; i<10; i++){
      if (!(matchedBooks.length) || matchedBooks.length<3){
        console.log('inside DCPL loop, now what')
  let matchedBookDOM = await this.searchDCPL(booksfromNYT, i);
  matchedBooks = this.parsebooks(matchedBookDOM, i);
      }
  }
  
  
  }
  

//THIS function takes an ISBN and returns an "Open Library ID" to fetch yet more metadata on books and append it to our book object
  async getOpenLibraryBookData() {
    let currentBooks = this.state.books;
for (let i = 0; i<currentBooks.length; i++){
    const isbn = currentBooks[i].ISBN;
   let OLid;
    const bookurl = `https://openlibrary.org/isbn/${isbn}.json`
    const OLresponse = await fetch (bookurl);
    if (OLresponse.ok){
      
const OLData = await OLresponse.json();  
console.log(OLData);
    OLid = OLData.works[0].key;
    const numPages = OLData.number_of_pages;
const OLurl = `https://openlibrary.org${OLid}.json`;
    const response = await fetch (OLurl);
    if(response.ok){
    const olJSON = response.json();
    const description = olJSON.description;

      const newParams = {'OLID': OLid, 'numPages':numPages, 'description': description }
      const bookObj = Object.assign(currentBooks[i], newParams)
      currentBooks[i] = bookObj;
    }
      this.setState({books: currentBooks})
  }
  }
  }



  render(){
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container"><img src={logo} className="App-logo" alt="bookbot logo" /></div>
        <p>
        Need help finding a book to read? Bookbot is here. 
        </p>
      </header>

      <div className="main">
    <section className="Instructions">
      <p>Click the button to find some books. All are guaranteed to have fewer than 5 holds at the DC Public Library.</p>
    </section>
    <section className="button">
      <button onClick={this.main}>Gimme some books</button>
    </section>
    <Results className="Results" Books={this.state.books}>
    </Results>
    </div>
    
    </div>
    
  );}
}

export default App;
