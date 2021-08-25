import { FormEvent } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../services/api";
import { ContainerForm } from "./style";
import { v4 } from "uuid";

export function NewProduct() {
  const [title, setTitle] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const history = useHistory();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const id = v4();
    await api.post("/products", { id, title, price, imgLink });
    await api.post("/stock", { id, amount });
    history.push("/");
  }

  return (
    <ContainerForm>
      <div className="loginBox">
        <input
          className="animation"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <span>Nome do item</span>
      </div>
      <div className="loginBox">
        <input
          className="animation"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
        <span>Preço</span>
      </div>
      <div className="loginBox">
        <input
          className="animation"
          type="text"
          value={imgLink}
          onChange={(e) => setImgLink(e.target.value)}
          required
        />
        <span>Link de imagem</span>
      </div>
      <div className="loginBox">
        <input
          className="animation"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
        <span>Quantidade em estoque</span>
      </div>
      <input
        type="submit"
        onClick={(e) => handleSubmit(e)}
        value="Adicionar produto"
      />
    </ContainerForm>
  );
}
