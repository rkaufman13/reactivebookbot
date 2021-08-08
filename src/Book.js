import React from 'react';
import './Book.css';
import './placeholder.jpg'

class Book extends React.Component{
constructor(props){
  super(props)
  this.getCover = this.getCover.bind(this)
  this.handleImageLoad = this.handleImageLoad.bind(this)
  
}
getCover(){
  const coverURL = `https://covers.openlibrary.org/b/isbn/${this.props.book.ISBN}-M.jpg`
  return coverURL;
}
handleImageLoad(){
  for (let i = 0; i<document.getElementsByClassName('cover').length;i++){
    if (document.getElementsByClassName('cover')[i].width===1){
      document.getElementsByClassName('cover')[i].src = "placeholder.jpg"
    }
  }
}

render(){
  return  (<div className="bookresult">
    <h3>{this.props.book.title}</h3>
    <br/>
    <img src={this.getCover()} alt={this.props.book.title}  onLoad={this.handleImageLoad} className="cover"/>
    <br/>
    <p>{this.props.book.author}</p>
    <p>NY Times Bestseller for DATE, rank: {this.props.book.NYTRank}</p>
    <p>Holds at the DC Library: {this.props.book.DCHolds} (<a href={this.props.book.DCUrl}>Go reserve it</a>)</p>
    <p>Description: {this.props.book.description || "No description available"}</p>
    <p>Number of pages: {this.props.book.numPages || "Not available"}</p>

</div>
    )
}

}
export default Book;