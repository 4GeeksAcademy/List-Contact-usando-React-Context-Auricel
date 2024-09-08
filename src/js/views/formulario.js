import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../../styles/formulario.css';

const Formulario = () => {
    const parametros = useParams(); // para obtener los parámetros de la URL
    const { store, actions } = useContext(Context);
    const [name, setName] = useState(parametros.id ? store.contacto.name : '');
    const [email, setEmail] = useState(parametros.id ? store.contacto.email : '');
    const [phone, setPhone] = useState(parametros.id ? store.contacto.phone : '');
    const [address, setAddress] = useState(parametros.id ? store.contacto.address : '');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parametros.id) {
            actions.editarContacto(name, email, phone, address, parametros.id, navigate);
        } else {
            actions.agregarContactoaLaApi(name, email, phone, address, navigate);
        }
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
    };

    return (
        <div className="fullscreen-background">
            <div className="container">
                <h1>Formulario de contacto</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Nombre
                        </label>
                        <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="name" value={name} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                            Telefono
                        </label>
                        <input onChange={(e) => setPhone(e.target.value)} type="number" className="form-control" id="telefono" value={phone} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="direccion" className="form-label">
                            Direccion
                        </label>
                        <input onChange={(e) => setAddress(e.target.value)} type="text" className="form-control" id="direccion" value={address} />
                    </div>
                    <button type="submit" className="btn btn-success mb-2">
                        Guardar
                    </button>
                </form>
                <Link to="/">
                    <span href="#" role="button">
                        Volver a contactos
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Formulario;
