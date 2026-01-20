import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

}