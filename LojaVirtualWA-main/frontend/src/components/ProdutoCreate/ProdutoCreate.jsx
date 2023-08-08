import { useState } from "react";
import { useNavigate } from "react-router-dom"

function ProdutoCreate() {
  const [nome, setNome] = useState("");
  const [nomeError, setNomeError] = useState("")
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState(0);
  const [estoque, setEstoque] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setIsPending(true);
    const produto = { nome, descricao, preco, estoque };

    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/produto`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    })
      .then((resp) => resp.json())
      .then((json) => {
        setIsPending(false);
        if (json.errors) {
          json.errors.forEach(error => {
            if (error.path === 'nome') {
              setNomeError(error.message)
            }
          });
        } else {
          navigate(`/`)
        }
      });
  };

  return (
    <div>
      <h2>Criação de novo produto</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome</label>
        <input
          className={`form-control ${nomeError === '' ? '' : 'is-invalid'}`}
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <div className="invalid-feedback">
          {nomeError}
        </div>
        <label htmlFor="preco">Preço</label>
        <input
          className="form-control"
          type="number"
          id="preco"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <label htmlFor="estoque">Estoque</label>
        <select
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)}
          className="form-control"
          id="estoque"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {!isPending && <button type="submit" className="btn btn-primary mt-3">
          Enviar
        </button>}
        {isPending && <button disabled type="submit" className="btn btn-primary mt-3">
          Enviando dados
        </button>}
      </form>
    </div>
  );
}

export default ProdutoCreate;
