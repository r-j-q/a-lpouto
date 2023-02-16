var baseUrl = "https://api.stock-plouto.com";
// var baseUrl = "http://192.168.1.24:8080/noauth/create-payment-intent?id=1";
  

var buttonText = document.getElementById("submit");
buttonText.style.display="none"
// 6666666666666666666666666666666
// document.addEventListener('UniAppJSBridgeReady', function() {
// 		uni.getEnv(function(res) {
// 			console.log('获取当前环境：' + JSON.stringify(res));
// 		});
// 	});

// HTML 接受APP发送过来的消息 (H5端)
window.addEventListener('message', e => {
	console.log(e.token,'HTML 接受APP发送过来的消息 (H5端)');
let	appdataList = JSON.parse(e.data)
	console.log(appdataList,'+++++++++');
}, false)

var tokens;
// HTML 接受APP发送过来的消息 (APP端)
function requestData(data) {
	console.log( JSON.stringify(data), 'HTML 接受APP发送过来的消息 (APP端)');
	// app.dataList = data.navigation // 赋值


	tokens = data.token || "";


	initialize(data.goodsId);
	checkStatus();

	document
		.querySelector("#payment-form")
		.addEventListener("submit", handleSubmit);
}
// 6666666666666666666666666666666

console.log("tokens==================>", tokens)
// const stripe = Stripe("pk_test_51L8IpsIzNzEUKhl8gMaHzwlkHlFW69ShIbjRVASnUjkZUDyVBb5NX9hzrnRP8rAo5x3F5ILLOl74nsusyTB3FBzf00bzY656Es");
// initialize(3);
// checkStatus();
// document
// 	.querySelector("#payment-form")
// 	.addEventListener("submit", handleSubmit);
//下面是正式环境
const stripe = Stripe(
	"pk_live_51L8IpsIzNzEUKhl8uXHCShyfEXTUAcetBsKbaG690FCXWGcBlFWoxbRdqsKjvKjh2k1WSkRKXYhRl3iZVqLjwZSI00fmzBBSTm");
const items = [{
	id: "prod_LxQP3nkuvcykMZ"
}];

let elements;



async function initialize(goodsId) {
	// http://192.168.1.24:8080/noauth/create-payment-intent?id=1
	//  const response = await fetch("http://192.168.1.24:8080/user/order/create?paytype=stripe&goods_id=3&payway=0", {
	const response = await fetch(`${baseUrl}/user/order/create?paytype=stripe&goods_id=${goodsId}&payway=1`, {
		method: "get",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${tokens}`,

		},
		//  body: JSON.stringify({ items }),
	})
	const {
		clientSecret
	} = await response.json();

	const appearance = {
		theme: 'stripe',
	};
	console.log("====>", clientSecret)
	elements = stripe.elements({
		appearance,
		clientSecret
	});

	const paymentElement = elements.create("payment");
	paymentElement.mount("#payment-element");
	buttonText.style.display="block"
}

async function handleSubmit(e) {
	e.preventDefault();
	setLoading(true);

	const {
		error
	} = await stripe.confirmPayment({
		elements,
		confirmParams: {
			return_url: `${baseUrl}/pay/callbackstripe`,
		},
	});

	if (error.type === "card_error" || error.type === "validation_error") {
		showMessage(error.message);
	} else {
		showMessage("An unexpected error occurred.");
	}

	setLoading(false);
}

async function checkStatus() {
	const clientSecret = new URLSearchParams(window.location.search).get(
		"payment_intent_client_secret"
	);

	if (!clientSecret) {
		return;
	}

	const {
		paymentIntent
	} = await stripe.retrievePaymentIntent(clientSecret);

	switch (paymentIntent.status) {
		case "succeeded":
			showMessage("Payment succeeded!");
			break;
		case "processing":
			showMessage("Your payment is processing.");
			break;
		case "requires_payment_method":
			showMessage("Your payment was not successful, please try again.");
			break;
		default:
			showMessage("Something went wrong.");
			break;
	}
}


function showMessage(messageText) {
	const messageContainer = document.querySelector("#payment-message");

	messageContainer.classList.remove("hidden");
	messageContainer.textContent = messageText;

	setTimeout(function() {
		messageContainer.classList.add("hidden");
		messageText.textContent = "";
	}, 4000);
}

function setLoading(isLoading) {
	if (isLoading) {
		document.querySelector("#submit").disabled = true;
		document.querySelector("#spinner").classList.remove("hidden");
		document.querySelector("#button-text").classList.add("hidden");
	} else {
		document.querySelector("#submit").disabled = false;
		document.querySelector("#spinner").classList.add("hidden");
		document.querySelector("#button-text").classList.remove("hidden");
	}
}
// stripe 支付模块
