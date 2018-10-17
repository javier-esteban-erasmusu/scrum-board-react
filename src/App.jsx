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
  
  generateId(namespace) {
    return `${namespace}-${Date.now()}-${Math.round(Math.random()*100)}`

  }
  
  handleInputChange = (e) => {
    this.setState({addNewListText: e.target.value})
  }
  handleKeyup = (e) => {
    if(e.keyCode === 13) {
      addNewList(this.state.addNewListText);
    }
  }
  removeList(listId) {
      this.setState(prevState => {
        let newLists = prevState.lists.filter( list => list.listId !== listId) ;
        return { lists: newLists }
      })
  }
  markAsCompleted(taskId,listId, completedState) {
    this.setState(prevState => {
        let newLists = prevState.lists.map(list => {
          if(list.listId === listId) {
            list.tasks = list.tasks.map(task => {
              if(task.taskId === taskId) {
                task.completed = completedState;
              }
              return task;
            })
          }
          return list
        }) ;
        
        return { lists: newLists }
      })
  }
 
  render() {
    localStorage.setItem('lists', JSON.stringify(this.state.lists));
    return (
      <div className="App">
        <header className="addList">
          <input type="text" value={this.state.addNewListText} onChange={this.handleInputChange} onKeyUp={this.handleKeyup}/>
          <button onClick={this.addNewList}>add new list</button>
        </header>
        <section>
          <div className="lists">
            { this.state.lists.map( listData => 
            <List key={listData.listId} data={listData} onHandleRemoveList={this.removeList.bind(this)} onHandleMarkAsCompleted={this.markAsCompleted.bind(this)}/>)}
          </div>
        </section>
      </div>
    );
  }
}
export default App;
