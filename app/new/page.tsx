"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCreateTodo } from "@/hooks/useCreateTodo";
import { Todo } from "@/api/todos";
import "@/styles/NewTodoPage.css";

const NewTodoPage: React.FC = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const { mutate: createTodo, isPending } = useCreateTodo({
    onSuccess: (data) => {
      alert(`Todo created with id ${data.id}`);
      router.push("/");
    },
    onError: () => {
      alert("Creation failed.");
    },
  });

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.body.classList.toggle("dark", theme === "dark");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTodo: Omit<Todo, "id"> = {
      title,
      completed,
      userId: 1,
    };

    createTodo(newTodo);
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            className="new-todo__input"
          />
        </div>

        <div className="new-todo__field">
          <label>Status: </label>
          <select
            value={completed.toString()}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCompleted(e.target.value === "true")
            }
            className="new-todo__select"
          >
            <option value="false">Incomplete</option>
            <option value="true">Completed</option>
          </select>
        </div>

        <button type="submit" className="new-todo__button" disabled={isPending}>
          {isPending ? "Creating..." : "Create"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="new-todo__back"
        >
          Back
        </button>
      </form>
    </main>
  );
};

export default NewTodoPage;
