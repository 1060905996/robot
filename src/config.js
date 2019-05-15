


let server={
	 imgServerUrl:"http://116.228.202.222:18080/",
	queryServerUrl:"http://116.228.202.222:18180/",
	/* queryServerUrl:"/",queryMessageUrl:"/", */
}
let guid = function(){
	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() +
		S4());
	
}

export default{
	server,
	guid,
}