import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerService } from "../services/apiService";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [errores, setErrores] = useState([]);
  const [apiMessage, setApiMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const inputRequired = (element, fieldName) => {
    if (!element.trim()) {
      setErrores((prev) => [...prev, `${fieldName} es requerido`]);
      return false;
    }
    return true;
  }

  const inputLength = (value, length, fieldName) => {
    if (!inputRequired(value, fieldName)) return false;
    if (value.length < length) {
      setErrores((prev) => [...prev, `${fieldName} es muy corto`]);
      return false;
    }
    return true;
  };

  const emailValidator = (email) => {
    if (!inputRequired(email, "Email")) return false;
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(email)) {
      setErrores((prev) => [...prev, "Email no válido"]);
      return false;
    }
    return true;
  };

  const passwordValidator = (pass1, pass2) => {
    if (!inputRequired(pass1, "Contraseña")) return false;
    if (pass1 !== pass2) {
      setErrores((prev) => [...prev, "Las contraseñas deben coincidir"]);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let msg = "";
    setErrores([]);

    const isUsernameValid = inputLength(formData.username, 3, "Usuario");
    const isNameValid = inputLength(formData.name, 3, "Nombre");
    const isSurnameValid = inputLength(formData.surname, 3, "Apellido");
    const isEmailValid = emailValidator(formData.email);
    const isPasswordValid = passwordValidator(formData.password1,formData.password2);

    if (
      isUsernameValid &&
      isNameValid &&
      isSurnameValid &&
      isEmailValid &&
      isPasswordValid
    ) {
      setErrores([]);
      const newUser = {
        username: formData.username,
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        password: formData.password1,
      };

      const response = await registerService(newUser);
      setApiMessage(response);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Regístrate
        </h2>
      </div>
      <form
        action="#"
        method="POST"
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="username"
              className="block text-sm/6 font-semibold text-gray-900"
            >
              Usuario
            </label>
            <div className="mt-2.5">
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm/6 font-semibold text-gray-900"
            >
              Nombre
            </label>
            <div className="mt-2.5">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="surname"
              className="block text-sm/6 font-semibold text-gray-900"
            >
              Apellido
            </label>
            <div className="mt-2.5">
              <input
                id="surname"
                name="surname"
                type="text"
                value={formData.surname}
                onChange={handleChange}
                required
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm/6 font-semibold text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password1"
              className="block text-sm/6 font-semibold text-gray-900"
            >
              Contraseña
            </label>
            <div className="mt-2.5">
              <input
                id="password1"
                name="password1"
                type="password"
                value={formData.password1}
                onChange={handleChange}
                required
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password2"
              className="block text-sm/6 font-semibold text-gray-900"
            >
              Confirmar contraseña
            </label>
            <div className="mt-2.5">
              <input
                id="password2"
                name="password2"
                type="password"
                value={formData.password2}
                onChange={handleChange}
                required
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            onClick={handleSubmit}
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Regístrarme
          </button>
        </div>
        {apiMessage && (
          <div className="api-message">
            <p className="mt-4 text-center text-sm text-gray-500">{apiMessage}</p>
          </div>
        )}

        {errores.length > 0 && (
          <div className="mt-4 text-center text-sm text-red-500">
            {errores.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <p className="mt-4 text-center text-sm text-gray-500">
          Ya tengo una cuenta.{" "}
          <a
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
            onClick={() => navigate("/")}
          >
            Iniciar sesión
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
