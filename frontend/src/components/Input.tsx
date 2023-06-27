import React, { useState } from "react";
import useFetch from "use-http";

const HOST = "http://localhost:5000";
const PATH = "/tasks";

interface Tasks {
  id: string;
  todo: string;
}

type SetProps = {
  tasks: Tasks[];
  setTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
};
export default function Input({ tasks, setTasks }: SetProps) {
  const [todo, setTodo] = useState<string>("");
  const { error, response, post } = useFetch(HOST);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addTasks();
    (document.getElementById("input") as HTMLInputElement).value = "";
    setTodo("");
  }

  async function addTasks() {
    const newItem: Tasks = await post(PATH, { todo });
    if (response.ok) {
      setTasks([...tasks, newItem]);
    } else {
      console.log(error);
    }
  }
  return (
    <>
      <div className="addTodo">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="text"
            id="input"
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className="submit">
            <i className="fas fa-arrow-up"></i>
          </button>
        </form>
      </div>
    </>
  );
}
