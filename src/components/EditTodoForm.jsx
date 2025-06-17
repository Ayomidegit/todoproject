import React, { useState, useEffect } from "react";
import { useUpdateTodo } from "../hooks/useUpdateTodo";
import "../styles/EditTodoForm.css"; // ONE global CSS file only

const EditTodoForm = ({ todo, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);

  const { mutate: updateTodo, isLoading } = useUpdateTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTodo = { ...todo, title, completed };
    updateTodo(updatedTodo, {
      onSuccess: (data) => {
        onUpdate(data);
        onCancel();
      },
      onError: () => {
        alert("Failed to update todo.");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="todo__edit-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="todo__edit-input"
      />
      <select
        value={completed}
        onChange={(e) => setCompleted(e.target.value === "true")}
        className="todo__edit-select"
      >
        <option value="false">Incomplete</option>
        <option value="true">Completed</option>
      </select>
      <button
        type="submit"
        className="todo__edit-save-button"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="todo__edit-cancel-button"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditTodoForm;
