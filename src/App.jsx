import React, { Component } from 'react';
import './App.css';
import List from './List.component.jsx';
import {addNewList} from './store/actions';
class App extends Component {
  constructor( props ) {
      super( props );
      this.state = {
          'addNewListText': '',
          "lists": JSON.parse(localStorage.getItem('lists')) || [],

      }
  }
  
  
  handleInputChange = (e) => {
    this.setState({addNewListText: e.target.value})
  }
  
  handleKeyup = (e) => {
    if(e.keyCode === 13) {
      addNewList(this.state.addNewListText);
    }
  } 
  render() {
    localStorage.setItem('lists', JSON.stringify(this.state.lists));
    return (
      <div className="App">
        <header className="addList">
          <input type="text" value={this.state.addNewListText} onChange={this.handleInputChange} onKeyUp={this.handleKeyup}/>
          <button onClick={()=> addNewList(this.state.addNewListText)}>add new list</button>
        </header>
        <section>
          <div className="lists">
            { this.props.lists.map( listData => 
            <List key={listData.listId} data={listData} />)}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state)  => ({lists});

export default connect(
  mapStateToProps,
  null
)(App);
