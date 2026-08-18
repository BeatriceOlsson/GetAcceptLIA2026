import "./App.css";
//import CreateDocument from "./components/createDocument";
//import AddContact from "./components/addContact";
import Page from "./page/page";
import Login from "./components/login";
import { LogdInProvider, useLogdIn } from "./context/logdInContext";

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
