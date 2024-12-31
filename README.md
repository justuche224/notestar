# Notestar

A modern rich text editor with built-in database integration, table support, and task management capabilities.

## Features

- 📝 Rich text editing with formatting options
- 📊 Table creation and management
- ✅ Task tracking system
- 🗄️ Archive functionality
- 🗑️ Soft delete with recovery options
- 📱 Responsive design
- 🔐 Authentication system
- 📨 Email integration

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- pnpm
- A database supported by Prisma

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/justuche224/notestar.git
cd notestar
```

2. Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=""          # Your database connection string
AUTH_SECRET=""          # Secret key for authentication
NODEMAILER_APP_PASS="" # App password for email service
NODEMAILER_EMAIL=""    # Email address for notifications
CLIENT_URL="http://localhost:3000"  # Your app's URL
```

3. Install dependencies:

```bash
pnpm install
```

4. Set up the database:

```bash
pnpm db:push
```

5. Start the development server:

```bash
pnpm dev
# or
pnpm dev:turbo
```

## Available Scripts

- `pnpm build` - Build the application for production
- `pnpm check` - Run linting and type checking
- `pnpm dev` - Start development server
- `pnpm dev:turbo` - Start development server with Turbo
- `pnpm preview` - Build and start production server locally
- `pnpm start` - Start production server
- `pnpm lint` - Run linter
- `pnpm lint:fix` - Fix linting issues
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm format:write` - Format code with Prettier
- `pnpm format:check` - Check code formatting

### Database Commands

- `pnpm db:generate` - Generate Prisma migrations
- `pnpm db:migrate` - Deploy Prisma migrations
- `pnpm db:push` - Push schema changes to database
- `pnpm db:studio` - Open Prisma Studio

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

This project was initially generated using [create-t3-app](https://github.com/t3-oss/create-t3-app), a modern full-stack framework for building web applications with TypeScript, Next.js, Prisma, and tRPC.

## License
