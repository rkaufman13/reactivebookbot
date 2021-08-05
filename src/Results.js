import React from 'react';
import Book from './Book';


class Results extends React.Component{

    render(){
        return (
<div className="book">
{this.props.Books.map(book => {
          return(
           <Book book={book} 
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