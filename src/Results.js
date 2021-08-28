import React from 'react';
import {Book} from './Book';


export const Results = (props) => {
        return (
<div className="Results">
    {props.date === 'YYYY-MM-DD'? (''):(<span>
    <h3>The NYT Bestsellers for {props.date}</h3>
    </span>)}
    <div className="bookResults">
{props.Books.map(book => {
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
