# Portfolio Website

A modern, responsive portfolio website built with React and Vite.

## Features

- ⚡ Built with Vite for fast development and optimized builds
- ⚛️ React 18 with functional components
- 🎨 Bootstrap 5 for responsive design
- 📧 Contact form with backend API integration
- 📱 Fully responsive design
- 🚀 Production-ready

## Project Structure

```
portfolio/
├── src/
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # React entry point
│   ├── index.css         # Global styles
│   ├── App.css           # App component styles
│   └── assets/           # Images and static files
├── public/               # Static files
├── vite.config.js        # Vite configuration
├── eslint.config.js      # ESLint configuration
├── package.json          # Project dependencies
├── index.html            # HTML template
└── README.md             # This file
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update the API URL in `.env` if needed

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview

Preview the production build locally:

```bash
npm run preview
```

## Linting

Check code quality:

```bash
npm run lint
```

## Configuration

### API Integration

Update your API calls to use the environment variable:
```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

### Styling

The project uses:
- **Bootstrap 5** - CSS framework (via CDN)
- **Custom CSS** - Component-specific styles

## Contact Form Integration

The contact form submits to the backend server. Make sure the server is running on `http://localhost:5000`.

Backend repository: See `/server` directory

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool
- **Bootstrap 5** - CSS framework
- **ESLint** - Code quality
- **Node.js** - Development environment

## License

MIT

## Author

John Doe
