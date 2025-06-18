'use client';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function Task() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);
  const [taskStatus, setTaskStatus] = useState('');

  useEffect(() => {
    async function fetchTask() {
      try {
        const res = await fetch(`http://localhost:8080/task/${id}`);
        const data = await res.json();
        setTask(data);
        if (data?.status) {
          setTaskStatus(data.status);
          console.log("Task status is: ", data.status);
        }
      } catch (e) {
        console.log("Could not fetch task: ", e);
        setError("Failed to load task");
      }
    }

    fetchTask();
  }, [id]);

  const updateTaskStatus = async () => {
    try {
      const res = await fetch(`http://localhost:8080/task/${task.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: taskStatus }),
      });

      if (!res.ok) throw new Error('Failed to update task');

      const updated = await res.json();
      setTask(updated);
      setTaskStatus(updated.status);
      alert('Task status updated successfully!');
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to update task status.');
    }
  };

  const deleteTask = async () => {
    try {
      const res = await fetch(`http://localhost:8080/task/${task.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete task');

      alert("Task successfully deleted!");
      router.push("/tasks");
    } catch (e) {
      console.log("Could not delete task", e);
      setError("Failed to delete task");
    }
  };
  if (error) return <p>{error}</p>;
  if (!task) return <p>Loading task...</p>;

  return (
    <>
      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Tasks</h2>
        <ul className="space-y-4">
          <li
            key={task.id}
            className="border border-gray-300 rounded-lg p-4 bg-white text-black shadow-md"
          >
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p>Description: {task.description || '-'}</p>
            <p>Status: {task.status}</p>
            <p>Due date: {task.dueDate}</p>
            <Link href="/tasks" className="text-blue-500 underline">
              Return to Dashboard
            </Link>
          </li>
        </ul>

        <div className="mt-6">
          <label className="block mb-2 font-semibold">Update Status:</label>
          <input
            type="text"
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-4"
          />
          <button
            onClick={updateTaskStatus}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Status
          </button>
          <button
          onClick={deleteTask}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
          Delete Task
          </button>
        </div>
      </main>
    </>
  );
}
