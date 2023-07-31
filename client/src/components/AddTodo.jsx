import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const AddTodo = ({ setUpdateUI }) => {
  const [todo, setTodo] = useState("");
  const [cookies, _] = useCookies(["access_token"]);

  const handleAdd = async () => {
    await axios.post(
      `http://localhost:3000/todo/add`,
      { todo },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${cookies.access_token}`,
        },
      }
    );
    setUpdateUI((prev) => !prev);
  };
  return (
    <div
      className="flex flex-row justify-center"
      style={{
        marginBottom: "50px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <input
          type="text"
          placeholder="Add Todo"
          className="input input-bordered input-primary w-full max-w-xl ml-20"
          style={{ width: "400px" }}
          onChange={(event) => setTodo(event.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
