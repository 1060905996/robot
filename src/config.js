


let server={
	 imgServerUrl:"http://116.228.202.222:18080/", 
	 queryServerUrl:"http://116.228.202.222:18680/",			//金融智脑 和 建行机器人 接口
	 queryMessageUrl:"/",			// 智能客服
	 answerMap:{"0100":"1","0110":"2","0120":"2",
	 "0200":"1","0210":"2","0300":"1","0310":"2",
	 "0400":"1","0500":"1",
	 "8000":"3","8001":"1","8002":"2","8003":"2","8004":"2",
	 "9990":"3","9991":"2","9992":"2","9999":"3"}, // 报文answerId和页面类型对照
}

// uuid
let guid = function(){
	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() +
		S4());
	
};

/**
 * 获取显示类型
 */
let simplifyAnswerId =  function(answerId){
	var t =server.answerMap[answerId];
	if(t ==undefined){
		return answerId;
	}
	return t;
}

export default{
	server,
	guid,
	simplifyAnswerId,
}