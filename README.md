# Project Setup Guide

A-very-very-fancy-todo-app

For more specific instructions on how to setup each applications please navigate to the respective folders.

## Testing

### Backend Testing

To test the backend endpoints, follow these steps:

1. #### Run the Backend:

   Ensure the backend is running by following the instructions in the platform directory’s README (this directory contains the backend codebase).

   Once the backend is up and running, open your browser and navigate to http://localhost:3000/api/docs/swagger. This will load the Swagger UI.

2. #### Test API Endpoints:

   The Swagger UI provides an interactive interface where you can test all available backend API endpoints.

   Available endpoints include:

   User Authentication: Test login, logout, and token refresh.
   User Registration: Test user registration functionality.
   Task Management (CRUD): Create, read, update, and delete tasks.
   Patient Management (CRUD): Create, read, update, and delete patient records.
   You can use this interface to manually test the endpoints and ensure they are working as expected.

### Frontend Testing

To test the frontend, follow these steps:

1.  #### Run the Frontend:

    - Start the frontend application by following the instructions in the frontend directory’s README (this directory contains the frontend codebase).

    - Once the frontend is running, open your browser and navigate to http://localhost:8000. The application will be served at this address.

2.  #### Test User Authentication & Registration:

    - On the frontend, navigate to the Registration page and create a new user account.

    - Once registered, proceed to the Login page and enter the credentials to log in.

    - After logging in successfully, you will be redirected to the main Dashboard.

3.  #### Test Task Management:

    - On the Dashboard, you will be able to create new tasks and view existing tasks.

    - Test task creation by entering the task details and submitting the form.

    - You can also try other task actions like viewing, editing, or deleting tasks.

4.  #### Test Patient and Profile Managements:

    - On your left you will see a side bar containing your profile and a naivigation.

    - On the navigation you should see "Tasks" and "Patients", "Tasks" is where you are now which is the dashboard, and clicking "Patients" will take you to the Patients grid where you can create new patients.

    - You can also try other patient actions like editing, or deleting tasks.
