# The Backend (or Platform, as I like to call it)

## Overview

This application is built with **Express.js** with proper documentation in mind, by implementing the **OpenAPI** specification. It uses **Prisma** as the ORM to interact with a **PostgreSQL** database. The application serves as the backend of the very very fancy todo app.

## Prerequisites

- **Node.js**: v20 or above.
- **PostgreSQL**: Installed locally with an empty database prepared for the application.

## Getting Started

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Initialize the Application**:
   Run the following command to install dependencies and configure the database:

   ```bash
   npm run init
   ```

   This script will:

   - Install all required dependencies.
   - Prompt you for database credentials (e.g., host, port, username, password, and database name).

3. **Run the Application**:
   Once the initialization is complete, start the development server:
   ```bash
   npm run dev
   ```
   The application will start, and you can access it at `http://localhost:3000`.

## OpenAPI Documentation

This application comes with built-in API documentation.

- View the OpenAPI JSON specification at: `http://localhost:3000/api/docs`
- Access the Swagger UI for testing endpoints at: `http://localhost:3000/api/docs/swagger`

The Swagger UI allows you to interactively test the API endpoints directly in the browser.

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

## Project Structure

```
├── prisma
│   ├── schema.prisma   # Prisma schema file
│   ├── migrations      # Database migration files
│   └── seed            # Database seeder functions
├── src
│   ├── api
│   │   ├── handlers    # API route handlers / controllers
│   │   └── specs       # API routes spec definitions
│   ├── helpers         # Helpers and utility functions
│   ├── middleware      # Custom middleware functions
│   ├── persistence     # Persistence layer function and DTOs
│   ├── global.d.ts     # Global types definitions file
│   ├── index.ts        # Entry point
│   └── server.ts       # Server file
├── package.json        # Node.js project configuration
├── README.md           # Project documentation
└── ...                 # Other configuration files (e.g., .env, .gitignore)
```

## Common Issues

- Ensure the PostgreSQL database is running locally before starting the application.
- Prisma migrations are automatically applied during the `npm run init` step.
- For any issues or questions, don't hesitate to contact moi.

---

Enjoy!
