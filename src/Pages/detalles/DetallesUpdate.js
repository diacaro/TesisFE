import React, { useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { findByIdProduct, updateProduct } from '../../Services/productService'
import { getListDesk, getListDeskInvernadero } from '../../Services/deskService'
import { getListGreenhouse } from '../../Services/greenhouseService'
import './DetallesUpdate.css'
import { getListCategory } from "../../Services/categoryService";
import { FormControl, InputLabel, Select } from "@mui/material";

function ProductUpdate({ productId }) {
    const [category, setCategory] = useState([]);
    const [mesa, setDesk] = useState([]);
    const [invernadero, setGreenhouse] = useState([]);
    const [closssing, setClossing] = useState('')
    const [idInvernadero, setIdInvernadero] = useState("")
    const { setOpenModal, setUpdating } = React.useContext(AppContext);
    const [product, setProduct] = useState({ nombre: '', clima: '', precio: '',  sede: '', cantidad: '', idCategoria: '', idMesa: '' });

    const onSubmit = (event) => {
        event.preventDefault();
        updateProduct(product).then(data => {
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
   
        if (event.target.name === 'nombre')
            setProduct({ ...product, nombre: event.target.value })
        if (event.target.name === 'clima')
            setProduct({ ...product, clima: event.target.value })
        if (event.target.name === 'precio')
            setProduct({ ...product, precio: event.target.value })
        if (event.target.name === 'idCategoria')
            setProduct({ ...product, idCategoria: event.target.value })
        if (event.target.name === 'idMesa')
            setProduct({ ...product, idMesa: event.target.value })
        if (event.target.name === 'idInvernadero')
            setIdInvernadero(event.target.value )
        if (event.target.name === 'sede')
            setProduct({ ...product, status: event.target.value })
        if (event.target.name === 'cantidad')
            setProduct({ ...product, cantidad: event.target.value })     
    }

    useEffect(() => {
        findByIdProduct(productId).then(data =>
            setProduct(data)
        );
    }, [productId]);

    useEffect(() => {
        getListDesk().then(data =>
            setDesk(data)
        );
    }, []);

    useEffect(() => {
        getListDeskInvernadero(idInvernadero).then(data =>
            setDesk(data)
        );
    }, [idInvernadero]);

    useEffect(() => {
        getListGreenhouse().then(data =>
            setGreenhouse(data)
        );
    }, []);
    useEffect(() => {
        getListCategory().then(data =>
            setCategory(data)
        );
    }, []);


    return (
        <div className="modal">
            <div className="modal__container">
                <div className="modal__tittle">
                    <h1 className="title">Editar producto</h1>
                    <button className="modal__button__close" onClick={onClickClose}>x</button>
                </div>
                <form onSubmit={onSubmit} className="form">
                    <div className="modal__formrow">
                        <label className="modal__label">
                            Nombre
                            <input
                                name="nombre"
                                value={product.nombre}
                                onChange={onChange}
                                className="modal__input modal__input-name"
                            />
                        </label>
                        </div>
                        <div className="modal__formrow">
                        <label className="modal__label">
                            Clima
                            <input
                                name="clima"
                                value={product.clima}
                                onChange={onChange}
                                className="modal__input modal__input-name"
                            />
                        </label>
                        </div>
                        <label className="modal__label">
                            Precio
                            <input
                                name="precio"
                                value={product.precio}
                                onChange={onChange}
                                className="modal__input modal__input-name"
                            />
                            <label className="modal__label"> $</label>
                        </label>
                        <div className="modal__formrow">

                        <label className="modal__label">
                        Categoria </label>
                        <select
                            className="modal__select"
                            name="idCategoria"
                            onChange={onChange}
                            value={product.idCategoria}                        >
                            <option>Categoria---</option>
                            {
                                category.map(item =>
                                    <option key={item.id} value={item.id}>{item.categoria}</option>
                                )
                            }
                        </select>
                        </div>

                        <div className="modal__formrow">
                        <label className="modal__label">
                        Mesa </label>
                        <select
                            className="modal__select"
                            name="idMesa"
                            onChange={onChange}
                            value={product.idMesa}                        >
                            <option>Mesa---</option>
                            {
                                mesa.map(item =>
                                    <option key={item.id} value={item.id}>{item.mesa}</option>
                                )
                            }
                        </select>

                    </div>
                    <label className="modal__label">
                        Invernadero </label>
                    <select
                            
                            className="modal__select"
                            name="idInvernadero"
                            onChange={onChange}
                            value={idInvernadero}                        >
                            <option>Invernadero</option>
                            {
                                invernadero.map(item =>
                                    <option key={item.id} value={item.id}>{item.invernadero}</option>
                                )
                            }
                        </select>

                    <div className="modal__formrow">
                    <label className="modal__label">
                            Cantidad
                            <input
                                name="cantidad"
                                value={product.cantidad}
                                onChange={onChange}
                                className="modal__input modal__input-name"
                            />
                        </label>                     

                    </div>

                    <button type="submit" className="update-primary-button update-button">Actualizar</button>

                </form>
            </div>
        </div>

    );

}

export default ProductUpdate