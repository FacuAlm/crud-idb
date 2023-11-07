import React, { useState, useEffect } from "react";

const Formulario = ({ DB, pacienteParaEditar }) => {
  const [fecha, setFecha] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [nombre, setNombre] = useState("");
  const [tratamiento, setTratamiento] = useState("");

  useEffect(() => {
    if (pacienteParaEditar) {
      setFecha(pacienteParaEditar.fecha);
      setEspecialidad(pacienteParaEditar.especialidad);
      setNombre(pacienteParaEditar.nombre);
      setTratamiento(pacienteParaEditar.tratamiento);
    }
  }, [pacienteParaEditar]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const objetoPaciente = {
      fecha,
      especialidad,
      nombre,
      tratamiento,
    };

    // Insertar o actualizar registro en IndexedDB
    const transaction = DB.transaction(["citas"], "readwrite");
    const objectStore = transaction.objectStore("citas");

    if (pacienteParaEditar) {
      objetoPaciente.id = pacienteParaEditar.id;
      objectStore.put(objetoPaciente);
    } else {
      objectStore.add(objetoPaciente);
    }

    transaction.oncomplete = function () {
      console.log(pacienteParaEditar ? "Cita actualizada" : "Cita agregada");
      // Limpia los campos del formulario después de agregar o editar
      setFecha("");
      setEspecialidad("");
      setNombre("");
      setTratamiento("");
      // Limpia el estado de pacienteParaEditar para que sea null
      setPacienteParaEditar(null);
    };
  };

  return (
    <div className="bg-slate-900 w-full rounded-xl p-5">
      <form action="">
        <div className="mb-6">
          <label className="text-xl text-white" htmlFor="fecha">
            Fecha
          </label>
          <input
            className="p-3 block mt-3 w-1/2 rounded-xl bg-gray-200"
            type="date"
            name=""
            id=""
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="text-xl text-white" htmlFor="especialidad">
            Especialidad
          </label>
          <input
            className="p-3 block mt-3 w-1/2 rounded-xl bg-gray-200"
            type="text"
            name="especialidad"
            value={especialidad}
            onChange={(e) => setEspecialidad(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="text-xl text-white" htmlFor="nombre">
            Nombre Paciente
          </label>
          <input
            className="p-3 block mt-3 w-1/2 rounded-xl bg-gray-200"
            type="text"
            name="nombre"
            id=""
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="text-xl text-white" htmlFor="tratamiento">
            Tratamiento
          </label>
          <input
            className="p-3 block mt-3 w-1/2 rounded-xl bg-gray-200"
            type="text"
            name="tratamiento"
            id=""
            value={tratamiento}
            onChange={(e) => setTratamiento(e.target.value)}
          />
        </div>
        <div className="mt-10">
          <button
            onClick={handleSubmit}
            className="p-3 bg-green-600 hover-bg-green-700 w-full rounded-xl text-white text-xl font-bold"
            type="submit"
          >
            {pacienteParaEditar ? "Editar paciente" : "Cargar paciente"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Formulario;
