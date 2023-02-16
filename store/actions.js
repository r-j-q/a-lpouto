import * as type from "./mutations_types.js";

export default {
	setUserInfo: ({
		commit,
		state
	}, param) => {
		commit(type.USER_INFO, param);
	}

};
