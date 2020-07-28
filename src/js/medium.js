let domain = "";
let confirmcode = null;
let signature = null;
let access_token = null;

// Detect metamask
if (typeof web3 !== undefined) {
	console.log("web3 is detected.");
} else {
	alert("No web3 detected. Please install metamask");
}

$('.eth-signup').on('click', function () {
	if (web3.eth.accounts[0]) {
		$.get(domain + '/api/auth/' + web3.eth.accounts[0], (res) => {
			confirmcode = res;

			// Call metamask to sign
			const from = web3.eth.accounts[0];
			const params = [confirmcode, from];
			const method = 'eth_signTypedData';
			web3.currentProvider.sendAsync({
				method,
				params,
				from
			}, async (err, result) => {
				if (err) {
					return console.error(err);
				}
				if (result.error) {
					return console.error(result.error);
				}
				signature = result.result;
				if (confirmcode !== null && signature !== null){
					$.post(domain + '/api/auth/' + confirmcode[1].value + '/' + signature, (res) => {
						if (res.success) {
							access_token = res.token;
							console.log("EthAuth Success")
							console.log("Your JWT token: " + access_token)
							window.location = '/medium.html';
						} else {
						console.log("EthAuth Failed")
						}
					});
				}
			});
		});
	}
});

$('.eth-signin').on('click', function () {
	if (web3.eth.accounts[0]) {
		$.get(domain + '/api/auth/' + web3.eth.accounts[0], (res) => {
			confirmcode = res;

			// Call metamask to sign
			const from = web3.eth.accounts[0];
			const params = [confirmcode, from];
			const method = 'eth_signTypedData';
			web3.currentProvider.sendAsync({
				method,
				params,
				from
			}, async (err, result) => {
				if (err) {
					return console.error(err);
				}
				if (result.error) {
					return console.error(result.error);
				}
				signature = result.result;
				if (confirmcode !== null && signature !== null) {
					$.post(domain + '/api/auth/' + confirmcode[1].value + '/' + signature, (res) => {
						if (res.success) {
							access_token = res.token;
							console.log("EthAuth Success")
							console.log("Your JWT token: " + access_token)
							window.location = '/medium.html';
						} else {
							console.log("EthAuth Failed")
						}
					});
				}
			});
		});
	}
});


$(document).ready(function() {
	$.ajax({
		url: domain + '/api/user',
		type: "GET",
		success: function(data) {
			if ( data.success === true ){
				$('.test4')[0].style='';

				// alert(data.message);
			}
			else {
				$('.test3')[0].style='';

				// alert(data.message);
			}
		}
	});
});

$('.test6').on('click', function() {
	$.ajax({
		url: domain + '/api/user',
		type: "GET",
		success: function(data) {
			alert(data.message);
		}
	});
});

$('.test5').on('click', function() {
	$.ajax({
		url: domain + '/api/logout',
		type: "POST",
		success: function(data) {
			window.location = '/medium.html';
		}
	});
});
