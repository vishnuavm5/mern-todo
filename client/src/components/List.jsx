import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const List = ({ todo, id, completed, setUpdateUI }) => {
  const [cookies, _] = useCookies(["access_token"]);
  const handleDelete = async (id) => {
    //console.log(id);
    await axios.delete(
      `http://localhost:3000/todo/delete`,

      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${cookies.access_token}`,
        },
        data: { id },
      }
    );
    setUpdateUI((prev) => !prev);
  };

  const handleComplete = async () => {
    await axios.put(
      `http://localhost:3000/todo/update`,
      { id, completed: true },
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        className="card w-96 card-bordered"
        style={{ marginBottom: "10px", borderColor: "#641AE6" }}
      >
        <h4 className="card-title" style={{ padding: "10px" }}>
          {todo}
        </h4>
        <div className="card-actions justify-end" style={{ padding: "10px" }}>
          <button
            className="btn btn-primary"
            onClick={handleComplete}
            style={{ backgroundColor: completed && "Green" }}
          >
            {completed ? "Completed" : "Complete"}
          </button>
          <button className="btn  btn-ghost" onClick={() => handleDelete(id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default List;
