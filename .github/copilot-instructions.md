# MERN Project Guidelines
- **Backend**: Node.js, Express, MongoDB (Mongoose), ES Modules syntax (`require`/`module.exports`).
- **Frontend**: React (Vite preferred), Functional Components, React Hooks, Redux, Tailwind CSS.
- **Architecture**: Keep Mongoose schemas in `/server/model`, Express controllers in `/server/controllers`, and React components in `/client/src/components`.
- **Error Handling**: Always use `try/catch` blocks in async Express route handlers and return structured JSON (`{ success: false, message: "..." }`).