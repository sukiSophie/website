# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 application built with Vite that includes a music player feature. The application has a main page, blog section, and blog detail pages. The music player is a key feature integrated throughout the site.

## Key Technologies

- Vue 3 with Composition API
- TypeScript
- Vite build tool
- Pinia for state management
- Vue Router for navigation
- APlayer for music playback
- Axios for HTTP requests

## Common Development Commands

### Project Setup
```bash
npm install
```

### Development
```bash
npm run dev
```
Starts the development server with hot reload at http://localhost:5173

### Type Checking
```bash
npm run type-check
```

### Production Build
```bash
npm run build
```
Builds the project for production in the `dist` directory

### Preview Production Build
```bash
npm run preview
```

### Analyze Bundle Size
```bash
npm run build:analyze
```
Builds the project and opens a bundle analyzer to visualize dependencies

## Project Structure

```
src/
├── App.vue              # Main application component
├── main.ts              # Application entry point
├── router.ts            # Vue Router configuration
├── views/               # Page components (Home, Blog, BlogDetail)
├── components/          # Reusable components including music player
├── stores/              # Pinia stores
├── types/               # TypeScript type definitions
├── assets/              # Static assets and CSS
```

## Key Features

### Music Player
- Integrated APlayer music player component
- Supports multiple music platforms (Netease, QQ Music, Kugou, etc.)
- Configurable via `server`, `type`, and `id` parameters in Music.vue
- Features include play/pause, next/previous, volume control, and lyrics display

### Blog System
- Blog listing page
- Individual blog detail pages with dynamic routing

## Performance Optimizations

### Code Splitting and Lazy Loading
- Routes are lazy-loaded using dynamic imports
- Vendor libraries are split into separate chunks (vue, pinia, aplayer, axios)
- Components are only loaded when needed

### Asset Optimization
- Images use lazy loading with `loading="lazy"` attribute
- Font files are preloaded for faster rendering
- CSS is split into separate files for better caching
- Assets under 4KB are inlined to reduce HTTP requests

### Build Optimizations
- ESBuild minification for faster builds
- Console and debugger statements are removed in production
- Chunk size warnings are increased to reduce noise
- Bundle splitting is enabled for better caching

### Network Optimizations
- Font Awesome CSS is loaded with media="print" and switched to "all" onload
- Critical font files are preloaded with proper CORS headers
- GitHub Actions workflow includes compression of build artifacts
- Caching is enabled for npm dependencies in CI/CD

### Component Optimizations
- Music player uses lazy initialization with timeout protection
- RequestAnimationFrame is used instead of setInterval for better performance
- Teleport is used for modal dialogs to improve rendering
- Event listeners are properly cleaned up to prevent memory leaks

## Important Configuration Files

- `vite.config.ts` - Vite configuration with path aliases and performance settings
- `tsconfig.json` - TypeScript configuration
- `package.json` - Project dependencies and scripts

## Deployment

The project is configured for deployment to GitHub Pages via GitHub Actions workflow in `.github/workflows/deploy.yml`.

## Aliases

The project uses `@` as an alias for the `src` directory.

## Base URL

The application is configured with `/website/` as the base URL in `vite.config.ts`.