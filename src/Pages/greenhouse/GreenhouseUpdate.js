import React, { useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { findByIdGreenhouse, updateGreenhouse } from '../../Services/greenhouseService'
import './GreenhouseUpdate.css'

function GreenhouseUpdate({ greenhouseId }) {
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
        setGreenhouse({
            ...greenhouse,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        findByIdGreenhouse(greenhouseId).then(data =>
            setGreenhouse(data)
        );
    }, [greenhouseId]);

    return (
        <div className="update">
            <div className="update-form-container">                
                <div className="modal__tittle">
            <h1 className="title">Editar cliente</h1>
                {closssing && <p>Actualizando... {closssing}</p>}
            <button className="modal__button__close" onClick={onClickClose}>x</button>
          </div>
                <form onSubmit={onSubmit}>
                    <div className="update-form-row">
                        <label className="update-label">
                            Nombres
                            <input
                                name="fullname"
                                value={greenhouse.fullname}
                                onChange={onChange}
                                className="update-input"
                            />
                        </label>
    
                    </div>
                    <div className="update-form-row">
                        <label className="update-label">
                            Cedula
                            <input
                                name="nui"
                                value={greenhouse.nui}
                                onChange={onChange}
                                className="update-input"
                            />
                        </label>

                    </div>
                    <div className="update-form-row">
                        <label className="update-label">
                            Direccion
                            <input
                                name="address"
                                value={greenhouse.address}
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