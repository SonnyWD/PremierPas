import { useEffect, useState } from "react";
import { fetchTodos } from "../../services/todoService";
import Card from "../../components/card";

function TodosList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos()
      .then((response) => {
        setTodos(response);
        setLoading(false);
      })
      .catch((error) => {
        setError('Erreur lors du chargement');
        setLoading(false);
        console.error(error);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;


  const groupedTodos = todos.reduce((acc, todo) => {

    if (!acc[todo.title]) {
      acc[todo.title] = [];
    }

    acc[todo.title].push(todo);
    return acc;
  }, {});

  return (
    <div className="bg-orange-50 pb-20">
      <div className="flex justify-between items-center pt-3">
        <h1 className="font-black gap-4 pl-5 pt-6 pb-4 font-light text-xl">Todos</h1>
      </div>

      <ul>

        {Object.keys(groupedTodos).map((title, index) => (
          <li key={index} className="mt-5 mb-5">
            <div className="border p-4 rounded-lg shadow-lg">

              <h3 className="font-bold mb-3">{title}</h3>

              <div className="grid grid-cols-1 gap-4">
                {groupedTodos[title].map((todo) => (
                  <Card key={todo.id} description={todo.description} />
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodosList;
