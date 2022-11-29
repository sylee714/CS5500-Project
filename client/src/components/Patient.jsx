import { useState, useEffect } from "react";
import useEth from "../contexts/EthContext/useEth";

const Row = (props) => {
    const {v_name, v_date, provider} = props
    return(
        <tr>
            <td>{v_name}</td>
            <td>{v_date}</td>
            <td>{provider}</td>
        </tr>
    ) 
}

const Table = (props) => {
    const {data} = props 
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Provider</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => 
                    <Row
                        key = {index} 
                        v_name = {row.name}
                        v_date = {row.date}
                        provider = {row.providerName}
                    />    
                )}
            </tbody>
        </table>
    )
}

const Patient = (props) => {
    let { patientId } = props
    const { state: { contract, accounts } } = useEth();
    const [patientName, setPatientName] = useState("");
    const [patientDob, setPatientDob] = useState("");
    const [vaccineName, setVaccineName] = useState("");
    const [date, setDate] = useState("");
    const [providerName, setProviderName] = useState("");
    const [vaccines, setVaccines] = useState([]);

    useEffect(() => {
        if (contract && patientId !== -1) {
            getAllVaccines();
            getPatient();
        }
    });

    async function getPatient() {
        const retrevedPatient = await contract.methods.getPatient(patientId).call({ from: accounts[0] });
        setPatientName(retrevedPatient.name)
        setPatientDob(retrevedPatient.dob)
    }

    async function getAllVaccines() {
        const retrevedVaccines = await contract.methods.getVaccines(patientId).call({ from: accounts[0] });
        setVaccines(retrevedVaccines);
    }


    const handleVaccineNameChange = event => {
        setVaccineName(event.target.value);
    };

    const handleDateChange = event => {
        setDate(event.target.value)
    }

    const handleProviderNameChange = event => {
        setProviderName(event.target.value)
    }

    const handleAddVaccine = async () => {
        if (vaccineName === "" || date === "" || providerName === "") {
            alert("Enter all the fields");
            return;
        }

        await contract.methods.addVaccine(patientId, vaccineName, date, providerName).send({ from: accounts[0] });
        
    };

    return(
        
        <div>
            <h2>Patient Information</h2>
   
            <div className="infoContainder">
                <p><b>Name: </b> {patientName} </p>
                <p><b>Date of Birth: </b> {patientDob}</p>
            </div>

            <form>                    
                <div>
                    <label>Vaccine Name: </label>
                    <input 
                        type="text" 
                        name="vaccineName"
                        placeholder="Vaccine Name"
                        value={vaccineName}
                        required
                        onChange={handleVaccineNameChange}
                        />
                </div>

                <div>
                    <label>Injection Date: </label>
                    <input 
                        type="date" 
                        name="date"
                        value={date}
                        required
                        onChange={handleDateChange}
                        />
                </div>

                <div>
                    <label>Provider Name: </label>
                    <input 
                        type="text" 
                        name="providerName"
                        placeholder="Provider Full Name"
                        value={providerName}
                        required
                        onChange={handleProviderNameChange}
                        />
                </div>
                
                <div>
                    <button onClick={handleAddVaccine}> ADD VACCINE </button>
                </div>
            </form> 

            <hr></hr>
            <h2>Vaccines</h2>
            <Table data = {vaccines}/>
        </div>
    ) 
}

export default Patient;
