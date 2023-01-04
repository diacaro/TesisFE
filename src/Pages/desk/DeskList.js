function DeskList(props){
	return(
		<div className="category-list">
		<table>
		<thead >
		  <tr>
			
			<th>Código</th>
			<th>Categoría</th>
			<th>...</th>
			
		  </tr>
		</thead>
		<tbody>
	        {props.children}
			</tbody>
  </table>
  </div>
	);
	}
	
	export default DeskList