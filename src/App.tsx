import { useForm } from "react-hook-form";

//validação com Yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

//simulando o envio como por exemplo uma api para testar o isSubmitting
const asyncFunction = async () => {
  const myPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve("oi");
    }, 3000);
  });

  return myPromise;
};

const schema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Senha precisa ter no minimo 6 caracteres")
    .required("Campo obrigatório"),
  password_confirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "As senhas precisam ser iguais")
    .required("Campo obrigatório"),
});

import "./App.css";
import { useEffect } from "react";

function App() {
  const { register, handleSubmit, formState, reset, setFocus } = useForm({
    mode: "all", //para form simples, mas se form complexo melhor utilizar outro
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      password_confirm: "",
    },
  });

  const { errors, isSubmitting } = formState;

  console.log("errors", errors);

  const handleSubmitData = async (data: any) => {
    console.log("enviado", data);
    await asyncFunction();
    reset();
  };

  // melhorando a usabilidade/acessibilidade. quando o usuario entrar na tela o foco vai direto para o input de senha, não precisando clicar no input para começar a digitar

  useEffect(() => {
    setFocus("password");
  }, [setFocus]);

  return (
    <>
      <div className="container">
        <h2>Cadastrar nova senha</h2>
        <form className="form" onSubmit={handleSubmit(handleSubmitData)}>
          <input
            {...register("password")}
            type="password"
            placeholder="Digite a nova senha"
          />
          {errors.password && (
            <p style={{ color: "red", padding: 0, margin:0 }}>{errors.password.message}</p>
          )}
          <input
            {...register("password_confirm")}
            type="password"
            placeholder="Confirmar nova senha"
          />
          {errors.password_confirm && (
            <p style={{ color: "red", padding: 0, margin:0 }}>{errors.password_confirm.message}</p>
          )}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "enviando...." : "enviar"}
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
