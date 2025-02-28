import { useState } from "react";

function WorkoutBuddy() {
  const [workouts, setWorkouts] = useState([{ id: 1, title: "", load: "", reps: "", submitted: false }]);

  const handleInputChange = (id, field, value) => {
    setWorkouts((prev) =>
      prev.map((workout) =>
        workout.id === id ? { ...workout, [field]: value } : workout
      )
    );
  };

  const handleSubmit = (id) => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();
    const formattedDate = now.toLocaleDateString();

    setWorkouts((prev) =>
      prev.map((workout) =>
        workout.id === id
          ? { ...workout, submitted: true, date: formattedDate, time: formattedTime }
          : workout
      )
    );
  };

  const handleEdit = (id) => {
    setWorkouts((prev) =>
      prev.map((workout) =>
        workout.id === id ? { ...workout, submitted: false } : workout
      )
    );
  };

  const handleDelete = (id) => {
    setWorkouts((prev) => prev.filter((workout) => workout.id !== id));
  };

  const addNewWorkout = () => {
    setWorkouts((prev) => [
      ...prev,
      { id: prev.length + 1, title: "", load: "", reps: "", submitted: false },
    ]);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ color: "#333", fontSize: "28px" }}>🏋️ Workout Buddy</h2>

      <button
        onClick={addNewWorkout}
        style={{
          padding: "10px",
          background: "#008CBA",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      >
        ➕ Add Workout
      </button>

      {workouts.map((workout) => {
        const isEmpty = !workout.title && !workout.load && !workout.reps;

        return (
          <div
            key={workout.id}
            style={{
              border: "2px solid #ff9800",
              borderRadius: "10px",
              padding: "15px",
              margin: "15px auto",
              width: "350px",
              background: "#f5f5f5",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            {!workout.submitted ? (
              <>
                <input
                  type="text"
                  value={workout.title}
                  onChange={(e) => handleInputChange(workout.id, "title", e.target.value)}
                  placeholder="Exercise Name..."
                  style={{
                    padding: "10px",
                    width: "250px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    marginBottom: "10px",
                    fontSize: "16px",
                  }}
                />
                <input
                  type="number"
                  value={workout.load}
                  onChange={(e) => handleInputChange(workout.id, "load", e.target.value)}
                  placeholder="Load (kg/lbs)..."
                  style={{
                    padding: "10px",
                    width: "250px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    marginBottom: "10px",
                    fontSize: "16px",
                  }}
                />
                <input
                  type="number"
                  value={workout.reps}
                  onChange={(e) => handleInputChange(workout.id, "reps", e.target.value)}
                  placeholder="Reps..."
                  style={{
                    padding: "10px",
                    width: "250px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    marginBottom: "10px",
                    fontSize: "16px",
                  }}
                />
                <button
                  onClick={() => handleSubmit(workout.id)}
                  style={{
                    padding: "10px",
                    background: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "16px",
                    marginTop: "10px",
                  }}
                >
                  Submit
                </button>

                {isEmpty && (
                  <button
                    onClick={() => handleDelete(workout.id)}
                    style={{
                      padding: "8px",
                      background: "#e74c3c",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "14px",
                      marginTop: "10px",
                      marginLeft: "10px",
                    }}
                  >
                    ❌ Delete
                  </button>
                )}
              </>
            ) : (
              <div
                style={{
                  background: "linear-gradient(135deg, #ff9800, #ff5722)",
                  color: "white",
                  padding: "12px",
                  borderRadius: "8px",
                  textAlign: "left",
                }}
              >
                <h3>✅ Exercise: {workout.title}</h3>
                <p>🏋️ Load: {workout.load} kg/lbs</p>
                <p>🔄 Reps: {workout.reps}</p>
                <small>📅 Date: {workout.date} | ⏰ Time: {workout.time}</small>
                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={() => handleEdit(workout.id)}
                    style={{
                      padding: "8px",
                      background: "#ffcc00",
                      color: "black",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "14px",
                      marginRight: "10px",
                    }}
                  >
                    ✏ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(workout.id)}
                    style={{
                      padding: "8px",
                      background: "#e74c3c",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    ❌ Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default WorkoutBuddy;
