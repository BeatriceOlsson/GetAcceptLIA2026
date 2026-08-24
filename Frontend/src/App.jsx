import "./App.css";
import Page from "./page/page";
import Login from "./components/logIn/login";
import { LogdInProvider } from "./context/logdInContext";
import { useLogdIn } from "./hooks/logInHook";

function AppContent() {
  const { isLogdIn } = useLogdIn();

  return isLogdIn ? <Page /> : <Login />;
}

function App() {
  return (
    <LogdInProvider>
      <AppContent />
    </LogdInProvider>
  );
}

export default App;
