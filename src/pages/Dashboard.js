import React, { useState } from "react";

function HabitTracker() {
  const [habits, setHabits] = useState([
    { id: 1, name: "Exercise", completed: false },
    { id: 2, name: "Drink water", completed: true },
    { id: 3, name: "Meditate", completed: false },
  ]);

  const handleToggle = (id) => {
    const newHabits = habits.map((habit) => {
      if (habit.id === id) {
        return { ...habit, completed: !habit.completed };
      } else {
        return habit;
      }
    });
    setHabits(newHabits);
  };

  return (
    <div>
      <h1>Habit Tracker</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Habit</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((habit) => (
            <tr key={habit.id}>
              <td>{habit.id}</td>
              <td>{habit.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={habit.completed}
                  onChange={() => handleToggle(habit.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HabitTracker;
