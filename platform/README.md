# The Backend

## Overview

This backend is built with **Express.js** from scratch with proper documentation in mind, by implementing the **OpenAPI** specification. It uses **Prisma** as the ORM to interact with a **PostgreSQL** database.

## Prerequisites

- **Node.js**: v20 or above.
- **PostgreSQL**: Installed locally with an empty database prepared for the application.

## Getting Started

1. **Clone the Repository**:

   ```bash
   git clone git@github.com:kaboel/a-very-very-fancy-todo-app.git
   cd a-very-very-fancy-todo-app
   ```

2. **Initialize the Application**:
   Run the command bellow to install dependencies and configure the database:

   ```bash
   npm run init
   ```

3. **Run the Application**:
   Once the initialization is complete, start the development server:
   ```bash
   npm run dev
   ```
   The application will start at `http://localhost:3000`.

## OpenAPI Documentation

This application comes with built-in API documentation. Once the project is running, you can:

- View the OpenAPI JSON specification at: `http://localhost:3000/api/docs`
- Access the Swagger UI to test endpoints at: `http://localhost:3000/api/docs/swagger`

## Database Seeding

To populate the database with predefined data:

1. Run the seeder script:

   ```bash
   npm run seed
   ```

   This will:

   - Populate the tables with sample data, including relationships between entities.

2. View the seeded data:
   - Use a PostgreSQL RDBMS client (e.g., pgAdmin, DBeaver) to query the database.
   - Use the PostgreSQL CLI to run SQL queries.
   - The easiest option is to run:
     ```bash
     npx prisma studio
     ```
     This command launches Prisma Studio, a web-based database viewer, accessible in your browser.
3. User seeded data:
   - The users data (and the other data) are generated using faker.js. The users password stored in the database is a hashed string: `userpassword123`, which you can use to authenticate any user being stored in the database.

Enjoy!
