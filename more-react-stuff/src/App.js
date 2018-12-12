import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
//this function runs if there are no other errors, call is successful
  componentDidMount() {
    var apiURL = process.env.REACT_APP_API_URL;
    console.log(apiURL);
    fetch(process.env.REACT_APP_API_URL)
    //turn response to json
      .then(res => res.json())
      .then(
        //succesful
        (result) => {
          this.setState({
            isLoaded: true,
            //items: result.items (default)
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        //unsuccessful
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      }
  render() {
  
    const {
      error,
      isLoaded,
      items
    } = this.state;
    if (error) {
      return <div> Error: {
        error.message
      } </div>;
    } else if(!isLoaded) {
      return <div> Loading... </div>;
    } else {
      return ( 
        <div>
          <h1>API url is {process.env.REACT_APP_API_URL} </h1>
         <ul> {
          items.map(items => ( <li key={items.id}> {items.first_name} {items.last_name}</li>
          ))} 
          </ul>
        </div>
      );
    }
  }
}

export default App
