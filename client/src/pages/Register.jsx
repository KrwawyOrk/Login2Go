import React, {useState} from "react";
import Axios from "axios";

const Register = () => {
    const [values, setValues] = useState();

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    }

    const handleClickButton = () => {
        Axios.post(`${baseUrl}/register`, {
            cost: values.email,
            category: values.password,
        }).then((response) =>{
            console.log(response)
        });
    }

    return (
        <>
            <div className="register-box">
                <input className="register-input" type="text" name="email" placeholder="Email" onChange={handleChangeValues} />
                <input className="register-input" type="password" name="password" placeholder="Password" onChange={handleChangeValues} />
                <button className="register-button" onClick={handleClickButton}>Register</button>
            </div>
        </>
    );
};

export default Register;