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
    if (document.getElementsByClassName('cover')[i].width===1){
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
    <br/>
    <img src={this.getCover()} alt={this.props.book.title}  onLoad={this.handleImageLoad} className="cover"/>
    <br/>
    <p>{this.props.book.author}</p>
    <p>(<a href={this.getLibraryUrl()}>Search DCPL for this book</a>)</p>
    <p>{this.props.book.description || "No description available"}</p>
    <p>Number of pages: {this.props.book.numPages || "Not available"}</p>

</div>
    )
}

}
export default Book;