const api = 'fz5eh6lFVdKu8o8S5MEDJ2Ap6pIp6Cla'
const url = 'https://api.nytimes.com/svc/books/v3/lists/'
let date;
const querystring = '/hardcover-fiction.json?api-key='
let booksfromNYT;

//import helper functions here
import {titleCase, reverseAuthor, randomDateYYYYMMDD} from "./helpers.js"

const findABook = async (json) => {
    //this function takes in raw JSON data from NYT bestseller API and creates a 2d array with title, author, rank
 let bookList = [];
console.log(json)
const obj = json;

const booklistsize = Object.keys(obj).length;
    if (!obj){
        console.log("problem")
    }
    if(!booklistsize){
        console.log("No books, ya goofed");//No books found??? this is bad
    }
    for (let i = 0; i < 10; i++){
        let bookTitle = obj.results.books[i].title;
        let bookAuthor = obj.results.books[i].author;
        let rank = obj.results.books[i].rank;

       //put in title case because formatting
        bookTitle = titleCase(bookTitle);
        
    bookList.push([bookTitle,bookAuthor, rank]);
    }
    return bookList;
}

const findAListOfBooks = async () => {
//date = '2019-01-20' //eventually random 4 digit year from 1995-2015, random 2 digit month, random 2 digit date
date = randomDateYYYYMMDD();
const endpoint = `${url}${date}${querystring}${api}`
// for now we'll use the existing json data so as to not get banned from NYT api
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


//const jsonString = await openFile('hardcover-fiction.json');
 //   return jsonString;
}


async function searchDCPL(booksfromNYT,index){
    const url = 'https://catalog.dclibrary.org/client/en_US/dcpl/search/results?qf=FORMAT%09Format%09E_BOOK%09eBook+%7C%7C+BOOK%09Book&qu=';
    let bookTitle = booksfromNYT[index][0];
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

function parsebooks(result){
    const parser = new DOMParser;
    const dom = parser.parseFromString(result,"text/html")
    
//   const result = await openFile('search-results.html');
//   const dom = new jsdom.JSDOM(result);
   
   const holdscount = dom.window.document.getElementsByClassName('holdsCountNumber')[0].innerHTML;
   const authorBackwards = dom.window.document.getElementsByClassName('searchlink')[0].getElementsByTagName('a')[0].innerHTML;
   const format = dom.window.document.getElementsByClassName('formatText')[0].innerHTML;
   const bookUrl = dom.window.document.getElementsByClassName('detailLink')[0].getAttribute('href');
   const ISBN = dom.window.document.getElementsByClassName('isbnValue')[0].getAttribute('value')
   author = reverseAuthor(authorBackwards).trim();
   console.log(holdscount,author,format,bookUrl)

   //now we check to make sure the first DCPL search result is the one we want
   if (format.toLowerCase() === 'ebook' || format.toLowerCase() === 'book'){
       if (booksfromNYT[0].includes(author)){
           //great, it's a book and the author matches, which makes us fairly confident it's the right book.
           //now we check to make sure it's not too popular
   if (holdscount < 5){
       finalbook = [...booksfromNYT[0]]
       finalbook.push(holdscount,bookUrl,ISBN)
       return finalbook;
   }
   }
   }
}

async function main(){
let matchedBooks;
const jsonString = await findAListOfBooks();
const booksfromNYT = await findABook(jsonString);

for(let i = 0; i<10; i++){
    if (matchedBooks.length<3){
let matchedBookDOM = await searchDCPL(booksfromNYT, i);
matchedBooks = parsebooks(matchedBookDOM);
    }
}
console.log(matchedBooks);

}

main()