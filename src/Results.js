import React from 'react';
import Book from './Book';


class Results extends React.Component{


    render(){
        return (
<div className="Results">
    {this.props.date === 'YYYY-MM-DD'? (''):(<span>
    <h3>The NYT Bestsellers for {this.props.date}</h3>
    </span>)}
    <div className="bookResults">
{this.props.Books.map(book => {
          return(
           <Book book={book} key={book.ISBN}
            />
            )
        }
        )
        }
        </div>
        </div>

        )
    }

}

export default Results;