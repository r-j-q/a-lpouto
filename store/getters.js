export default {
	userInfo(states) {
		return  uni.getStorageSync("userInfo") ||  states.userInfo;
	},
	 

};
