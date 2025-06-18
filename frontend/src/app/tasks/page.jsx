'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

export default function Dashboard() {
  const [allTasks, setAllTasks] = useState([]);
  const [error, setError] = useState('');

  // Form states for Create Task function
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    async function fetchAllTasks() {
      try {
        const res = await fetch('http://localhost:8080/task/all');
        const data = await res.json();
        setAllTasks(data);
        console.log("Fetched tasks:", data);
      } catch (e) {
        console.log("Could not fetch all tasks", e);
        setError("Could not fetch all tasks");
      }
    }

    fetchAllTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSuccessMsg('');

    try {
      const res = await fetch("http://localhost:8080/task/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          title,
          description,
          status,
          dueDate,
        }),
      });

      if (!res.ok) throw new Error("Failed to create task");

      setSuccessMsg("Task created successfully!");
      setTitle('');
      setDescription('');
      setStatus('');
      setDueDate('');
    } catch (e) {
      console.error("Error creating task:", e);
      setSubmitError("Could not create task. Please check the fields.");
    }
  };

  if (error) return <p>{error}</p>;
  if (!allTasks || allTasks.length === 0) return <p>Loading tasks...</p>;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <TabGroup>
        <TabList>
          <Tab>Dashboard</Tab>
          <Tab>Create a Task</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <h2 className="text-2xl font-bold mb-4">Tasks</h2>
            <ul className="space-y-4">
              {allTasks.map((task) => (
                <li
                  key={task.id}
                  className="border border-gray-300 rounded-lg p-4 bg-white text-black shadow-md"
                >
                  <h3 className="text-lg font-bold">{task.title}</h3>
                  <p>Description: {task.description || '-'}</p>
                  <p>Status: {task.status}</p>
                  <p>Due date: {task.dueDate}</p>
                  <Link href={`/tasks/${task.id}`} className="text-blue-500 underline">
                    View/Manage
                  </Link>
                </li>
              ))}
            </ul>
          </TabPanel>

          <TabPanel>
            <form
              onSubmit={handleSubmit}
              className="bg-gray-800 text-white p-6 rounded-lg space-y-6 max-w-xl"
            >
              {submitError && <p className="text-red-400">{submitError}</p>}
              {successMsg && <p className="text-green-400">{successMsg}</p>}

              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                <p className="text-sm text-gray-400 mb-1">Optional, must be left empty or at least 10 chars</p>
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
                <p className="text-sm text-gray-400 mb-1">Use "In Progress" or "Completed"</p>
                <input
                  id="status"
                  name="status"
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
                  required
                />
              </div>

              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium mb-1">Due Date</label>
                <input
                  id="dueDate"
                  name="dueDate"
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
              >
                Create Task
              </button>
            </form>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}
