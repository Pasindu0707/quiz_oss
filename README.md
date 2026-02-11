# Suddi Quiz - OSSA Exam Application

An Angular-based quiz application for IATLY OSSA exam preparation.

## Features

- **25 Lessons**: Each lesson contains 20 questions
- **Interactive Quiz**: 
  - One question displayed at a time with 4 answer options
  - Correct answer: Shows party pops animation and enables next button
  - Wrong answer: Shuffles answers and shows retry button
- **Navigation**: 
  - Next/Previous buttons to move between questions
  - Question number selector to jump to any question
- **Progress Tracking**: 
  - Correctly answered questions are marked in green
  - Question indicators show completion status

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:4200`

## Project Structure

- `src/app/models/` - TypeScript interfaces for data models
- `src/app/services/` - Quiz service for managing state
- `src/app/components/` - Angular components
  - `lesson-list/` - Displays all lessons
  - `quiz/` - Main quiz interface

## Usage

1. Select a lesson from the lesson list
2. Answer questions by clicking on an option
3. If correct, party pops will appear and you can proceed to next question
4. If wrong, answers will be shuffled and you can retry
5. Use navigation buttons or question numbers to move between questions

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages.

### Setup Instructions:

1. **Enable GitHub Pages in your repository:**
   - Go to Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **The deployment will happen automatically:**
   - Every push to the `main` branch triggers the GitHub Actions workflow
   - The workflow builds the Angular app and deploys it to GitHub Pages
   - Your app will be available at: `https://pasindu0707.github.io/quiz_oss/`

### Manual Deployment (Alternative):

If you prefer to deploy manually:

```bash
npm run build -- --configuration production
npx angular-cli-ghpages --dir=dist/suddi-quiz
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.