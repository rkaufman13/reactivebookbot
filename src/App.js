import React from 'react'
import logo from './logo.jpg';
import './App.css';

import Results from './Results'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      books: [
        {title:'Title1', author:'Author 1', NYTRank: 1, DCHolds: 3, ISBN: 9780593129197, DCUrl: 'https://catalog.dclibrary.org/client/en_US/dcpl/search/detailnonmodal/ent:$002f$002fERC_222_3048$002f0$002f222_3048:OVERDRIVE:d7f3cfad-d675-47a2-8990-65ce544d5ec1/ada?qu=djinn+patrol+on+the+purple+line&d=ent%3A%2F%2FERC_222_3048%2F0%2F222_3048%3AOVERDRIVE%3Ad7f3cfad-d675-47a2-8990-65ce544d5ec1%7EERC_ST_DCPL%7E1&h=8'},
        {title:'Title2', author:'Author 2', NYTRank: 5, DCHolds: 0, ISBN: 9780525541912, DCUrl: 'https://catalog.dclibrary.org/client/en_US/dcpl/search/detailnonmodal/ent:$002f$002fERC_222_3048$002f0$002f222_3048:OVERDRIVE:d7f3cfad-d675-47a2-8990-65ce544d5ec1/ada?qu=djinn+patrol+on+the+purple+line&d=ent%3A%2F%2FERC_222_3048%2F0%2F222_3048%3AOVERDRIVE%3Ad7f3cfad-d675-47a2-8990-65ce544d5ec1%7EERC_ST_DCPL%7E1&h=8'},
        {title:'Title3', author:'Author 3', NYTRank: 2, DCHolds: 2, ISBN: 9780393062625, DCUrl: 'https://catalog.dclibrary.org/client/en_US/dcpl/search/detailnonmodal/ent:$002f$002fERC_222_3048$002f0$002f222_3048:OVERDRIVE:d7f3cfad-d675-47a2-8990-65ce544d5ec1/ada?qu=djinn+patrol+on+the+purple+line&d=ent%3A%2F%2FERC_222_3048%2F0%2F222_3048%3AOVERDRIVE%3Ad7f3cfad-d675-47a2-8990-65ce544d5ec1%7EERC_ST_DCPL%7E1&h=8'}
      ]
  }
  }

//   async getOpenLibraryBookData(){
//     let currentBooks = this.state.books;
// for (let i = 0; i<currentBooks.length; i++){
//     const isbn = currentBooks[i].ISBN;
//    let OLid;
//     const bookurl = `https://openlibrary.org/isbn/${isbn}.json`
//     const OLresponse = await fetch (bookurl);
//     if (OLresponse.ok){
// const OLData = OLresponse.json();  
//     OLid = OLData.works[0].key;
//     const numPages = OLData.number_of_pages;
// const OLurl = `https://openlibrary.org/works/${OLid}.json`;
//     const response = await fetch (OLurl);
//     if(response.ok){
//     const olJSON = response.json();
//     const description = olJSON.description;

//       const newParams = {'OLID': OLid, 'numPages':numPages, 'description': description }
//       const bookObj = Object.assign(currentBooks[i], newParams)
//       currentBooks[i] = bookObj;
//     }
//       this.setState({books: currentBooks})
//   }
//   }
//   }

  render(){
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container"><img src={logo} className="App-logo" alt="bookbot logo" /></div>
        <p>
        Need help finding a book to read? Bookbot is here. 
        </p>
      </header>

      <div className="main">
    <section className="Instructions">
      <p>Click the button to find some books. All are guaranteed to have fewer than 5 holds at the DC Public Library.</p>
    </section>
    <section className="button">
      <button>Gimme some books</button>
    </section>
    <Results className="Results" Books={this.state.books}>
    </Results>
    </div>
    
    </div>
    
  );}
}

export default App;
