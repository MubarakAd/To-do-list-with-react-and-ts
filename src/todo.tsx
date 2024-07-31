import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface ToDo {
  id: number;
  text: string;
}

const ToDoList: React.FC = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [editTodo, setEditTodo] = useState<ToDo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    if (newTodo.trim() === '') {
      setError('Task cannot be empty');
      return;
    }
    setTodos([...todos, { id: Date.now(), text: newTodo }]);
    setNewTodo('');
    setError(null); // Clear error on successful addition
  };

  const handleEdit = (todo: ToDo) => {
    setEditTodo(todo);
    setNewTodo(todo.text);
  };

  const handleSaveEdit = () => {
    if (newTodo.trim() === '') {
      setError('Task cannot be empty');
      return;
    }
    if (editTodo) {
      setTodos(todos.map(todo =>
        todo.id === editTodo.id ? { ...todo, text: newTodo } : todo
      ));
      setEditTodo(null);
      setNewTodo('');
      setError(null); // Clear error on successful edit
    }
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-12 col-md-8 col-lg-6">
        <h2 className="text-center mb-4">{editTodo ? 'Edit ToDo' : 'Add ToDo'}</h2>
        
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={editTodo ? handleSaveEdit : handleAdd}
          >
            {editTodo ? 'Save' : 'Add'}
          </button>
        </div>
        
        <ul className="list-group">
          {todos.map(todo => (
            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
              {todo.text}
              <div>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(todo)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(todo.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
