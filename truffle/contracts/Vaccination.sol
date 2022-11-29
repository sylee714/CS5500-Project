pragma solidity ^0.8.0;

contract Vaccination
{
    // For debugging
    event patientCreated(address indexed patientAddress, string name, string dob);
    event vaccineCreated(uint patientID, string name, string date, string providerName, address indexed providerAddress);

    // Patient Struct
    struct Patient {
        uint id; // patient id
        string name; // name of patient
        string dob; // date of birth of patient
        address patientAddress; // address of patient
        Vaccine[] vaccines; // list of vaccines
    }

    // Vaccine Struct
    struct Vaccine {
        string name; // vaccine name
        string date; // date of vaccine was given
        string providerName; // name of provider
        address providerAddress; // address of provider
    }

    Patient[] private patients;

    // registers a new patient
    function registerPatient(string calldata _name, string calldata _dob) external {
        require(msg.sender != address(0), "Sender address must be valid"); 

        uint id = patients.length;
        address _address = address(msg.sender);
        
        Patient storage p = patients.push();
        p.id = id;
        p.name = _name;
        p.dob = _dob;
        p.patientAddress = _address;

        emit patientCreated(_address, _name, _dob);
    }

    // adds a vaccine to an existing patient
    function addVaccine(uint _id, string calldata _name, string calldata _date, string calldata _providerName) external {
        require(msg.sender != address(0), "Sender address must be valid"); 

        if (_id > patients.length)
        {
            revert();
        }

        address _address = address(msg.sender);

        patients[_id].vaccines.push(Vaccine(_name, _date, _providerName, _address));

        emit vaccineCreated(_id, _name, _date, _providerName, _address);
    }

    // returns all the patients
    function getPatients() external view returns ( Patient[] memory) {
        return patients;
    }

    // returns all the patients
    function getPatient(uint _id) external view returns ( Patient memory) {
        return patients[_id];
    }

    // returns all the vaccines of a patient
    function getVaccines(uint _id) external view returns ( Vaccine[] memory) {
        if (_id > patients.length)
        {
            revert();
        }

        return patients[_id].vaccines;
    }

}
