import React, { useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { findByIdProduct, updateProduct } from '../../Services/productService'
import { getListDesk } from '../../Services/deskService'
import { getListGreenhouse } from '../../Services/greenhouseService'
import './ProductUpdate.css'
import { getListCategory } from "../../Services/categoryService";
import { FormControl, InputLabel, Select } from "@mui/material";

function ProductUpdate({ productId }) {
    const [category, setCategory] = useState([]);
    const [mesa, setDesk] = useState([]);
    const [invernadero, setGreenhouse] = useState([]);
    const [closssing, setClossing] = useState('')
    const { setOpenModal, setUpdating } = React.useContext(AppContext);
    const [product, setProduct] = useState({ nombre: '', clima: '', precio: '', mesaId: '', invernaderoId: '', sede: '' });

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
        if (event.target.name === 'categoriaId')
            setProduct({ ...product, categoriaId: event.target.value })
        if (event.target.name === 'mesaId')
            setProduct({ ...product, mesaId: event.target.value })
        if (event.target.name === 'invernaderoID')
            setProduct({ ...product, stock: event.target.value })
        if (event.target.name === 'sede')
            setProduct({ ...product, status: event.target.value })
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
                        </label>
                        <div className="modal__formrow">

                        <select
                            className="modal__select"
                            name="categoriaId"
                            onChange={onChange}
                            value={product.categoriaId}                        >
                            <option>Categoria---</option>
                            {
                                category.map(item =>
                                    <option key={item.id} value={item.id}>{item.categoria}</option>
                                )
                            }
                        </select>
                        </div>

                        <div className="modal__formrow">

                        <select
                            className="modal__select"
                            name="mesaId"
                            onChange={onChange}
                            value={product.mesaId}                        >
                            <option>Mesa---</option>
                            {
                                mesa.map(item =>
                                    <option key={item.id} value={item.id}>{item.mesa}</option>
                                )
                            }
                        </select>

                    </div>
                    <select
                            className="modal__select"
                            name="invernaderoId"
                            onChange={onChange}
                            value={product.invernaderoId}                        >
                            <option>Invernadero---</option>
                            {
                                invernadero.map(item =>
                                    <option key={item.id} value={item.id}>{item.invernadero}</option>
                                )
                            }
                        </select>

                    <div className="modal__formrow">

                    </div>

                    <button type="submit" className="update-primary-button update-button">Actualizar</button>

                </form>
            </div>
        </div>

    );

}

export default ProductUpdate