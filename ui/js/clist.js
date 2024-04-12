$(document).ready(function() {
	$('.modal').modal();
		// $.ajax({
	 //    url: '/getaddress',
	 //    method: 'post'
		// }).done(function(){
		// 	console.log('done');
		// });
	

		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		abi = [
			{
				"constant": false,
				"inputs": [
					{
						"name": "candidate",
						"type": "bytes32"
					}
				],
				"name": "totalVotesFor",
				"outputs": [
					{
						"name": "",
						"type": "uint8"
					}
				],
				"payable": false,
				"type": "function",
				"stateMutability": "nonpayable"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "candidate",
						"type": "bytes32"
					}
				],
				"name": "validCandidate",
				"outputs": [
					{
						"name": "",
						"type": "bool"
					}
				],
				"payable": false,
				"type": "function",
				"stateMutability": "nonpayable"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "",
						"type": "bytes32"
					}
				],
				"name": "votesReceived",
				"outputs": [
					{
						"name": "",
						"type": "uint8"
					}
				],
				"payable": false,
				"type": "function",
				"stateMutability": "view"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "",
						"type": "uint256"
					}
				],
				"name": "candidateList",
				"outputs": [
					{
						"name": "",
						"type": "bytes32"
					}
				],
				"payable": false,
				"type": "function",
				"stateMutability": "view"
			},
			{
				"constant": false,
				"inputs": [
					{
						"name": "candidate",
						"type": "bytes32"
					}
				],
				"name": "voteForCandidate",
				"outputs": [],
				"payable": false,
				"type": "function",
				"stateMutability": "nonpayable"
			},
			{
				"inputs": [
					{
						"name": "candidateNames",
						"type": "bytes32[]"
					}
				],
				"payable": false,
				"type": "constructor",
				"stateMutability": "nonpayable"
			}
		];
		VotingContract = new web3.eth.Contract(abi);
		// VotingContract = web3.eth.contract(abi);
		contractInstance = new web3.eth.Contract(abi, '0x4313b99a6784749a0fad27ba34f12491ccf29bcb');
		const connectButton = document.getElementById("connectButton");
		const walletID = document.getElementById("walletID");

		// candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}
	
	
		//check cookie
		function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
		}
	
		var aadhaar_list = {
			"300000000000" : "Akola",
			"738253790005" : "Bhandara",
			"683428114710":"Mumbai"
		}
	
		var aadhaar = readCookie('aadhaar');
	
		console.log(aadhaar);
		var address = aadhaar_list[aadhaar];
		console.log(address);
		$('#loc_info').text('Location based on Aadhaar : '+ address)
	
		function disable() {
				$('#vote1').addClass( "disabled" );
				$('#vote2').addClass( "disabled" );
				$('#vote3').addClass( "disabled" );
				$('#vote4').addClass( "disabled" );
				
				//logout
				document.cookie = "show=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
				document.cookie = "aadhaar=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
				window.location = '/info';
	
	
		}


		

		// Convert candidate name to bytes32 format
function toBytes32(name) {
    return web3.utils.asciiToHex(name.padEnd(32, '\0'));
}

function getWalletID() {
	if (typeof window.ethereum !== "undefined") {
	  return ethereum
		.request({ method: "eth_requestAccounts" })
		.then((accounts) => {
		  return accounts[0];
		});
	} else {
	  // If MetaMask is not installed or not detected
	  window.open("https://metamask.io/download/", "_blank");
	  return Promise.reject("MetaMask not installed or not detected");
	}
  }

// Voting function
function voteForCandidate(candidateName) {
    var candidateNameBytes32 = toBytes32(candidateName);

    contractInstance.methods.voteForCandidate(candidateNameBytes32).send({from:'0x7b6609aA41B7A95ac4955dc89DD155a79a71E009'}, function(error, result) {
        if (error) {
            console.error("Error:", error);
        } else {
            console.log("Transaction successful:", result);
            alert('Vote submitted successfully to ' + candidateName);
            disable();
            $('#loc_info').text('Vote submitted successfully to ' + candidateName);
        }
    });
}

// Event listeners for voting buttons
$('#vote1').click(function(){
	voteForCandidate('Sanat');
	//try{
	// const account = await getWalletID();
	// console.log('ACCOUNT -> ', account);
	// walletID.innerHTML = `Wallet connected: ${account}`;
	// catch(error){
	// 	console.error("Error retrieving wallet ID:", error);
	// }
});

$('#vote2').click(function(){
    voteForCandidate('Aniket');
});

$('#vote3').click(function(){
    voteForCandidate('Mandar');
});

$('#vote4').click(function(){
    voteForCandidate('Akshay');
});

	// 	// ACTUAL DOWN FROM HERE


		// $('#vote1').click(function(){
		// 	contractInstance.methods.voteForCandidate("Sanat").send({from: '0x6E46A0a89cF9753bB20457Ed05bF35EDDf418090'}, function() {
		// 		alert('vote submited to Sanat');
		// 		disable();
	 	// 	$('#loc_info').text('Vote submited successfully to Sanat')
	
		// 	});
		//  })
	// 	$('#vote2').click(function(){
	// 		contractInstance.voteForCandidate('Aniket', {from: web3.eth.accounts[0]}, function() {
	// 			alert('vote submited to Aniket');
	// 			 disable();
	// 			 $('#loc_info').text('Vote submited successfully to Aniket')
	// 		});
	// 	})
	// 	$('#vote3').click(function(){
	// 		contractInstance.voteForCandidate('Mandar', {from: web3.eth.accounts[0]}, function() {
	// 			alert('vote submited to Mandar');
	// 			 disable();
				  
	// 			  $('#loc_info').text('Vote submited successfully to Mandar')
	// 		});
	// 	})
	// 	$('#vote4').click(function(){
	// 		contractInstance.voteForCandidate('Akshay', {from: web3.eth.accounts[0]}, function() {
	// 			alert('vote submited to Akshay');
	// 			 disable();
	// 			 $('#loc_info').text('Vote submited successfully to Akshay')
	// 		});
	// 	})
	});