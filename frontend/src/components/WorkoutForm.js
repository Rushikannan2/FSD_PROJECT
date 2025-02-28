import { useState } from "react";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!title || !load || !reps) {
      setError("Please fill in all fields");
      return;
    }

    const workout = { title, load: Number(load), reps: Number(reps) };

    try {
      const response = await fetch("http://localhost:5000/api/workouts", {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "Failed to add workout");
      } else {
        setTitle("");
        setLoad("");
        setReps("");
        setError(null);
        console.log("New workout added", json);
      }
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Enter exercise name"
      />

      <label>Load (in Kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        placeholder="Enter weight"
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        placeholder="Enter reps"
      />

      <button type="submit">Add Workout</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
