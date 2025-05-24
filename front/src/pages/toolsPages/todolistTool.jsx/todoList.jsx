import { useEffect, useState } from "react";
import { fetchTodos } from "../../../services/todoService";
import Card from "../../../components/card";
import Btn from "../../../components/btn";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useUser } from "../../../context/userContext";

const premiumContents = ['Préparer le retour à la maison', 'Préparer la valise de maternité']; 

function TodosList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTodo, setShowTodo] = useState({});
  const { user } = useUser(); 
  const isPremium = user?.isPremium;

  useEffect(() => {
    if (user !== null) return; 
      console.log("User isPremium:", user?.isPremium);

      const fetchAllTodos = async () => {
        try {
          const allTodos = await fetchTodos();

          const todos = allTodos.map(todo => ({
            ...todo,
            locked: premiumContents.includes(todo.title) && !user?.isPremium
          }));

          setTodos(todos);
          setLoading(false);
        } catch (error) {
          setError('Erreur lors du chargement');
          setLoading(false);
        }
      };

      fetchAllTodos();
    
  }, [user]);



  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;


  const groupedTodos = todos.reduce((acc, todo) => {

    if (!acc[todo.title]) {
      acc[todo.title] = [];
    }

    acc[todo.title].push(todo);
    return acc;
  }, {});

  const toggleTodo = (title) => {
    const isLocked = groupedTodos[title]?.some(todo => todo.locked);
    if (isLocked) {
      return;
    }

    setShowTodo(prevShowTodo => ({
      ...prevShowTodo,             
      [title]: !prevShowTodo[title]
    }));
  };

  return (
    <div className="bg-orange-50 pb-20 h-screen">
      <div className="flex justify-between items-center pt-3">
        <h1 className="font-black gap-4 pl-5 pt-6 pb-4 text-xl">Todos</h1>
      </div>

      <ul>

        {Object.keys(groupedTodos).map((title, index) => (
          <li key={index} className="mt-5 mb-5">
            <div className="border p-4 rounded-lg shadow-lg">
            <div className="flex justify-between">
              <h3 className="font-bold mb-3">{title}</h3>
              <Btn onClick={ () => toggleTodo(title)}>
                  {showTodo[title] ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </Btn>
            </div>
              

              {showTodo[title] ? (
                 <div className="grid grid-cols-1 gap-4">
                {groupedTodos[title].map((todo) => (
                  <Card key={todo.id} description={todo.description} locked={todo.locked}/>
                ))}
              </div>
              ) :
              ("")
              }
             
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodosList;
