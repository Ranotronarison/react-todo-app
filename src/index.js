import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [todoName, setTodoName] = useState("");
  const [todoArr, setTodo] = useState([]);
  const [checkedList, setCheckedList] = useState([]);

  const createTodo = name => {
    if (name) {
      setTodo([...todoArr, name]);
      setTodoName("");
    }
  };

  const deleteTodo = index => {
    setTodo(todoArr.filter(todo => todoArr.indexOf(todo) !== index));
  };

  const updateCheckedList = (status, id) => {
    if (status) {
      setCheckedList([...checkedList, id]);
    } else {
      setCheckedList(checkedList.filter(_id => _id !== id));
    }
  };

  return (
    <div className="App">
      <h1>TodoApp</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          createTodo(todoName);
        }}
      >
        <input
          type="text"
          onChange={e => setTodoName(e.target.value)}
          value={todoName}
          placeholder="A beautifull name"
        />
        <button
          type="button"
          onClick={e => {
            e.preventDefault();
            createTodo(todoName);
          }}
        >
          Add todo
        </button>
      </form>
      <div>
        <span>count: {todoArr.length}</span>
        <br />
        <span>undone todos count: {todoArr.length - checkedList.length}</span>
      </div>
      <hr />
      <ul id="todo-list">
        {todoArr.map((todo, index) => (
          <Todo
            key={index}
            id={index}
            todo={todo}
            onToggle={(status, id) => updateCheckedList(status, id)}
            delete={id => {
              deleteTodo(id);
            }}
          />
        ))}
      </ul>
    </div>
  );
}

const Todo = props => {
  const [isChecked, setChecked] = useState(false);

  return (
    <li className={`todo-item ${isChecked ? "is-done" : ""}`}>
      {props.todo}
      <button className="todo-remove" onClick={() => props.delete(props.id)}>
        remove
      </button>
      <input
        className="todo-checkbox"
        type="checkbox"
        onChange={e => {
          setChecked(e.target.checked);
          props.onToggle(e.target.checked, props.id);
        }}
      />
    </li>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
