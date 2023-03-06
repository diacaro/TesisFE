import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { Link, Navigate, redirect, useNavigate, useParams } from 'react-router-dom'
import IconButton from "@mui/material/IconButton";
import ListIcon from "@mui/icons-material/List";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { findByIdOrden } from "../../Services/OrdenService";
import {getDetalleByOrden, getListDetallesView, getListDetalles, listByCodeDetalles,deleteDetalles,createDetalles} from "../../Services/detallesService"
import { getListOrdenView, getListOrden, getOrdenCLiente } from '../../Services/OrdenService'
import { findByIdCustomer } from "../../Services/customerService";




import './custom.css'
import './media-query.css'
// import './style.css'

import Logo from '../../img/logo-mediano.png'
import OrdenPage from "../orden/OrdenPage";

function DetallesPdf() {
    const { detallesId } = useParams();
    const [greenhouse, setGreenhouse] = useState({})
    const [invoice, setContract] = useState({});
    const [orden, setOrden] = useState({});
    const [cliente, setClientes] = useState({});
    const [payments, setPayments] = useState([]);
    //const [product, setProduct] = useState({});
    const [productList, setProductList] = useState([]);
    const [detalles, setDetalles] = useState([]);
    const [info, setInfo] = useState('');
    const [sending, setSending] = useState(false);
	const {ordenId} = useParams();

    useEffect(() => {
			getOrdenCLiente(ordenId).then (dataOrden =>{
				
				setOrden(dataOrden)
				findByIdCustomer(dataOrden.id_clientes).then (dataCliente =>{
					setClientes(dataCliente)
				}) 

			
				}
				) 

			getDetalleByOrden(ordenId).then((data) => 
			setDetalles(data));

			// getListOrdenView().then((data) => 
			// 	setOrden(data));
			  
    

    }, [ordenId])
  

    const createPDF = () => {
        const pdf = new jsPDF("portrait", "pt", "A4");
        const data = document.querySelector("#download_section");
        pdf.html(data).then(() => {
            pdf.save("order{orden.id}.pdf");
        });

    }


    const onChange = (event) => {
        if (event.target.name === 'local')
            setInfo(event.target.value)

    }



	const handlelReturn = () => {
				
		<Navigate to="/orden" />
	  };
    


    return (
<body>
	 {/* <!--Invoice Wrap Start here --> */}
	<div  >
		<button onChange={handlelReturn} >Return  </button>
		<div  class="invoice-container">
			<div id="download_section" class="invoice-content-wrap" >
				{/* <!--Header Start Here --> */}
				<header class="invoice-header text-invoice content-min-width" >
					<div class="invoice-logo-content">
						<div class="invoice-logo">
							<img width="180px" src="../../logo-mediano.png" alt="logo"/>
                            
						</div>
						<div class="invo-head-content">
							<div class="invo-head-wrap">
								<div class="invo-num-title invo-no inter-700">Invoice No:</div>
								<div class="invo-num inter-400">{orden.id}</div>
							</div>
							<div class="invo-head-wrap invoi-date-wrap">
								<div class="invo-num-title invo-no inter-700">Invoice Date:</div>
								<div class="invo-num inter-400">{String(orden.createAt).substring(0,10)}</div>
							</div>
						</div>
					</div>
					<div class="invoice-header-contact">
						<div class="invo-cont-wrap invo-contact-wrap">
						<div class="invo-social-icon">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_6_94)"><path d="M5 4H9L11 9L8.5 10.5C9.57096 12.6715 11.3285 14.429 13.5 15.5L15 13L20 15V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21C14.0993 20.763 10.4202 19.1065 7.65683 16.3432C4.8935 13.5798 3.23705 9.90074 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4" stroke="#00BAFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7C15.5304 7 16.0391 7.21071 16.4142 7.58579C16.7893 7.96086 17 8.46957 17 9" stroke="#00BAFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 3C16.5913 3 18.1174 3.63214 19.2426 4.75736C20.3679 5.88258 21 7.4087 21 9" stroke="#00BAFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_6_94"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
							</div>
							<div class="invo-social-name">
								<div  class="invo-header-contact inter-200">(+593)999310067</div>
							</div>
						</div>
						<div class="invo-cont-wrap">
						<div class="invo-social-icon">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_6_108)"><path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#00BAFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 7L12 13L21 7" stroke="#00BAFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_6_108"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
							</div>
							<div class="invo-social-name">
								<div href="mailto:sales@mundiflora.com" class="invo-header-mail inter-200">sales@mundiflora.com</div>
							</div>
						</div>
					</div>
				</header>
				{/* <!--Header End Here -->
				<!--Invoice content start here --> */}
				<div class="agency-service-content" >
					<div class="container">
						{/* <!--invoice owner name content --> */}
						<div class="invoice-owner-conte-wrap">
							<div class="invo-to-wrap">
								<div class="invoice-to-content">
									<p class="invo-to inter-700 medium-font mtb-0">Sold To:</p>
									<div class="invo-to-owner inter-700 md-lg-font"><h2>{orden.clientes}</h2></div>
									<div class="invo-owner-address medium-font inter-400 mtb-0"> {cliente.phone} </div>
								</div>
							</div>
							
							<div class="invo-pay-to-wrap">
								<div class="invoice-pay-content">
									<p class="invo-to inter-700 medium-font mtb-0">Ship To:</p>
									<h2 class="invo-to-owner inter-700 md-lg-font"></h2>
									<div class="invo-owner-address medium-font inter-400 mtb-0"><h3>{cliente.address} </h3></div>
								</div>
							</div>
						</div>
						{/* <!--Invoice Table Data Start here --> */}
						<div class="table-wrapper agency-service-table">
							<table class="invoice-table">
								<thead>
									<tr class="invo-tb-header">

										<th class="invo-table-title desc-wid inter-700 medium-font">Product Description</th>
										<th class="invo-table-title qty-wid inter-700 medium-font">Qty</th>
										<th class="invo-table-title pric-wid inter-700 medium-font">Location</th>
										<th class="invo-table-title pric-wid inter-700 medium-font">Location</th>
										<th class="invo-table-title tota-wid inter-700 medium-font total-head">Total</th>
									</tr>
								</thead>

								<tbody class="invo-tb-body">
									{detalles.map(item => 
									<tr class="invo-tb-row">
										<td class="invo-tb-data">{item.nombre}</td>
										<td class="invo-tb-data">{item.cantidad}</td>
										<td class="invo-tb-data">{item.mesa}</td>
										<td class="invo-tb-data">{item.invernadero}</td>
										<td class="invo-tb-data total-data">{item.cantidad}</td>
									</tr>
										
										)}

								</tbody>
							</table>
						</div>
						{/* <!--Invoice Table Data End here -->
						<!--Invoice additional info start here --> */}
						<div class="invo-addition-wrap">
							<div class="invo-add-info-content">
								<h3 class="addi-info-title inter-700 medium-font">Additional Information:</h3>
								<p class="add-info-desc inter-400 mtb-0">
									*For plants to be collected from any exhibition in USA the additional cost is USD 2,50$ per plant (shipping and handling)for Europe is USD 2,50$ and for Asia it is USD 3,50$.
								</p>
								<p class="add-info-desc inter-400 mtb-0">
									*The payments can be done by PayPal to sales@mundiflora.com PayPal fee is 4%.

								</p>

								    <p class="add-info-desc inter-400 mtb-0">
									*This price list is subject to plant availability and the prices may change without notice.
									According to International regulations, the plants must be shipped bare root, that means free of substrate. In order to provide to the plant of necessary hydration, we covered its roots with sphagnum moss.
                                    </p>
								</div>
							
							<div class="invo-bill-total">
								<table class="invo-total-table">
									<tbody>
										<tr class="invo-grand-total">
											<td class="inter-700 sm-text primary-color hotel-sub">Total Products:</td>
											<td class="sm-text b-text invo-total-price">8</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						{/* <!--Invoice additional info end here --> */}
					</div>
				</div>
				{/* <!--Invoice content end here --> */}
			</div>

			{/* <!--bottom content start here --> */}
			<section class="agency-bottom-content d-print-none" id="agency_bottom">
				<div class="container">
					{/* <!--print-download content start here --> */}
					<div class="invo-buttons-wrap">

						<div class="invo-print-btn invo-btns">
							<a href="javascript:window.print()" class="print-btn">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g >
									<path d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H14L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 7H10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 13H15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 17H15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_5_313"><rect width="24" height="24" fill="white"/>
									</clipPath></defs></svg>
								<span class="inter-700 medium-font">Print</span>
							</a>
						</div>
						<div class="invo-down-btn invo-btns">
						<IconButton size="small" aria-label="delete" onClick={() => { createPDF() }}>
                  
							<a class="download-btn" id="generatePDF">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_5_246)">
									<path d="M4 17V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 11L12 16L17 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 4V16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_5_246"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
								<span class="inter-700 medium-font">Download</span>
							</a>
                      </IconButton>
					  </div>
						

					</div>
					{/* <!--print-download content end here -->
					<!--Note content --> */}
					<div class="invo-note-wrap">
						<div class="note-title">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8_240)"><path d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19" stroke="#00BAFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H14L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z" stroke="#00BAFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 7H10" stroke="#00BAFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 13H15" stroke="#00BAFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 17H15" stroke="#00BAFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_8_240"><rect width="24" height="24" fill="white"/>
							</clipPath></defs></svg>
							<span class="inter-700 medium-font">Note:</span>
						</div>
						<h3 class="inter-400 medium-font second-color note-desc mtb-0">This is computer generated receipt and does not require physical signature.</h3>
					</div>
				</div>
			</section> 
			{/* <!--bottom content end here --> */}
		</div>
	</div>

            {/* <!--Invoice Wrap End here --> */}
        <script src="../../../assets/js/jquery.min.js"></script>
         <script src="../../../assets/js/jspdf.min.js"></script>
         <script src="../../../assets/js/html2canvas.min.js"></script>
         <script src="../../../assets/js/custom.js"></script>     
 </body>
    );
}


export default DetallesPdf