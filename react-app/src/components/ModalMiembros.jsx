import React, { useState, useEffect } from "react";

const AgregarMiembro = ({ onClose, onSave, member = null, isEdit = false }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [inicioMembresia, setInicioMembresia] = useState("");
  const [renovacion, setRenovacion] = useState("");

  // Si es una edición, actualiza los estados con los datos del miembro
  useEffect(() => {
    if (isEdit && member) {
      setNombre(member.nombre);
      setEmail(member.correo_electronico);
      setTelefono(member.telefono);
      setDireccion(member.direccion);
      setNacimiento(member.fecha_nacimiento);
      setInicioMembresia(member.fecha_inicio_membresia);
      
    }
  }, [isEdit, member]);

  const handleSave = () => {
    const newMember = { nombre, correo_electronico: email, telefono, direccion };
    onSave(newMember); // Llama a onSave pasando el nuevo miembro
    onClose();  // Cierra el modal después de guardar
  };

  const handleCancel = () => {
    onClose();  // Cierra el modal sin hacer nada
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{isEdit ? "Editar Miembro" : "Agregar Miembro"}</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Nombre del miembro"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Correo electrónico"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Teléfono</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Teléfono"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Dirección</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Dirección"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {isEdit ? "Guardar Cambios" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgregarMiembro;
