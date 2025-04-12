import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoals } from '../redux/goalSlice';
import { fetchTasks, addTask } from '../redux/taskSlice';

const Goal = () => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals.data);
  const tasks = useSelector((state) => state.tasks.data);
  
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  const handleGoalClick = (goalId) => {
    setSelectedGoalId(goalId);
    dispatch(fetchTasks(goalId));
  };

  const handleAddTask = () => {
    if (!taskInput.trim()) return;
    dispatch(addTask({ title: taskInput, goalId: selectedGoalId }))
      .then(() => {
        setTaskInput('');
        setShowTaskModal(false);
        dispatch(fetchTasks(selectedGoalId)); 
      });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-white mb-6">Goals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {goals.map((goal) => (
          <div
            key={goal._id}
            className="p-4 rounded-lg cursor-pointer shadow-md hover:shadow-xl transition duration-300 bg-gray-700"
            onClick={() => handleGoalClick(goal._id)}
          >
            <h2 className="font-semibold text-lg text-white">{goal.title}</h2>
          </div>
        ))}
      </div>
      
      {selectedGoalId && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-2 text-white">Tasks</h2>
          
          {tasks.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className="bg-blue-700 text-white p-2 rounded-md border border-blue-500 hover:bg-blue-600 transition-colors"
                >
                  {task.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 mb-2">No tasks found for this goal.</p>
          )}
          
          <button
            onClick={() => setShowTaskModal(true)}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Add Task
          </button>
        </div>
      )}
      
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4 text-white">Add New Task</h2>
            <input
              type="text"
              placeholder="Task Title"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-4 bg-gray-700 text-white border-gray-600"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowTaskModal(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-4 p-3 bg-blue-900 bg-opacity-50 rounded-lg">
        <p className="text-blue-300 text-sm font-medium">
          Tip: Click on tasks to view them. You can add or modify tasks related to your goals.
        </p>
      </div>
    </div>
  );
};

export default Goal;










