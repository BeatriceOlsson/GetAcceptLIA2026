import "./App.css";
import Page from "./page/page";
import Login from "./components/logIn/login";
import { LogdInProvider } from "./context/logdInProvider";
import { useLogdIn } from "./hooks/logInHook";
import { SaveDataProvider } from "./context/saveDataProvider";

function AppContent() {
  const { isLogdIn } = useLogdIn();

  return isLogdIn ? <Page /> : <Login />;
}

function App() {
  return (
    <LogdInProvider>
      <SaveDataProvider>
        <AppContent />
      </SaveDataProvider>
    </LogdInProvider>
  );
}

export default App;
