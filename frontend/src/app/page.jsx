export default async function Dashboard() {
const data = await fetch('http://localhost:8080/task/all')
  const tasks = await data.json()
  console.log(tasks);

  return (
       <ul>
            {tasks.map((tasks) => (
              <li key={tasks.id}>{tasks.title}</li>
            ))}
          </ul>
      )
}