import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { useParams } from 'react-router-dom'

import { findByIdOrden } from "../../Services/OrdenService";
import {getDetalleByOrden} from "../../Services/detallesService"




import './DetallesPdf.css'

import Logo from '../../img/logo-mediano.png'

function DetallesPdf(ordenId) {
    const { detallesId } = useParams();
    const [greenhouse, setGreenhouse] = useState({})
    const [invoice, setContract] = useState({});
    const [orden, setOrden] = useState({});
    const [payments, setPayments] = useState([]);
    //const [product, setProduct] = useState({});
    const [productList, setProductList] = useState([]);
    const [info, setInfo] = useState('');
    const [sending, setSending] = useState(false);


    useEffect(() => {
        getDetalleByOrden(ordenId).then(dataDetalles => {
                setContract(dataDetalles);
                    getDetalleByOrden(dataDetalles.id).then(dataOrder => {
                        setOrden(dataOrder);
                        
                }
                )
            }
            )


    }, [detallesId])
  

    const createPDF = () => {
        const pdf = new jsPDF("portrait", "pt", "a4");
        const data = document.querySelector("#pdf-order");
        pdf.html(data).then(() => {
            pdf.save("order.pdf");
        });

    }


    const onChange = (event) => {
        if (event.target.name === 'local')
            setInfo(event.target.value)

    }


    return (
        <div className="toPrinter">
            <div className="pdf__options">
                <button onClick={createPDF} type="button">Descargar Orden</button>
            </div>

            <div id="pdf">
                <div id="pdf-invoice" className="pdf__invoice">
                    <div className="pdf__header">
                        <img src={Logo} alt="logo" />
                        <div className="pdf__headerAddress">
                            {(info === '1') ? (<>
                                <p>Dir.: Benigno Malo 6-85 y Presidente Córdova</p>
                                <p>Cel.: 0992719539 - Email: sukaduast@hotmail.com</p>

                            </>) :
                                (<>
                                    <p>Dir.: Tarqui 10-15 y Gran Colombia</p>
                                    <p>Cel.: 0992814385 - Email: sukaduast@hotmail.com</p>

                                </>
                                )
                            }
                            <p style={{ color: 'red' }}>Nro. {detallesId}</p>
                        </div>
                    </div>
                    <div className="pdf__greenhouse">
                        <p className="pdf__tittlegreenhouse">Contrato Cliente</p>
                        <p><span>Cliente: </span><span>{orden.fullname}</span></p>
                        <p><span>Fecha: </span><span>{orden.created}</span></p>
                        <p><span>Telf: </span><span>{greenhouse.cellphone}</span></p>
                    </div>
                    <OrderPdf orden={orden} productList={productList} />
                    <div className="pdf__pay">
                        <p><span>Total</span><span>{invoice.total} </span></p>
                    </div>

                </div>
                <div id="pdf-order" className="pdf__invoice">
                    <div className="pdf__header">
                        <img src={Logo} alt="logo" />
                        <div className="pdf__headerAddress">
                            {(info === '1') ? (<>
                                <p>Dir.: Benigno Malo 6-85 y Presidente Córdova</p>
                                <p>Cel.: 0992719539 - Email: sukaduast@hotmail.com</p>

                            </>) :
                                (<>
                                    <p>Dir.: Tarqui 10-15 y Gran Colombia</p>
                                    <p>Cel.: 0992814385 - Email: sukaduast@hotmail.com</p>
                                </>
                                )
                            }

                            <p style={{ color: 'red' }}>Nro. {orden.id}</p>
                        </div>
                    </div>
                    <div className="pdf__greenhouse">
                        <p className="pdf__tittlegreenhouse">Orden de trabajo</p>
                        <p><span>Cliente: </span><span>{orden.fullname}</span></p>
                        <p><span>Fecha: </span><span>{orden.created}</span></p>
                        <p><span>Orden:: </span><span>{orden.id}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );

}
function OrderPdf({ order, productList }) {
    return (
        <React.Fragment>
            <div className="pdf__rx">

                <span>RX: </span>
                <span>Esfera: </span>
                <span>Cilindro:: </span>
                <span>Eje: </span>
                <span>AV.CC: </span>
                <span>ADD: </span>
                <span>DNP: </span>
                <span>ALTURA: </span>

                <span>OD: </span>
                <span>{order.esferaod} </span>
                <span>{order.cilindrood} </span>
                <span>{order.ejeod} </span>
                <span>{order.avccod} </span>
                <span>{order.addod} </span>
                <span>{order.dnpod} </span>
                <span>{order.alturaod} </span>

                <span>OI: </span>
                <span>{order.esferaid} </span>
                <span>{order.cilindroid} </span>
                <span>{order.ejeid} </span>
                <span>{order.avccid} </span>
                <span>{order.addid} </span>
                <span>{order.dnpid} </span>
                <span>{order.alturaid} </span>
            </div>
            <div className="pdf__material">
                <p><span className="pdf__mesureTittle">Material </span><span>{order.material}  </span></p>
                <p><span>Tipo </span><span>{order.tipo} </span></p>
                <p><span>Protección </span><span>{order.proteccion} </span></p>
                <p><span>Color</span><span>{order.color} </span></p>
                <p><span>Tint/Comp </span><span>{order.tint} </span></p>
            </div>
            <div className="pdf__bifocal">
                <p><span>Tipo bifocal </span><span>{order.bifocal} </span></p>
                <p><span>Tipo Progresivo </span><span>{order.tipoprogresivo} </span></p>
                <p><span>Color </span><span>{order.colordos}</span></p>
                <p><span>Grado Sol</span><span>{order.grado} </span></p>

            </div>
            <div className="pdf__armazon">
                <p className="pdf__armazon_codes"><span>Modelo Armazón</span>
                    <span>
                    {productList.map(item =>
                         <em>{item.code} |</em>
                    )}
                    </span>
                </p>
                <p><span>D.Mayor </span><span>{order.dmayor} </span></p>
                <p><span>D.Horizontal </span><span> {order.dhorizontal} </span></p>
                <p><span>D.Vertical</span><span>{order.dvertical}</span></p>
                <p><span>D.Puente </span><span> {order.puente}</span></p>
            </div>
        </React.Fragment>
    );
}

export default DetallesPdf