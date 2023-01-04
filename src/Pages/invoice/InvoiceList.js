function InvoiceList(props){
	return(
		<div className="product-list">
		<table>
		<thead >
		  <tr>
			
			<th>Id</th>
			<th>Fecha</th>
			<th>Cliente</th>						
			<th>::</th>
			
		  </tr>
		</thead>
		<tbody>
	        {props.children}
			</tbody>
  </table>
  </div>
	);
	}
	
	export default InvoiceList