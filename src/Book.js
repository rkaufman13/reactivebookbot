import React from 'react';
import './Book.css';
import './placeholder.png'

class Book extends React.Component{
constructor(props){
  super(props)
  this.getCover = this.getCover.bind(this)
  this.handleImageLoad = this.handleImageLoad.bind(this)
  this.getLibraryUrl = this.getLibraryUrl.bind(this)
  
}
getCover(){
  const coverURL = `https://covers.openlibrary.org/b/isbn/${this.props.book.ISBN}-M.jpg`
  return coverURL;
}
handleImageLoad(){
  for (let i = 0; i<document.getElementsByClassName('cover').length;i++){
    if (document.getElementsByClassName('cover')[i].naturalWidth===1){
      document.getElementsByClassName('cover')[i].src = "placeholder.png"
    }
  }
}

getLibraryUrl(){
  const url = 'https://catalog.dclibrary.org/client/en_US/dcpl/search/results?qf=FORMAT%09Format%09E_BOOK%09eBook+%7C%7C+BOOK%09Book&qu=';
  let bookTitle = this.props.book.title;
  bookTitle = bookTitle.split(" ");
  bookTitle = bookTitle.join("+");
  const query = bookTitle;
  const endpoint = `${url}${query}`
return endpoint;
}

render(){
  return  (<div className="bookresult">
    <h3>{this.props.book.title}</h3>
    <p>{this.props.book.author}</p>
    
    <div className="bookCover"><img src={this.getCover()} alt={this.props.book.title}  onLoad={this.handleImageLoad} className="cover"/></div>
    <br/>
    <p><form method="post" action={this.getLibraryUrl()}><button className="bookbutton">Search DCPL for this book</button></form></p>
    <p class="description">{this.props.book.description || "No description available"}</p>
    <p class="description">{this.props.book.numPages?"Number of pages:"+this.props.book.numPages:""}</p>

</div>
    )
}

}
export default Book;