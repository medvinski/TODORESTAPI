import React, { useState, useEffect } from "react";
import "./App.css";
import useFetch from "use-http";
import Input from "./components/Input";
import ListTodo from "./components/ListTodo";
import axios from "axios";

interface Tasks {
  id: string;
  todo: string;
}

function App() {
  const HOST = "http://localhost:5000";
  const PATH = "/tasks";
  const { response, error, get } = useFetch(HOST);

  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [advice, setAdvice] = useState<string | null>(null);
  const [joke, setJoke] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  async function getTasks() {
    const data: Tasks[] = await get(PATH);
    if (response.ok) {
      setTasks(data);
    } else {
      console.log(error);
    }
  }

  const fetchAdvice = async () => {
    try {
      const response = await axios.get("https://api.adviceslip.com/advice");
      const adviceData: string = response.data.slip.advice;
      setAdvice(adviceData);
    } catch (error) {
      console.error("Error fetching advice:", error);
    }
  };

  const fetchJoke = async (): Promise<void> => {
    try {
      const response = await axios.get(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const jokeData: string =
        response.data.setup + " " + response.data.punchline;
      setJoke(jokeData);
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
  };

  useEffect(() => {
    getTasks();
    fetchAdvice();
    fetchJoke();

    // Update current time every second
    const interval = setInterval(() => {
      const date = new Date();
      const time = date.toLocaleTimeString();
      setCurrentTime(time);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []); // Fetch tasks, advice, and joke once on initial component mount

  return (
    <div className="App" data-testid="background">
      <header>My To-do List</header>
      {response.ok ? (
        <>
          <ListTodo tasks={tasks} setTasks={setTasks} getTasks={getTasks} />
          <Input tasks={tasks} setTasks={setTasks} />
        </>
      ) : (
        <p>Loading tasks...</p>
      )}
      {advice && (
        <div className="advice-box" data-testid="advice">
          <h3>Advice:</h3>
          <p>{advice}</p>
        </div>
      )}
      {joke && (
        <div className="joke-box" data-testid="joke">
          <h3>Joke:</h3>
          <p>{joke}</p>
        </div>
      )}
      <div className="clock">
        <h3>Current Time:</h3>
        <p>{currentTime}</p>
      </div>
    </div>
  );
}

export default App;
