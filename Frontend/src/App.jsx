import "./App.css";
import Page from "./page/page";
import Login from "./components/logIn/login";
import { LogdInProvider } from "./context/logdInProvider";
import { useLogdIn } from "./hooks/logInHook";
import { SaveDataProvider } from "./context/saveDataProvider";
import { ContactHandlerProvider } from "./context/ContactHandlerProvider";

function AppContent() {
  const { isLogdIn } = useLogdIn();

  return isLogdIn ? <Page /> : <Login />;
}

function App() {
  return (
    <LogdInProvider>
      <SaveDataProvider>
        <ContactHandlerProvider>
          <AppContent />
        </ContactHandlerProvider>
      </SaveDataProvider>
    </LogdInProvider>
  );
}

export default App;
