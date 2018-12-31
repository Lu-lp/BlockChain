



window.onload = function (){
  if(typeof web3 !== 'undefined'){
    web3 = new Web3(web3.currentProvider);
  }else{
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  // 根据合约部署地址自行修改
  address = "0x1f70ae1cab03b306b425a5c81d0c97c0e13669d5";
  web3.eth.defaultAccount = web3.eth.accounts[0];
  contract = web3.eth.contract([{"constant":false,"inputs":[],"name":"setChairMan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"loc","type":"string"},{"name":"pr","type":"uint32"}],"name":"addRoom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"roomNum","type":"uint32"}],"name":"getPriceOfRoom","outputs":[{"name":"price","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"roomNum","type":"uint32"}],"name":"isBooked","outputs":[{"name":"booked","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"},{"name":"roomNum","type":"uint32"}],"name":"cancelBooked","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"roomNum","type":"uint32"}],"name":"getLocaOfRoom","outputs":[{"name":"infoOfRoom","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"getNumberOfRoom","outputs":[{"name":"numOfRoom","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"},{"name":"roomNum","type":"uint256"}],"name":"reserve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"money","type":"uint32"}],"name":"reCharge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"getBalance","outputs":[{"name":"balance","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"}]);
  instance = contract.at(address);
  instance.setChairMan({from: web3.eth.defaultAccount, gas: 300000, vlue: 0});
}

var userAddress = "0xdd9fd3443c5d3f8314c89f723dafc6cdfecb4d92";
setUserAddress = function (){
  userAddress = document.getElementById('UserAddress').value
}

addRoom = function() {
  var location = document.getElementById('location').value;
  var price = parseInt(document.getElementById('price').value);
  instance.addRoom(location, price, {from: userAddress, gas: 300000, vlue: 0});
}

getRoomInformation = function() {
  var ownerAddress = document.getElementById('providerGet').value;
  var roomNumber = parseInt(document.getElementById('RoomNumGet').value);
  var location = instance.getLocaOfRoom(ownerAddress,roomNumber,{from: userAddress, gas: 300000, vlue: 0});
  document.getElementById('RoomLocation').innerHTML = location;
  var price = instance.getPriceOfRoom(ownerAddress,roomNumber, {from: userAddress, gas: 300000, vlue: 0});
  document.getElementById('RoomPrice').innerHTML = price;
  var isBooked = instance.isBooked(ownerAddress,roomNumber, {from: userAddress, gas: 300000, vlue: 0});
  document.getElementById('isBooked').innerHTML = isBooked;
}

bookRoom = function() {
  var ownerAddress = document.getElementById('providerBook').value;
  var roomNumber = parseInt(document.getElementById('RoomNumBook').value);
  instance.reserve(ownerAddress, roomNumber, {from: userAddress, gas: 300000, vlue: 0});
}

cancel = function(){
  var ownerAddress = document.getElementById('providerBook').value;
  var roomNumber = parseInt(document.getElementById('RoomNumBook').value);
  instance.cancelBooked(ownerAddress, roomNumber, {from: userAddress, gas: 300000, vlue: 0});
}

send = function(){
  var ownerAddress = document.getElementById('address').value;
  var money = parseInt(document.getElementById('money').value);
  instance.reCharge(ownerAddress, money, {from: web3.eth.defaultAccount, gas: 300000, vlue: 0});
}
getBalance = function(){
  document.getElementById('balance').innerHTML = instance.getBalance(userAddress);
}