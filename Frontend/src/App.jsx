import "./App.css";
//import AddContact from "./components/addContact";
import GetContact from "./components/getContact";
import Login from "./components/login";
import { LogdInProvider, useLogdIn } from "./context/logdInContext";

function AppContent() {
  const { isLogdIn } = useLogdIn();

  return isLogdIn ? <GetContact /> : <Login />;
}

function App() {
  return (
    <LogdInProvider>
      <AppContent />
    </LogdInProvider>
  );
}

export default App;
