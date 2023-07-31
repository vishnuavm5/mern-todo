import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import List from "../components/List";
import AddTodo from "../components/AddTodo";

const Todo = () => {
  const [cookies, _] = useCookies(["access_token"]);
  const [todos, setTodos] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/todo/get`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${cookies.access_token}`,
        },
      })
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => console.log(err));
  }, [updateUI]);
  console.log(todos);
  return (
    <div className="flex flex-col justify-center ">
      <div>
        <AddTodo setUpdateUI={setUpdateUI} />
      </div>
      <div>
        {todos.map((item) => (
          <List
            key={item._id}
            todo={item.todo}
            id={item._id}
            completed={item.completed}
            setUpdateUI={setUpdateUI}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
