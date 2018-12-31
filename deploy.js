var Web3 = require('web3')
var fs = require('fs');



var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

var abi = JSON.parse(fs.readFileSync("Renting_sol_Renting.abi"));
var byteCode = fs.readFileSync("Renting_sol_Renting.bin");

var myContract = web3.eth.contract(abi);


var my = myContract.new( {     
	from: web3.eth.accounts[0], 
	data: byteCode,      
	gas: 4700000   
	},
	function (e, result){    
		console.log(e, result);    
		if ( typeof(result.address) !== 'undefined' || result != null) {         
			console.log('Contract mined! address: ' + result.address + ' transactionHash: ' + result.transactionHash);    
		} 
	}
)
