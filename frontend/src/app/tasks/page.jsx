import Link from 'next/link';
export default async function Dashboard() {
const data = await fetch('http://localhost:8080/task/all')
  const tasks = await data.json()
  console.log(tasks);
  console.log("Task IDs:", tasks.map(task => task.id));

  return (
      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Tasks</h2>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="border border-gray-300 rounded-lg p-4 bg-white text-black shadow-md"
            >
              <h3 className="text-lg font-bold">{task.title}</h3>
              <p>Description: {task.description || '-'}</p>
              <p>Status: {task.status}</p>
              <p>Due date: {task.dueDate}</p>
                <Link href = {`/tasks/${task.id}`} className="text-blue-500 underline">
                View/Manage
                </Link>
            </li>
          ))}
        </ul>
      </main>
    );
}
