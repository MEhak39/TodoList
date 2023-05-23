import React, { Component } from "react";
import ReactDOM from "react-dom";
import { todoListKeyName } from "./constants";
import { getItem, setItem } from "./utils";
import { List } from "./components/List";
import { Form } from "./components/Form";

const getTodoListFromStorage = () => getItem(todoListKeyName);
const setTodoListInStorage = data => setItem(todoListKeyName, data);

class App extends Component {
  constructor() {
    super();

    if (getTodoListFromStorage()) {
      this.state = {
        todos: getTodoListFromStorage(),
        value: ""
      };
    } else {
      this.state = {
        todos: [],
        value: ""
      };
    }
  }

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  onAddTask = e => {
    e.preventDefault();

    const { value, todos: currTodoList } = this.state;

    if (!value) return;

    const temp = [...currTodoList];

    const obj = {
      name: value,
      id: Date.now(),
      done: false
    };

    const todos = temp.concat(obj);

    this.setState({
      todos,
      value: ""
    });

    setTodoListInStorage(todos);
  };

  onCheck = itemId => {
    if (!itemId) return;

    const temp = [...this.state.todos];
    const todos = temp.map(ele => (ele.id === itemId ? { ...ele, done: !ele.done } : ele));

    this.setState({ todos }, () => setTodoListInStorage(todos));
  };

  onDeleteTask = itemId => {
    if (!itemId) return;

    const temp = [...this.state.todos];
    const todos = temp.filter(id => id.id !== itemId);

    this.setState({ todos }, () => setTodoListInStorage(todos));
  };

  render() {
    return (
      <div className="App">
        <h1 className="main-heading">To Do App</h1>

        <div className="wrapper">
          <Form value={this.state.value} onChange={this.onChange} onAddTask={this.onAddTask} />

          <ul className="task-box">
            <List list={this.state.todos} onCheck={this.onCheck} onDeleteTask={this.onDeleteTask} />
          </ul>
        </div>

        <span className="footer"> &copy; Copyright | Aarushi Saxena | {new Date().getFullYear()} </span>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
