import React from "react";
import { useState, useEffect } from "react";

function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/produto`, { credentials: "include" })
      .then((resp) => resp.json())
      .then((json) => setProdutos(json));
  }, []);

  return (
    <div className="container">
      <h3>Lista de Produtos</h3>
      <ul className="list-group">
        {produtos.map((produto) => (
          <li className="list-group-item" key={produto.id}>
            {produto.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Produtos;
