# Tech stack:
- SpringBoot backend 
- MySQL database (connected to the backend) 
- Next.js (React) front end

## API Endpoints:
- http://localhost:8080/task and http://localhost:8080/task/all (makes a GET request for all tasks)
- http://localhost:8080/task/add (makes a POST request to create a task)
- http://localhost:8080/task/id (makes a GET request for a specific task by id number)
- http://localhost:8080/task/id/status (makes a PUT request to update a specific task's status to "In Progress" or "Completed")
- http://localhost:8080/task/id (makes a DELETE request in order to delete a specific task by id)
- http://localhost:8080/id/status (makes a GET request to retrieve all tasks with a specific status)

##  Start the Application

Follow these steps to start the application:

1. Navigate to the `backend` directory:

   ```bash
   cd backend

2. Execute command to start backend:

```bash
  .\gradlew.bat bootRun
```

3. navigate to the frontend directory:

```bash
  cd frontend
```

4. Execute command to start frontend:
```bash
   npm run dev
```

## Navigating the Website:
Starts off in the dashboard where all tasks can be viewed, to delete a task or update its status: 
- click view/manage blue link

To create a task, click the tab labelled "Create a task"
Fill in the forms carefully as there is error handling that prevents mistakes in the form such as:
- Providing a description that is too short, please leave description blank or have at least 10 chars!
- Trying to create a task with a due date in the past 

## Unit Tests:
Navigate to the test directory:

```bash
   cd backend
   cd src
   cd test
```

Navigate to the Test file "TaskControllerTest.Java"

```bash
   cd Java
   cd TaskManager
   cd TaskControllerTest
```

Execute the command:

```bash
   ./gradlew test
```