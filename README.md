# Career Log Pose

An eternal career advisor - a full-stack application with Next.js frontend and FastAPI backend.

## Monorepo Structure

```
├── apps/
│   ├── client/          # Next.js frontend application
│   └── server/          # FastAPI backend application
├── .vscode/             # VS Code workspace settings
├── .env                 # Environment variables (local)
├── .env.example         # Environment variables template
├── .gitignore           # Git ignore rules
└── package.json         # Root package.json with unified scripts
```

## Quick Start

### Prerequisites

- Node.js (v18+) and [Bun](https://bun.sh/) (for JS/TS dependencies)
- Python (v3.8+)

### Setup

```bash
# Copy environment variables
cp .env.example .env

# Install all dependencies (both client and server)
bun run setup

# Start development servers (both client and server)
bun run dev
```

## Environment Configuration

The project uses environment variables for configuration. Copy `.env.example` to `.env` and modify as needed:

```bash
cp .env.example .env
```

## Available Scripts

### Development

- `bun run dev` - Start both client and server in development mode
- `bun run dev:client` - Start only the Next.js client
- `bun run dev:server` - Start only the FastAPI server

### Building

- `bun run build` - Build both applications for production (client: Next.js build, server: install Python dependencies)
- `bun run build:client` - Build the Next.js client for production
- `bun run build:server` - Install server dependencies (Python requirements)

### Production

- `bun run start` - Start both applications in production mode (client: Next.js, server: FastAPI)
- `bun run start:client` - Start the client in production mode (serves built Next.js app)
- `bun run start:server` - Start the server in production mode (runs FastAPI with Uvicorn)

### Utilities

- `bun run setup` - Install all dependencies (client: Bun, server: Python venv)
- `bun run clean` - Clean all node_modules, .venv, .next, and build artifacts

## Technology Stack

### Client (Next.js)

- Next.js 15+
- TypeScript
- Tailwind CSS

### Server (FastAPI)

- FastAPI
- Python 3.8+
- Uvicorn

## API Endpoints

- `GET /health` - Health check endpoint

## Development


This project is a monorepo with:
- Single git repository
- Bun for all JS/TS package management
- Python virtual environment for backend
- Consistent VS Code settings
- Concurrent development of both apps

Access the applications:

- Client: http://localhost:3000
- Server: http://localhost:8000
- API Docs: http://localhost:8000/docs
