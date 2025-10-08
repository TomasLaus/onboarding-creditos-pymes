import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AppRouter from "./router/AppRouter";
import "./App.css";

function App() {
  return (
    <div className="appContainer">
      <Header />
      <main>
        <AppRouter />
      </main>
      <Footer />
    </div>

  );
}

export default App;
