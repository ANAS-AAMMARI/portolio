# Cyber Portfolio

This is a personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. It features a hacker-themed design and an interactive terminal.

## Running the Project Locally

To run this project on your local machine, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/aamari/cyber-portfolio.git
cd cyber-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a file named `.env.local` in the root of the project and add your Firebase configuration:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Deployment

This project is deployed to Firebase Hosting. The `classic_firebase_hosting_deploy` tool is used to deploy the application.
