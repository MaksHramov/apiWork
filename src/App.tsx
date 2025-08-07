import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import ProductIdPage from "./pages/ProductIdPage";
import CreatePage from "./pages/CreatePage";
import Header from "./widgets/Header";

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductIdPage />} />
      <Route path="/create" element={<CreatePage/>} />
    </Routes>
    </>
  );
}

export default App;
