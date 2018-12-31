pragma solidity ^0.5.0;
contract Renting {
    struct User {
        string name;
        string phoneNumber;
        uint32 money;
        Room [] rentingRooms;
        Room bookedRooms;
    }
    struct Room {
        string location;
        bool booked; 
        uint32 price;
        address buyer;
    }
    /// judge whether the chair man has been set
    bool isSetChairMan = false;
    
    mapping(address => User) users;
    
    address CHAIR_MAN;
    
    /// generate a new Renting with zero parameter
    //constructor () public { }
    
    /// make a reservation  for the room of $(ower),
    /// roomNum means which room you make a reservation
    function reserve(address owner, uint256 roomNum) public {
        User storage user = users[owner];
        uint256 x = user.rentingRooms.length;
        if(x <= roomNum || user.rentingRooms[roomNum].booked){
            return;
        }
        User storage user1 = users[msg.sender];
        if(user1.money < user.rentingRooms[roomNum].price){
            return ;
        }
        user1.money -= user.rentingRooms[roomNum].price;
        user.rentingRooms[roomNum].booked = true;
        user.money += user.rentingRooms[roomNum].price;
        user1.bookedRooms  = user.rentingRooms[roomNum];
        user.rentingRooms[roomNum].buyer = msg.sender;
    }
    
    /// cancel the reservation of the room
    function cancelBooked(address owner, uint32 roomNum) public {
        User storage user = users[owner];
        if(user.rentingRooms.length <= roomNum || !user.rentingRooms[roomNum].booked)
            return;
        user.rentingRooms[roomNum].booked = false;
        user.rentingRooms[roomNum].buyer = owner;
    }
    
    /// add a room to be rented
    function addRoom(string memory loc, uint32 pr) public {
        User storage user = users[msg.sender];
        user.rentingRooms.length = user.rentingRooms.push(Room(loc, false, pr, msg.sender));
    }
    
    /// get the number od the rooms 
    function getNumberOfRoom(address owner) public view returns(uint256 numOfRoom){
        User storage user = users[owner];
        numOfRoom = user.rentingRooms.length;
    }

    /// get location of a specific room
    function getLocaOfRoom(address owner,uint32 roomNum) public view returns (string memory infoOfRoom){
        User storage user = users[owner];
        require(user.rentingRooms.length > roomNum );
        Room storage room = user.rentingRooms[roomNum];
        infoOfRoom = room.location ;
    }
    
    /// get the price of a specific room
    function getPriceOfRoom(address owner,uint32 roomNum) public view returns (uint32 price){
        User storage user = users[owner];
        require(user.rentingRooms.length > roomNum);
        Room storage room = user.rentingRooms[roomNum];
        price = room.price;
    }
    
    /// make sure the specific room has been booked of not
    function isBooked(address owner,uint32 roomNum) public view returns (bool booked){
        User storage user = users[owner];
        if(user.rentingRooms.length <= roomNum){
            booked = true;
        }else
            booked = user.rentingRooms[roomNum].booked;
    }
    /// add money to one user 
    function reCharge(address target,uint32 money) public {
        // make sure that the chair man has been set
        // and only chair man can call this function
        //require(isSetChairMan && msg.sender == CHAIR_MAN);
        User storage user = users[target];
        user.money += money;
    }
    
    /// query the money
    function getBalance(address user) public view returns (uint32 balance){
        balance = users[user].money;
    }
    
    // set chari mam
    function setChairMan() public {
        if(!isSetChairMan){
            CHAIR_MAN = msg.sender;
            isSetChairMan = true;
        }
    }
}