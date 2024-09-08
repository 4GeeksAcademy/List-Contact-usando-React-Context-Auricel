import React, { useContext } from 'react';
import { Context } from '../store/appContext.js';
import { Link } from 'react-router-dom';
import Card from '../component/card.jsx';
import '../../styles/agenda.css';

const Agenda = () => {
    const { store } = useContext(Context);

    return (
        <div className="fullscreen-background">
            <div className="container">
                <div className="boton d-flex justify-content-end mt-3 mb-3">
                    <Link to="/formulario">
                        <span className="btn btn-success btn-md justify-content-end" href="./formulario" role="button">
                            Agregar nuevo contacto
                        </span>
                    </Link>
                </div>
                <h1>Mi lista de contactos</h1>
                <h6>Para comenzar incluir contactos en la agenda, debes ir al botón ¨Agregar nuevo contacto¨</h6>

                {store.contactos?.map(
                    (contacto) => (
                        <Card key={contacto.id} name={contacto.name} email={contacto.email} phone={contacto.phone} address={contacto.address} id={contacto.id} />
                    )
                )}
            </div>
        </div>
    );
};

export default Agenda;
