import React from 'react';


class Book extends React.Component{
constructor(props){
  super(props)
  this.getCover = this.getCover.bind(this)
}
getCover(){
  const coverURL = `https://covers.openlibrary.org/b/isbn/${this.props.book.ISBN}-M.jpg`
  return coverURL;
}

render(){
  return  (<div>
    <h3>{this.props.book.title}</h3>
    <br/>
    <img src={this.getCover()} alt={this.props.book.title}/>
    <br/>
    <p>{this.props.book.author}</p>

</div>
    )
}

}
export default Book;