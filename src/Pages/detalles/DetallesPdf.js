import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { useParams } from 'react-router-dom'

import { findContractById } from '../../service/invoiceService'
import { findByIdGreenhouse } from '../../service/greenhouseService'
import { findOrderByContractId } from '../../service/orderService'
import { listPaymentsByContractId } from '../../service/PaymentService'
import { getListOrderProductByOrderId  } from '../../service/orderProductService'
import { sendMailById } from '../../service/userService'



import './DetallesPdf.css'

import Logo from '../../img/logo-mediano.png'

function ContractPdf() {
    const { invoiceId } = useParams();
    const [greenhouse, setGreenhouse] = useState({})
    const [invoice, setContract] = useState({});
    const [order, setOrder] = useState({});
    const [payments, setPayments] = useState([]);
    //const [product, setProduct] = useState({});
    const [productList, setProductList] = useState([]);
    const [info, setInfo] = useState('');
    const [sending, setSending] = useState(false);


    useEffect(() => {
        findContractById(invoiceId)
            .then(dataContract => {
                setContract(dataContract);
                findByIdGreenhouse(dataContract.greenhouseId)
                    .then(dataGreenhouse =>
                        setGreenhouse(dataGreenhouse)
                    )
                listPaymentsByContractId(dataContract.id)
                    .then(dataPayments =>
                        setPayments(dataPayments)
                    )
                findOrderByContractId(dataContract.id)
                    .then(dataOrder => {
                        setOrder(dataOrder);
                        getListOrderProductByOrderId(dataOrder.id)
                        .then(dataOpList =>
                          setProductList(dataOpList)
                        )
                    }
                    )
            }
            )


    }, [invoiceId])
  

    const createPDF = () => {

        const pdfContract = new jsPDF("portrait", "pt", "a4");
        const dataContract = document.querySelector("#pdf-invoice");
        pdfContract.html(dataContract).then(() => {
            pdfContract.save("invoice.pdf");
        });
    }
    const createPDFOrder = () => {
        const pdf = new jsPDF("portrait", "pt", "a4");
        const data = document.querySelector("#pdf-order");
        pdf.html(data).then(() => {
            pdf.save("order.pdf");
        });

    }

    const sendMail = () => {
        console.log(invoiceId)
        setSending(true)
        sendMailById(invoiceId)
            .then(data => setSending(false))
            .catch((error) => {
                console.log(error)
              });
    };

    const onChange = (event) => {
        if (event.target.name === 'local')
            setInfo(event.target.value)

    }


    return (
        <div className="toPrinter">
            <div className="pdf__options">
                <select value={info} name="local" onChange={onChange}>
                    <option value=''>--Local</option>
                    <option value='1'>Principal</option>
                    <option value='2'>Sucursal</option>

                </select>
                <button onClick={createPDF} type="button">Descargar Contrato</button>
                <button onClick={createPDFOrder} type="button">Descargar Orden</button>
                <button onClick={sendMail} type="button">Enviar</button>
            </div>
                {sending && (<p>Enviando correo...</p>)}

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
                            <p style={{ color: 'red' }}>Nro. {invoiceId}</p>
                        </div>
                    </div>
                    <div className="pdf__greenhouse">
                        <p className="pdf__tittlegreenhouse">Contrato Cliente</p>
                        <p><span>Cliente: </span><span>{greenhouse.name + ' ' + greenhouse.lastname}</span></p>
                        <p><span>Fecha: </span><span>{invoice.created}</span></p>
                        <p><span>CI:: </span><span>{greenhouse.nui}</span></p>
                        <p><span>Telf: </span><span>{greenhouse.cellphone}</span></p>
                    </div>
                    <OrderPdf order={order} productList={productList} />
                    <div className="pdf__pay">
                        <p><span>Total</span><span>{invoice.total} </span></p>
                        <p><span>Saldo</span><span>{invoice.balance} </span></p>
                        <div className="pdf__paydetail">
                            <span>Abonos</span>
                            <p>
                                {payments.map(payment =>
                                    <span key={payment.id}>
                                        {payment.payMethod.substring(0, 3)}:
                                        {payment.valuePay}
                                    </span>)
                                }
                            </p>
                        </div>
                    </div>

                    <div className="pdf__signature">
                        <p><span>Fecha de entrega</span><span>{invoice.dateOfDelivery}</span></p>
                        <p>
                            <span>Firma</span>
                            <span style={{ paddingTop: '12px' }}>__________________</span>
                            <span>Estoy de acuerdo</span>
                        </p>
                        <p>
                            <span>Estimados cliente</span>
                            <span>La fecha maxima de entrega del tabajo es de 7 días laborables, en caso de cualquier inconveniente será conmunicado con anterioridad</span>
                            <span>Las monturas  de marca registrada tienen un año de garantía exclusivamente por defecto de fábrica tornillos, desprendimiento de apliques y rayaduras del flex</span>
                            <span>Los armazones económicos tienen 6 meses de garantía por defectos de fábrica y los armazones de marca de un año de garantía por defectos de fábrica</span>
                            <span>Tiempo maximo de retiro: 1 mes, caso contrario no habrá devolución</span>
                        </p>
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

                            <p style={{ color: 'red' }}>Nro. {order.id}</p>
                        </div>
                    </div>
                    <div className="pdf__greenhouse">
                        <p className="pdf__tittlegreenhouse">Orden de trabajo</p>
                        <p><span>Cliente: </span><span>{greenhouse.name + ' ' + greenhouse.lastname}</span></p>
                        <p><span>Fecha: </span><span>{invoice.created}</span></p>
                        <p><span>Orden:: </span><span>{order.id}</span></p>
                        <p><span>Laboratorio: </span><span>{order.laboratory}</span></p>
                    </div>
                    <OrderPdf order={order} productList={productList} />
                    <div className="pdf__signatureoptometra">
                        <p><span>Observaciones:</span><span>{order.observaciones}</span></p>
                        <p><span >Firma y sello optometra</span>
                            <span style={{ paddingTop: '12px' }}>__________________</span></p>
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

export default ContractPdf