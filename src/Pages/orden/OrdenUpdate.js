import React, { useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { findByIdDesk, getListDesk, getListDeskView, updateDesk } from '../../Services/deskService'
import { getListGreenhouse } from "../../Services/greenhouseService";
import './OrdenUpdate.css'

function DeskUpdate({ mesaId }) {
    const [closssing, setClossing] = useState('')
    const { setOpenModal, setUpdating } = React.useContext(AppContext);
    const [mesa, setMesa] = useState({mesa: '', idInvernadero :'' });
    const [invernaderos, setInvernaderos] = useState([]);
  
    const onSubmit = (event) => {
        event.preventDefault();
        updateDesk(mesa).then(data => {
            setClossing(data.name);
            setOpenModal(false);
            setUpdating(false);
        }
        )
    }

    const onClickClose = () => {
        setOpenModal(false);
        setUpdating(false);
    }

    const onChange = (event) => {
        if (event.target.name === 'mesa')
        setMesa({ ...mesa, mesa: event.target.value })
        if (event.target.name === 'idInvernadero')
        setMesa({ ...mesa, idInvernadero: event.target.value })
    }

    useEffect(() => {
        findByIdDesk(mesaId).then(data =>
            setMesa(data)
        );
    }, [mesaId]);

    useEffect(() => {
        getListGreenhouse().then(data =>
            setInvernaderos(data)
        );
    }, []);

    useEffect(() => {
        getListDesk().then(data =>
            setMesa(data)
        );
    }, []);

    return (
        <div className="update">
            <div className="update-form-container">                
                <div className="modal__tittle">
            <h1 className="title">Editar Mesa</h1>
                {closssing && <p>Actualizando... {closssing}</p>}
            <button className="modal__button__close" onClick={onClickClose}>x</button>
          </div>
                <form onSubmit={onSubmit}>
                    <div className="update-form-row">
                        <label className="update-label">
                            Mesa
                            <input
                                name="mesa"
                                value={mesa.mesa}
                                onChange={onChange}
                                className="update-input"
                            />
                        </label>
    
                    </div>
                    <div className="update-form-row">
                    <select
                            className="modal__select"
                            name="idInvernadero"
                            onChange={onChange}
                            value={mesa.idInvernadero}                        >
                            <option>Invernadero---</option>
                            {
                                invernaderos.map(item =>
                                    <option key={item.id} value={item.id}>{item.invernadero}</option>
                                )
                            }
                        </select>

                    </div>

                    <button type="submit" className="update-primary-button update-button">Actualizar</button>
                </form>
            </div>
        </div>
    );
}

export default DeskUpdate