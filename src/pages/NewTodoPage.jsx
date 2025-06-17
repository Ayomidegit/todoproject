import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateTodo } from "../hooks/useCreateTodo";
import "../styles/NewTodoPage.css";

const NewTodoPage = () => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const { mutate: createTodo, isLoading } = useCreateTodo();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.body.classList.toggle("dark", theme === "dark");
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      title,
      completed,
      userId: 1,
    };

    createTodo(newTodo, {
      onSuccess: (data) => {
        alert(`Todo created with id ${data.id}`);
        navigate("/");
      },
      onError: () => {
        alert("Creation failed.");
      },
    });
  };

  return (
    <main className="new-todo__container">
      <h2 className="new-todo__heading">Create New Todo</h2>
      <form onSubmit={handleSubmit} className="new-todo__form">
        <div className="new-todo__field">
          <label>Title: </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="new-todo__input"
          />
        </div>

        <div className="new-todo__field">
          <label>Status: </label>
          <select
            value={completed}
            onChange={(e) => setCompleted(e.target.value === "true")}
            className="new-todo__select"
          >
            <option value="false">Incomplete</option>
            <option value="true">Completed</option>
          </select>
        </div>

        <button type="submit" className="new-todo__button" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create"}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="new-todo__back"
        >
          Back
        </button>
      </form>
    </main>
  );
};

export default NewTodoPage;
