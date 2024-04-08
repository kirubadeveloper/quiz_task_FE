/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newTodoText, setNewTodoText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, [currentPage]);

  // `http://localhost:5000/api/getTodo?page=${currentPage}`

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://todo-task-be.onrender.com/api/getTodo?page=${currentPage}`
      );
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage === 1 ? 1 : prevPage - 1));
  };

  const handleAddTodo = async () => {
    try {
      await axios.post("https://todo-task-be.onrender.com/api/addTodo", {
        text: newTodoText,
      });
      setNewTodoText("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleEditTodo = async (id, newText) => {
    try {
      await axios.put(`https://todo-task-be.onrender.com/api/updateTodo/${id}`, {
        text: newText,
      });
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`https://todo-task-be.onrender.com/api/deleteTodo/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Kiruba's Todo List</h1>

      <input
        type="text"
        placeholder="Enter new task"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid black",
          width: "70%",
          maxWidth: "500px",
        }}
      />
      <button
        onClick={handleAddTodo}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0096FF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginLeft: "10px",
        }}
      >
        Add Task
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: "0",
            marginTop: "30px",
            width: "90%",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          {todos.map((todo) => (
            <li
              key={todo._id}
              style={{
                marginBottom: "10px",
                backgroundColor: "#f4f4f4",
                padding: "10px",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{todo.text}</span>{" "}
              <span>
                <button
                  onClick={() =>
                    handleEditTodo(
                      todo._id,
                      prompt("Enter new text", todo.text)
                    )
                  }
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "green",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "5px",
                  }}
                >
                  Edit
                </button>{" "}
                <button
                  onClick={() => handleDeleteTodo(todo._id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "red",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0096FF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Previous Page
        </button>
        <button
          onClick={handleNextPage}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0096FF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default App;
