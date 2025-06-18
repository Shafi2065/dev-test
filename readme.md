# Tech stack:
- SpringBoot backend 
- MySQL database (connected to the backend) 
- Next.js (React) front end

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

