import React from 'react';
import Book from './Book';


class Results extends React.Component{


    render(){
        return (
<div className="Results">
{this.props.Books.map(book => {
          return(
           <Book book={book} key={book.ISBN}
            />
            )
        }
        )
        }
        </div>

        )
    }

}

export default Results;