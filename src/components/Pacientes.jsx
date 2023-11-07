import { useEffect, useState } from "react";

const Pacientes = ({ DB, setPacienteParaEditar }) => {
  const [pacientes, setPacientes] = useState([]); // Utiliza un arreglo para almacenar múltiples pacientes

  useEffect(() => {
    if (DB) {
      const transaction = DB.transaction("citas");
      const objectStore = transaction.objectStore("citas");

      const cursorRequest = objectStore.openCursor();
      const pacientesArray = [];

      cursorRequest.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          pacientesArray.push(cursor.value);
          cursor.continue();
        } else {
          setPacientes(pacientesArray); // Establece la lista de pacientes una vez que se recopilan todos
        }
      };
    }
  }, [DB]);

  const eliminarPaciente = (paciente) => {
    const transaction = DB.transaction("citas", "readwrite");
    const objectStore = transaction.objectStore("citas");

    const request = objectStore.delete(paciente.id);

    request.onsuccess = () => {
      console.log("Paciente eliminado");
      // Actualiza el estado de pacientes después de eliminar el paciente
      const nuevosPacientes = pacientes.filter((p) => p.id !== paciente.id);
      setPacientes(nuevosPacientes);
    };

    request.onerror = () => {
      console.error("Error al eliminar paciente");
    };
  };
  return (
    <div>
      {pacientes.map((paciente, index) => (
        <div
          key={index}
          className="bg-slate-900 w-[600px] rounded-xl p-5 mb-10 shadow-2xl"
        >
          <div className="flex justify-between">
            <p className="text-white font-bold text-sm">{paciente.fecha}</p>
            <p className="text-white font-bold text-sm">
              {paciente.especialidad}
            </p>
          </div>

          <div>
            <h1 className="text-2xl mt-5 text-white">{paciente.nombre}</h1>
            <p className="text-yellow-500 text-xl mt-3">
              {paciente.tratamiento}
            </p>
          </div>

          <div className="mt-10 flex justify-between gap-5">
            <button
              onClick={() => setPacienteParaEditar(paciente)}
              className="bg-blue-500 w-1/2 p-3 rounded-xl text-white text-xl font-semibold hover:bg-blue-700"
            >
              Editar
            </button>
            <button
              onClick={() => eliminarPaciente(paciente)}
              className="bg-red-500 w-1/2 p-3 rounded-xl text-white text-xl font-semibold hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Pacientes;
