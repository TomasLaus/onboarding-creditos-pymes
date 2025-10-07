import Header from "./components/Header/Header";
import AppRouter from "./router/AppRouter";
import "./App.css";

function App() {
  return (
    <div className="appContainer">
      <Header />
      <main>
        <AppRouter />
      </main>
    </div>
  );
}

export default App;
