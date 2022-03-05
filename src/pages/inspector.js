const Inspector = () => {
	let inspectionURL = window.location.pathname.slice(5);
	return (
		<p>{inspectionURL}</p>
	);
  };
  
export default Inspector;
