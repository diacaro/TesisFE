import React, { useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { findByIdGreenhouse, getListGreenhouse, updateGreenhouse } from '../../Services/greenhouseService'
import './GreenhouseUpdate.css'

function GreenhouseUpdate({ invernaderoId }) {
    const [closssing, setClossing] = useState('')
    const { setOpenModal, setUpdating } = React.useContext(AppContext);
    const [greenhouse, setGreenhouse] = useState({});
  
    const onSubmit = (event) => {
        event.preventDefault();
        updateGreenhouse(greenhouse).then(data => {
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
        if (event.target.name === 'invernadero')
        setGreenhouse({ ...greenhouse, invernadero: event.target.value })
    }

    useEffect(() => {
        findByIdGreenhouse(invernaderoId).then(data =>
            setGreenhouse(data)
        );
    }, [invernaderoId]);

    useEffect(() => {
        getListGreenhouse().then(data =>
            setGreenhouse(data)
        );
    }, []);

    return (
        <div className="update">
            <div className="update-form-container">                
                <div className="modal__tittle">
            <h1 className="title">Editar invernadero</h1>
                {closssing && <p>Actualizando... {closssing}</p>}
            <button className="modal__button__close" onClick={onClickClose}>x</button>
          </div>
                <form onSubmit={onSubmit}>
                    <div className="update-form-row">
                        <label className="update-label">
                            Invernadero
                            <input
                                name="invernadero"
                                value={greenhouse.invernadero}
                                onChange={onChange}
                                className="update-input"
                            />
                        </label>
    
                    </div>
                    <div className="update-form-row">
                        <label className="update-label">
                            Sede
                            <input
                                name="sede"
                                value={greenhouse.sede}
                                onChange={onChange}
                                className="update-input"
                            />
                        </label>

                    </div>

                    <button type="submit" className="update-primary-button update-button">Actualizar</button>
                </form>
            </div>
        </div>
    );
}

export default GreenhouseUpdate