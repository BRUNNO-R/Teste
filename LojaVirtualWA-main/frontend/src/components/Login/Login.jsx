import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    })
      .then(resp => {
        if (resp.status === 401) setError(true)
        else return resp.json();
      })
      .then(json => {
        console.log(json)
        navigate("/")
      })
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6">
          <h2>Autenficação de Usuário</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input id="email" className={`form-control ${error ? 'is-invalid' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
            <label htmlFor="senha">Senha</label>
            <input id="senha" className={`form-control ${error ? 'is-invalid' : ''}`} value={senha} onChange={(e) => setSenha(e.target.value)} type="password" />
            {error && <div className="invalid-feedback">
              Email e/ou senha incorreta
            </div>}
            <button className="btn btn-primary mt-2" type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login