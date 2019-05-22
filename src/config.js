


let server={
	 imgServerUrl:"http://192.168.1.91:8080/",
	/*queryServerUrl:"http://116.228.202.222:18180/", */
	queryServerUrl:"/",queryMessageUrl:"/",
}
// uuid
let guid = function(){
	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() +
		S4());
	
}
/**
 * 获取显示类型
 */
let answerId
let simplifyAnswerId =  function(answerId){
	
}

export default{
	server,
	guid,
}