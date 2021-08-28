import React from 'react';
import './Book.css';
import './placeholder.png'



export const Book = (props) => {
  
  function getCover(){
    const coverURL = `https://covers.openlibrary.org/b/isbn/${props.book.ISBN}-M.jpg`
    return coverURL;
  }

  function handleImageLoad(){
    for (let i = 0; i<document.getElementsByClassName('cover').length;i++){
      if (document.getElementsByClassName('cover')[i].naturalWidth===1){
        document.getElementsByClassName('cover')[i].src = "placeholder.png"
      }
    }
  }

 function getLibraryUrl(){
    const url = 'https://catalog.dclibrary.org/client/en_US/dcpl/search/results?qf=FORMAT%09Format%09E_BOOK%09eBook+%7C%7C+BOOK%09Book&qu=';
    let bookTitle = props.book.title;
    bookTitle = bookTitle.split(" ");
    bookTitle = bookTitle.join("+");
    const query = bookTitle;
    const endpoint = `${url}${query}`
  window.location.href=endpoint;
  }
  

  return  (<div className="bookresult">
  <h3>{props.book.title}</h3>
  <p>{props.book.author}</p>
  
  <div className="bookCover"><img src={getCover()} alt={props.book.title}  onLoad={handleImageLoad} className="cover"/></div>
  <br/>
  <p><button className="bookbutton" onClick={getLibraryUrl}>Search DCPL for this book</button></p>
  <p className="description">{props.book.description || "No description available"}</p>
  <p className="description">{props.book.numPages?"Number of pages:"+props.book.numPages:""}</p>

</div>
  )

}
