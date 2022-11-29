import { useState, useEffect } from "react";
import React from "react";
import useEth from "../contexts/EthContext/useEth";
import NoticeNoPatient from "./NoticeNoPatient";
import Patient from "./Patient";
import './Main.css'

const Row = (props) => {
    const {eachPatient, selPat} = props
    return(
        <tr>
            <td>{eachPatient.name}</td>
            <td>{eachPatient.dob}</td>
            <td>
                
                <button onClick = {() => {selPat(eachPatient)}}>
                    SELECT
                </button>

            </td>
        </tr>
    ) 
}

const Table = (props) => {
    const {allPatients, selPat} = props 
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>SELECT</th>
                </tr>
            </thead>
            <tbody>
                {allPatients.map(row => 
                    <Row
                        key = {row.id} 
                        eachPatient = {row} 
                        selPat = {selPat}
                    />    
                )}
            </tbody>
        </table>
    )
}

function Main() {
    const { state: { contract, accounts } } = useEth();
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedPatientId, setSelectedPatientId] = useState(() => {
        // getting stored value
        const storedVal = sessionStorage.getItem("selectedPatientId");
        return storedVal || -1;
    })

    useEffect(() => {
        if (contract) {
            getAllPatients();
        }
    });

    async function getAllPatients() {
        const retrevedPatients = await contract.methods.getPatients().call({ from: accounts[0] });
        setPatients(retrevedPatients);
    }

    const handleNameChange = event => {
        setName(event.target.value);
    };

    const handleDobChange = event => {
        setDob(event.target.value)
    }

    const handleRegister = async () => {
        if (name === "" || dob === "") {
            alert("Enter both name and date of birth");
            return;
        }

        await contract.methods.registerPatient(name, dob).send({ from: accounts[0] });
        
    };

    const handlePatientSelect = async (selPatient) => {
        setSelectedPatientId(selPatient.id);
        sessionStorage.setItem('selectedPatientId', selPatient.id);
    };

    return (
        <div className="formContainer">
            <hr></hr>
            <form>
                <div>
                    <h2>Patient Form</h2>
                </div>
                
            
                <div>
                    <label>Patient Name: </label>
                    <input 
                        type="text" 
                        name="name"
                        placeholder="Full Name"
                        value={name}
                        required
                        onChange={handleNameChange}
                        />
                </div>

                <div>
                    <label>Date of Birth: </label>
                    <input 
                        type="date" 
                        name="dob"
                        value={dob}
                        required
                        onChange={handleDobChange}
                        />
                </div>
               
                
                <div>
                    <button onClick={handleRegister}>
                        REGISTER
                    </button>
                </div>
            </form> 

            <hr></hr>

            <div>
                    <h2>Patients</h2>
            </div>

            <div>
                <Table 
                    allPatients = {patients} 
                    selPat = {handlePatientSelect} 
                />
            </div>

            <hr></hr>

            <div>
                {selectedPatientId === -1 ? <NoticeNoPatient /> : 
                    <Patient  
                        patientId = {selectedPatientId} 
                    />}
            </div>

        </div>
        
    );
  }
  
  export default Main;