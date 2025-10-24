"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTodo } from "@/hooks/useTodo";
import { useUpdateTodo } from "@/hooks/useUpdateTodo";
import { useDeleteTodo } from "@/hooks/useDeleteTodo";
import "../../../../src/styles/TodoDetailPage.css";

const TodoDetailPage: React.FC = () => {
  const params = useParams();
  const id = params!.id as string;

  const router = useRouter();

  const { data: todo, isLoading, error } = useTodo({ id: Number(id) });
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const { mutate: updateTodo, isPending: saving } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setCompleted(todo.completed);
    }
  }, [todo]);

  const handleSave = () => {
    if (!todo) return;
    updateTodo(
      { ...todo, title, completed },
      {
        onSuccess: () => alert("Todo updated!"),
        onError: () => alert("Update failed."),
      }
    );
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (!confirmed || !id) return;

    deleteTodo(Number(id), {
      onSuccess: () => {
        alert("Todo deleted.");
        router.push("/");
      },
      onError: () => alert("Failed to delete."),
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load todo.</p>;

  if (!todo) {
    return <p>Todo not found. Returning to home...</p>;
  }

  return (
    <main className="todo-detail-page">
      <section className="todo-detail">
        <h2 className="todo-detail__title">Edit Todo #{todo.id}</h2>
        <input
          className="todo-detail__input"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <label className="todo-detail__checkbox">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCompleted(e.target.checked)
            }
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
            onClick={() => router.back()}
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
