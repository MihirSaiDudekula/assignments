function Card(props)
{
	const styles = [{
		card:{
			backgroundColor:'white',
			border:'1px solid black',
			borderRadius:'10px'
		}
	}]
	return(
		<div style={styles.card}>
			<div>{props.name}</div>
			<div>
				<ul>
				  <li></li>
				</ul>
			</div>
		</div>
	);
}