import { List, Input, Button } from "antd";
import { CloseCircleTwoTone, EditTwoTone } from "@ant-design/icons";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import "antd/dist/antd.css";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [inputError, setInputError] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setTodo(value);
  };

  const handleAddTodo = () => {
    const trimmed = todo.trim();
    if (!trimmed) {
      setInputError("Todo item can`t be empty");
      return;
    }

    const payload = {
      title: todo,
      id: uuid(),
    };

    const updatedList = [...todoList, payload];
    setTodoList(updatedList);
    setTodo("");
    setInputError("");
  };

  const handleRemoveTodo = (id) => {
    const filtered = todoList.filter((item) => item.id !== id);
    setTodoList(filtered);
  };

  const handleItemClick = (item) => {
    setEditTodo(item);
  };

  const handleTarget = (event) => {
    const { value } = event.target;
    const newItem = {...editTodo};
    newItem.title = value;
    setEditTodo(newItem)
  };

  const handleSave = () => {
    const array = todoList.map(item => {
      if (item.id === editTodo.id) {
        item.title = editTodo.title
      }
      return item
   })
   
   setTodoList(array)
    setEditTodo(null)
  }

  const handleKeyDown = (key) => {
    if (key.code === 'Enter') {
      handleSave()
    }
  }

  return (
    <div className="App">

      <h1>Ant Design To-do List - React HW-5 - Nurbek Beisheev</h1>
      <div className="todo-container">
        <div className="header-wrapper">
          <div className="header-controls">
          <Input
            type="text"
            value={todo}
            onChange={handleInputChange}
            placeholder="Enter To-do item"
          />
          <Button onClick={handleAddTodo} type="primary">
            Add To-do
          </Button>
          </div>
          {inputError && <div className={"error"}>{inputError}</div>}
        </div>

        <div className="items-wrapper">
          <List
            itemLayout="horizontal"
            dataSource={todoList}
            renderItem={(item) => {
              return (
                <List.Item
                  target={editTodo}
                  key={item.id}
                >
                  {editTodo?.id === item.id 
                  ? ( <Input
                      value={editTodo?.title}
                      onChange={handleTarget}
                      type="text"
                      onKeyDown={handleKeyDown}
                    />
                  ) 
                  : ( <List.Item.Meta title={item.title} />
                  )}
                  <div className="icons-wrapper">
                    <EditTwoTone onClick={() => handleItemClick(item)} />
                    <CloseCircleTwoTone
                      onClick={() => handleRemoveTodo(item.id)}
                    />
                  </div>
                </List.Item>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
