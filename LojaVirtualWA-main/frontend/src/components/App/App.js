import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Produtos from "../Produtos/Produtos";
import Produto from "../Produto/Produto";
import ProdutoCreate from "../ProdutoCreate/ProdutoCreate";
import Login from "../Login/Login";

function App() {
  return (
    <Router>
      <Header />
      <div className="container-fluid mt-2">
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Produtos />}></Route>]
          <Route path="/produto/create" element={<ProdutoCreate />}></Route>
          <Route path="/produto/:id" element={<Produto />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
