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
