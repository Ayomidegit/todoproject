import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchTodos, updateTodo, deleteTodo, Todo } from "../api/todos";
import EditTodoForm from "../components/EditTodoForm";
import "../styles/TodoListPage.css";

const TodoListPage: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    data: todos = [],
    isLoading,
    isError,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const updateMutation = useMutation<Todo, unknown, Todo>({
    mutationFn: updateTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteMutation = useMutation<boolean, unknown, number>({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [advice, setAdvice] = useState("");

  const todosPerPage = 10;

  const filteredTodos = todos.filter((todo: Todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "completed"
        ? todo.completed
        : !todo.completed;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTodos.length / todosPerPage)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredTodos.length, totalPages]);

  const indexOfLastTodo = currentPage * todosPerPage;
  const currentTodos = filteredTodos.slice(
    indexOfLastTodo - todosPerPage,
    indexOfLastTodo
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const fetchAdvice = async () => {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
  };

  if (isLoading) return <p>Loading todos...</p>;
  if (isError) return <p>Failed to load todos.</p>;

  return (
    <main className="todo">
      <header className="todo__header">
        <h1 className="todo-header__title">📝 My Todo App</h1>
        <h2>{advice}</h2>
        <button className="todo__advice-button" onClick={fetchAdvice}>
          Get Advice
        </button>
      </header>

      <section className="todo__content">
        <Link to="/new">
          <button className="todo__add-button">➕ Add New Todo</button>
        </Link>

        <div className="todo__controls">
          <input
            type="text"
            placeholder="Search todos..."
            className="todo__search"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
          <select
            className="todo__filter"
            value={filter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFilter(e.target.value)
            }
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>

        {filteredTodos.length === 0 ? (
          <p className="todo__no-todos">No todos match your search/filter.</p>
        ) : (
          <ul className="todo__list">
            {currentTodos.map((todo: Todo) => (
              <li className="todo__item" key={todo.id}>
                {editingTodoId === todo.id ? (
                  <EditTodoForm
                    todo={todo}
                    onUpdate={(updatedTodo) => {
                      updateMutation.mutate(updatedTodo);
                      setEditingTodoId(null);
                    }}
                    onCancel={() => setEditingTodoId(null)}
                  />
                ) : (
                  <>
                    <Link to={`/todos/${todo.id}`} className="todo__link">
                      <strong className="todo__title">{todo.title}</strong> –{" "}
                      {todo.completed ? "✅ Completed" : "❌ Incomplete"}
                    </Link>
                    <div className="todo__actions">
                      <button
                        className="todo__edit-btn"
                        onClick={() => setEditingTodoId(todo.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="todo__delete-btn"
                        onClick={() => deleteMutation.mutate(todo.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="todo_pagination" style={{ marginTop: "1rem" }}>
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="todo__page-btn"
          >
            Prev
          </button>
          <span className="todo__page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="todo__page-btn"
          >
            Next
          </button>
        </div>
      </section>

      <div className="todo__footer-line"></div>
      <footer className="todo__footer">
        <p className="todo__footer-text">
          &copy; {new Date().getFullYear()}{" "}
          <span>
            <i>Ayomide Akanbi</i>
          </span>{" "}
          My Todo App
        </p>
      </footer>
    </main>
  );
};

export default TodoListPage;
