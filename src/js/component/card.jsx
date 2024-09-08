import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import '../../styles/card.css';

const Card = ({ name, address, phone, email, id }) => {
    const { store, actions } = useContext(Context);
    return (
        <div className="container d-flex mb-1">
            <div>
                <img className="foto ms-2 md-2 rounded-circle vw-25 vh-25" src="https://cdn.awsli.com.br/600x1000/761/761999/produto/1482058586e9ba7b002.jpg" alt="foto de contacto" />
            </div>
            <div className="datos ms-8 md-8">
                <h3 className="nombre mb-4">{name}</h3>
                <p>
                    <i className="fa-solid fa-location-dot"></i> {address}
                </p>
                <p>
                    <i class="fa-solid fa-phone"></i>
                    {phone}
                </p>
                <p>
                    <i className="fa-solid fa-envelope"></i> {email}
                </p>
            </div>
            <div className="botones ms-2 md-2  ms-auto">
                <Link
                    onClick={() => {
                        actions.contactoAEditar(name, email, phone, address, id);
                    }}
                    to={`/formulario/${id}`}>
                    <i className="fa-solid fa-pencil me-3"></i>
                </Link>

                <Link>
                    {' '}
                    <i
                        className="fa-solid fa-trash"
                        onClick={() => {
                            actions.borrarContacto(id);
                        }}></i>
                </Link>
            </div>
        </div>
    );
};

export default Card;