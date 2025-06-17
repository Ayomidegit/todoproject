import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTodo } from "../hooks/useTodo";
import { useUpdateTodo } from "../hooks/useUpdateTodo";
import { useDeleteTodo } from "../hooks/useDeleteTodo";
import "../styles/TodoDetailPage.css";

const TodoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: todo, isLoading, error } = useTodo(id);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const { mutate: updateTodo, isLoading: saving } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setCompleted(todo.completed);
    }
  }, [todo]);

  const handleSave = () => {
    updateTodo(
      { ...todo, title, completed },
      {
        onSuccess: () => alert("Todo updated!"),
        onError: () => alert("Update failed."),
      }
    );
  };

  const handleDelete = () => {
    const confirmed = confirm("Are you sure you want to delete this todo?");
    if (!confirmed) return;

    deleteTodo(id, {
      onSuccess: () => {
        alert("Todo deleted.");
        navigate("/");
      },
      onError: () => alert("Failed to delete."),
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load todo.</p>;

  return (
    <main className="todo-detail-page">
      <section className="todo-detail">
        <h2 className="todo-detail__title">Edit Todo #{todo.id}</h2>
        <input
          className="todo-detail__input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="todo-detail__checkbox">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Completed
        </label>
        <div className="todo-detail__actions">
          <button
            className="todo-detail__button todo-detail__button--save"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            className="todo-detail__button todo-detail__button--back"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
          <button
            className="todo-detail__button todo-detail__button--delete"
            onClick={handleDelete}
          >
            🗑️ Delete
          </button>
        </div>
      </section>
    </main>
  );
};

export default TodoDetailPage;
