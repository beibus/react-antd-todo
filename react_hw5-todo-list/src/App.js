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
  const [currentTodo, setCurrentTodo] = useState(null);
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
    setCurrentTodo(item);
  };

  const handleTarget = (event) => {
    const { value } = event.target;
    const newItem = {}
  };

  return (
    <div className="App">
      <div className="todo-container">
        <div className="header-wrapper">
          <Input
            value={todo}
            onChange={handleInputChange}
            type="text"
            placeholder="Enter To-do item"
          />
          <Button onClick={handleAddTodo} type="primary">
            Add To-do
          </Button>
          {inputError && <div className={"error"}>{inputError}</div>}
        </div>

        <div className="items-wrapper">
          <List
            itemLayout="horizontal"
            dataSource={todoList}
            renderItem={(item) => {
              return (
                <List.Item
                  onEdit={() => setEditTodo(item)}
                  target={editTodo}
                  key={item.id}
                >
                  {editTodo?.id === item.id 
                  ? ( <Input
                      value={editTodo?.name}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Enter To-do item"
                    />
                  ) 
                  : ( <List.Item.Meta title={item.title} />
                  )}
                  <div className="icons-wrapper">
                    <EditTwoTone onClick={() => setEditTodo(item.name)} />
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
