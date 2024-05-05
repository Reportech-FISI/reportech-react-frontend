import { useState } from "react";

function App({ name, age }: { name: string; age: number }) {
  const [variableMutable, setVariableMutable] = useState("");

  const cambiarVariable = () => {
    setVariableMutable("ahora he cambiado");
  };

  const variable = "variable inmutable";

  return (
    <>
      <div className="bg-green-400 text-center">
        <h1 className="font-bold text-red-400 text-4xl">
          Hello papus, me llamo {name} y tengo una edad de {age}
        </h1>
      </div>
      <div className="flex items-center flex-col w-full">
        <span>{variable}</span>
        <h4>
          este est otro texto
          <span>{variableMutable}</span>
        </h4>
        <button className="border-4 border-black" onClick={cambiarVariable}>
          Soy un boton para cambiar la variable
        </button>
      </div>
    </>
  );
}

export default App;
