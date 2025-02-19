# Dacoid Assignment

Dacoid Assignment is a React-based quiz application that allows users to attempt quizzes, store results in IndexedDB, and review past attempts. The app enforces a scoring system and automatically terminates after 30 minutes.

## Demo

[https://akaushal10.github.io/dacoid-assignment](https://akaushal10.github.io/dacoid-assignment)

## Features

- **Quiz Scoring Criteria:**
  - Unattempted: **0** points
  - Wrong Answer: **-1** point
  - Correct Answer: **+2** points
- **Time Limit:** The quiz automatically ends after **30 minutes**.
- **Result Storage:** Quiz results are stored in **IndexedDB** for future reference.
- **Review Past Quizzes:** Users can review their old quiz attempts.
- **State Management:** The application uses **Redux** for centralized state management.
- **Styling:** Bootstrap is used for styling via **CDN links**.
- **Hosting:** The app is hosted on **GitHub Pages** at:
  - [Dacoid Assignment](https://akaushal10.github.io/dacoid-assignment)

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v14+ recommended)
- **npm** or **yarn**

### Installation

Clone the repository:

```bash
git clone https://github.com/akaushal10/dacoid-assignment.git
cd dacoid-assignment
```

Install dependencies:

```bash
npm install  # or yarn install
```

### Running the App

Start the development server:

```bash
npm start  # or yarn start
```

The app will be available at `http://localhost:3000/`.

### Deployment

The app is deployed on GitHub Pages. To redeploy:

```bash
npm run deploy  # Deploys to GitHub Pages
```

## Technologies Used

- **React** – UI Framework
- **Redux** – State Management
- **IndexedDB** – Local Storage for Quiz Results
- **Bootstrap (CDN)** – Styling
- **GitHub Pages** – Hosting

## License

This project is licensed under the **MIT License**.

---

For any issues or contributions, feel free to raise a pull request or create an issue in the repository.
