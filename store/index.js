import Vue from "vue";
import Vuex from "vuex"; 
import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";
Vue.use(Vuex); 
const state = {
	userInfo: null, 
};

export default new Vuex.Store({
	strict: false,
	state,
	getters,
	actions,
	mutations, 
});
