# Project Setup Guide

A-very-very-fancy-todo-app

For more specific instructions on how to setup each applications please navigate to the respective folders.

## Testing

### Backend Testing

To test the backend endpoints, follow these steps:

1. **Run the Backend**:

   Ensure the backend is running by following the instructions in the platform directory’s README (this directory contains the backend codebase).

   Once the backend is up and running, open your browser and navigate to http://localhost:3000/api/docs/swagger. This will load the Swagger UI.

2. **Test API Endpoints**:

   The Swagger UI provides an interactive interface where you can test all available backend API endpoints.

   Available endpoints include:

   User Authentication: Test login, logout, and token refresh.
   User Registration: Test user registration functionality.
   Task Management (CRUD): Create, read, update, and delete tasks.
   Patient Management (CRUD): Create, read, update, and delete patient records.
   You can use this interface to manually test the endpoints and ensure they are working as expected.

### Frontend Testing

To test the frontend, follow these steps:

1.  **Run the Frontend**:

    - Start the frontend application by following the instructions in the frontend directory’s README (this directory contains the frontend codebase).

    - Once the frontend is running, open your browser and navigate to http://localhost:8000. The application will be served at this address.

2.  **Test User Authentication & Registration**:
   
      <p align="center">
         <img src="https://github.com/user-attachments/assets/520c7308-5c82-4d27-b0b7-d3f4a28b3f6f" width="35%" />
         <img src="https://github.com/user-attachments/assets/7258b4b4-4fb5-451f-b838-217bc0481502" width="35%" />
      </p>


    - On the frontend, navigate to the Registration page and create a new user account.

    - Once registered, proceed to the Login page and enter the credentials to log in.

    - After logging in successfully, you will be redirected to the main Dashboard.

4.  **Test Task Management**:

      <p align="center">
         <img src="https://github.com/user-attachments/assets/c6b609a6-abae-4d5b-849b-7cfd63ec04fe" width="45%" />
         <img src="https://github.com/user-attachments/assets/5fb9eebc-48cc-4aaa-b906-742f7f526de4" width="45%" />
         <img src="https://github.com/user-attachments/assets/13275bad-6488-4113-bb13-3165796e593d" width="45%" />
      </p>

    - On the Dashboard, you will be able to create new tasks and view existing tasks.

    - Test task creation by entering the task details and submitting the form.

    - You can also try other task actions like viewing, editing, or deleting tasks.

6.  **Test Patient and Profile Managements**:

      <p align="center">
         <img src="https://github.com/user-attachments/assets/1c7cb618-398a-43a8-8fcc-41886f93c21b" width="45%" />
         <img src="https://github.com/user-attachments/assets/b380d913-89cd-4b6c-b99e-9503bceca3a6" width="45%" />
      </p>

    - On the left side of the screen, you’ll find a sidebar containing your profile and navigation options.

    - The navigation will show options for "Tasks" and "Patients". The "Tasks" section represents the current dashboard, where you can manage tasks. Clicking on "Patients" will take you to the Patients grid, where you can view, create, and manage patient records.

    - In the Patients section, you can:

      - Create new patient records.

      - Edit existing patient details.

      - Delete patient records as needed.
