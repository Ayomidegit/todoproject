import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import TodoListPage from "./pages/TodoListPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import NotFoundPage from "./hooks/NotFoundPage";
import NewTodoPage from "./pages/NewTodoPage";

const BrokenPage = () => {
  throw new Error("Intentional Error!");
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoListPage />} />
      <Route path="/todos/:id" element={<TodoDetailPage />} />
      <Route path="/broken" element={<BrokenPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/new" element={<NewTodoPage />} />
    </Routes>
  );
};
export default App;
