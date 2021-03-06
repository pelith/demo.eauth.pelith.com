let domain = ""; 
let confirmcode = null;
let signature = null;
let access_token = null;

// Detect metamask
if (web3) {
  console.log("web3 is detected.");
} else {
  alert("No web3 detected. Please install metamask");
}

$('.get').on('click', function () {
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
      });
    });
  }
});

$('.verify').on('click', function() {
  if (confirmcode !== null && signature !== null){
    $.post(domain + '/api/auth/' + confirmcode[1].value + '/' + signature, (res) => {
      if (res.success) {
        access_token = res.token;
        console.log("EthAuth Success")
        console.log("Your JWT token: " + access_token)
      } else {
        console.log("EthAuth Failed")
      }
    });
  }
});

$('.testapi').on('click', function() {
  $.ajax({
    url: domain + '/api/user',
    type: "GET",
    success: function(data) {
      if (data.success)
        alert(data.message);
      else
        alert("undefined")
    }
  });
});

$('.reset').on('click', function() {
  $.ajax({
    url: domain + '/api/logout',
    type: "post",
    success: function(data) {
      alert("clear");
    }
  });
});