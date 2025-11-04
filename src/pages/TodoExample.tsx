import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Todo {
  id: string;
  task: string;
  is_complete: boolean;
  created_at: string;
}

function TodoExample() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getTodos() {
      try {
        setLoading(true);
        const { data: todos, error } = await supabase
          .from('todos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (todos && todos.length > 0) {
          setTodos(todos);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    getTodos();
  }, []);

  if (loading) {
    return <div className="p-4">Loading todos...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      {todos.length === 0 ? (
        <p className="text-gray-500">No todos found.</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`p-3 border rounded-lg ${
                todo.is_complete ? 'bg-green-50 line-through' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{todo.task}</span>
                <span className="text-sm text-gray-500">
                  {new Date(todo.created_at).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoExample;
