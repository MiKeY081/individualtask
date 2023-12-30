import AddToDo from './AddToDo';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckSquare, FaSquare, FaTrash } from 'react-icons/fa';
import UserContext from './context/UserContext';

function Home() {
  const [todos, setTodos] = useState([])
  const {user} = useContext(UserContext)

  useEffect(() => {
   try {
     axios.get("/home").then(res => setTodos(res.data.user.task))
     console.log("first")
   } catch (error) {
    console.log(error)
   }
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/deletetask/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    } catch (error) {
      console.log(error.message);
    }
  };
  // const editProduct = async (id)  =>  {
  //      try {
  //     const task = await axios.put("/updatetask/"+id)
  //     .then(res => setTodos(res.data.user.task))
  //      } catch (error) {
  //    }
  // }
  
  
  return (
  !user ?
   <div>User doesnt exists</div>:

    <div className='grid place-content-center h-screen w-screen bg-gray-100'>
      <AddToDo setTodos={setTodos} />
      {todos?.length === 0 ? (
        <div className='text-gray-600 text-xl'>No records found</div>
      ) : (
        todos.reverse().map((todo, index) => (
          <div key={index} className='flex items-center gap-4 mt-4 p-3 bg-white rounded shadow justify-between'>
            {/* <button
              onClick={() => editProduct(todo.id)}
              className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800'
            >
              <FaTrash className='h-5 w-5' />
            </button> */}
              <div className='text-black text-xl ml-10'>{todo.task}</div>

            <button
              onClick={() => deleteProduct(todo.id)}
              className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800'
            >
              <FaTrash className='h-5 w-5' />
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
