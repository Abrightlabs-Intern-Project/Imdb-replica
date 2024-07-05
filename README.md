# IMDb Replica Project

This project replicates IMDb, focusing on building a full-stack application with NestJS, Prisma, AWS S3, TypeScript, React, AWS Cognito, and Vite.

## Features

- **Server Side (NestJS with Prisma):**
  - Database interactions with Prisma ORM.
  - Integration with AWS S3 for file storage (posters, images, etc.).
  - RESTful API endpoints for CRUD operations on movies, actors, directors, etc.

- **Client Side (TypeScript with React):**
  - Responsive UI for browsing and searching movies, actors, directors, genres, etc.
  - Forms for adding and editing movie details.
  - Integration with AWS Cognito for user authentication and authorization.
  - Optimized with Vite for fast development and production builds.

## Setup

### Prerequisites

- Node.js
- npm or yarn
- PostgreSQL database
- AWS account with configured Cognito User Pool
- AWS S3 bucket (for file storage)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/imdb-replica.git
   cd imdb-replica

2. **Server Setup:**

    ```bash
    cd server
    npm install # or yarn install

3. **Client Setup:**

    ```bash
    cd ../client
    npm install # or yarn install

4. **Start Development Servers:**

    ```bash
    # Start NestJS server
    cd ../server
    npm run start:dev # or yarn start:dev

    # Start React client with Vite
    cd ../client
    npm run dev # or yarn dev

### Contributing

    Contributions are welcome! If you have any ideas or improvements, feel free to fork the repository and submit a pull request.

### License

    This project is licensed under the MIT License - see the LICENSE file for details.

### Notes:

- **AWS Cognito Integration**: Make sure to replace `your-aws-region`, `your-user-pool-id`, and `your-app-client-id` in the `.env` file with your actual AWS Cognito configuration details.
  
- **Vite Integration**: The client-side setup includes using Vite (`npm run dev` or `yarn dev`) for fast development builds. Adjust the commands if you have specific configurations for Vite.

- **Customization**: Tailor the sections and content further based on your project's specific requirements and setup instructions.

