import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import SavedRecipes from "./pages/SavedRecipes";
import RecipeDetail from "./pages/RecipeDetail";
import Header from "./components/Header";
import "./styles/fonts.css";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/saved" element={<SavedRecipes />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;