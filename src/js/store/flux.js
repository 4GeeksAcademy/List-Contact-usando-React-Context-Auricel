import contactDispatcher from './contactDispatcher';

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contactos: [], // aqui se almacenaran todos los contactos que vengan de la api

            contacto: {},
        },
        actions: {
            traerContactosDeLaApi: async () => {
                const contactList = await contactDispatcher.get();
                const store = getStore(); // en la const store guardo todo lo que tiene store
                setStore({ ...store, contactos: contactList }); // actualizo el store
                console.log(getStore());
                console.log(store.contactos);
            },

            crearAgenda: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/Auricel', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (!response.ok) {
                        console.log('La genda ya existe');
                    }
                    const data = await response.json();
                    if (response.ok) {
                        console.log('Agenda creada exitosamente');
                    }
                } catch (error) {
                    console.log(error);
                }
            },

            agregarContactoaLaApi: async (name, email, phone, address, navigate) => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/Auricel/contacts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: name, // aca voy a tener que poner el estado que captura el valor del input
                            phone: phone,
                            email: email,
                            address: address,
                        }),
                    });
                    if (!response.ok) {
                        console.log('No se ha podido agregar el contacto');
                    }
                    if (response.ok) {
                        console.log('Contacto agregado exitosamente');
                    }
                    const data = await response.json();
                    console.log(data);
                    const store = getStore(); // obtengo el estado, todos los estados
                    console.log(store);
                    //setStore([...store.contactos, data]); // esta mal en este caso... modifico el estado, aca estoy cambiando todo el store, y sobreescribiendo el objeto de store,para ponerlo en un array

                    setStore({ contactos: [...store.contactos, data] }); //modifique el estado de contactos
                    //setStore({ ...store, nombre: 'javier' }); es un ejemplo
                    console.log(store);
                    navigate('/');
                } catch (error) {
                    console.log(error);
                }
            },

            editarContacto: async (name, email, phone, address, id, navigate) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/Auricel/contacts/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: name,
                            phone: phone,
                            email: email,
                            address: address,
                        }),
                    });
                    if (!response.ok) {
                        console.log('No se ha podido editar el contacto');
                        throw 'ha ocurrido un error al editar el contacto'; // si el codigo entra aqui, ya luego se va al catch
                    }

                    console.log('Contacto modificado');

                    const data = await response.json();
                    console.log(data);
                    if (data) {
                        getActions().traerContactosDeLaApi();
                        navigate('/');
                    }
                } catch (error) {
                    console.log(error);
                }
            },

            borrarContacto: async (id) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/Auricel/contacts/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (!response.ok) {
                        console.log('No se ha podido borrar el contacto');
                        throw 'ha ocurrido un error al borrar el contacto'; // si el codigo entra aqui, ya luego se va al catch
                    }

                    console.log('Contacto borrado');

                    let data;
                    if (response.status !== 204) {
                        data = await response.json();
                        console.log(data);
                    } else {
                        console.log('Respuesta sin contenido');
                    }

                    const store = getStore(); // obtengo el estado, todos los estados
                    console.log(store);

                    const contactosModificados = store.contactos.filter((item) => {
                        return item.id != id;
                    });

                    setStore({ contactos: contactosModificados }); //modifique el estado de contactos

                    console.log(store);
                } catch (error) {
                    console.log(error);
                }
            },

            contactoAEditar: (name, email, phone, address, id) => {
                console.log(name, email, phone, address, id);

                setStore({
                    contacto: {
                        name: name,
                        email: email,
                        phone: phone,
                        address: address,
                        id: id,
                    },
                });
            },
        },
    };
};

export default getState;