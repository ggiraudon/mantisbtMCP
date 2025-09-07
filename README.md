# MantisBT MCP Server

A Model Context Protocol (MCP) server for accessing MantisBT objects via its REST API. Built with TypeScript, FastMCP, Axios, and Zod for robust, type-safe development.

## Features

This MCP server provides tools to interact with MantisBT through the following capabilities:

### Issues
- `getIssue` - Get an issue by ID
- `getIssues` - Get a list of issues with pagination
- `createIssue` - Create a new issue

### Projects
- `getProject` - Get a project by ID
- `getProjects` - Get all projects

### Users
- `getCurrentUser` - Get the current authenticated user

### Issue Notes
- `createIssueNote` - Create a note for an issue


## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   Copy `.env` and update with your MantisBT instance details:
   ```env
   API_URL=https://your-mantisbt-instance.com
   API_TOKEN=your-api-token-here
   ```

3. **Build the Project**
   ```bash
   npm run build
   ```

4. **Run the Server**
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
  controllers/      # Entity classes (Issues, Projects, Users, etc.)
  tools/            # MCP tool definitions
  types/            # Zod schemas and TypeScript types
  config/           # Configuration utilities
  main.ts           # Server entry point
```

## Development

- **TypeScript**: Strongly typed throughout
- **Zod**: Runtime validation for API requests/responses
- **Axios**: HTTP client for REST API calls
- **FastMCP**: MCP server framework
- **Error Handling**: Consistent error handling across all controllers

## API Integration

The server uses the MantisBT REST API with:
- Bearer token authentication via `Authorization` header
- Zod schemas for request/response validation
- Proper error handling and user-friendly error messages
- Type-safe API responses

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build TypeScript to JavaScript
- `npm run test` - Run tests (when implemented)
- `npm run lint` - Run ESLint

## License

MIT
