**📝 My Todo App**
A full-featured, theme-aware Todo application that allows users to manage tasks efficiently with modern React practices. Includes light/dark mode toggle, CRUD functionality, detailed todo views, and data persistence.

**🔍 Features**
✅ Create, Read, Update, Delete (CRUD) todos

🌗 Light and Dark mode toggle with persistence (localStorage)

🔎 Search and filter todos

🔁 Pagination support

📄 Detailed todo view with inline editing

❌ Error boundaries and graceful fallback UI

🧠 Advice Generator integration (optional feature)

🔌 Data fetching with TanStack Query (react-query)

⚠️ 404 Not Found and Broken Page error routes

**🛠️ Installation & Setup**

# 1. Clone the repository

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# 2. Install dependencies

npm install

# 3. Start the development server

npm run dev
Ensure you have Node.js and npm installed. Built with Vite.

**_📜 Available Scripts _**
Command Description
npm run dev Starts the development server
npm run build Builds the app for production
npm run preview Previews the built app locally

⚙️ Tech Stack & Architecture
React (Functional components + Hooks)

React Router DOM (Routing)

TanStack Query (React Query) (API state management)

Vite (Build tool)

CSS Modules + lightmode.css / darkmode.css (Theming)

Custom Hooks (useTodos, useTodo, useCreateTodo, useUpdateTodo, useDeleteTodo)

Error Boundary for graceful error handling

**Folder Structure:**

src/
│
├── components/ # Shared UI components (e.g., ErrorBoundary)
├── hooks/ # Custom React Query hooks
├── pages/ # Route-level components
├── styles/ # Light/dark mode stylesheets
├── App.jsx # App entry with routing & theme logic
└── main.jsx # Main entry point

**📡 API Usage**
This app integrates with a REST API for todos. Example structure:

GET /todos – fetch list of todos

GET /todos/:id – get a specific todo

POST /todos – create a new todo

PUT /todos/:id – update a todo

DELETE /todos/:id – delete a todo

All API calls are abstracted using React Query via custom hooks in src/hooks.

🖼️ Screenshots
🌑 Dark Mode

🌕 Light Mode

**🐞 Known Issues**
when you click on details page and you clicck on the back button it goes back to the light mode which is the default

Theme may briefly flash back to light mode on page reload before applying localStorage value.

Error pages do not show original error details (for production safety).

No authentication yet (all todos are public).

**🚀 Future Improvements**
🌍 Add internationalization (i18n) support

🔐 Add user login with JWT auth

✅ Support due dates and priority tagging

📈 Add analytics or todo completion stats

🧪 Add unit & E2E tests with Jest & Cypress

💬 Add comments/notes per todo

**🧑‍💻 Author**
Created with 💙 by Your Ayomide Akanbi

📄 License
This project is licensed under the MIT License.
