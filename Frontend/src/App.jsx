import "./App.css";
import AddContact from "./components/addContact";
import Login from "./components/login";
import { LogdInProvider, useLogdIn } from "./context/logdInContext";

function AppContent() {
  const { isLogdIn } = useLogdIn();

  return isLogdIn ? <AddContact /> : <Login />;
}

function App() {
  return (
    <LogdInProvider>
      <AppContent />
    </LogdInProvider>
  );
}

export default App;
