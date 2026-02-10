import { useState } from "react";

export const useForm = (callback, initialState = {}) => {

    // initialstate diperoleh dari class login.js atau register.js

    // menggunakan usestate dengan nilai awal initialstate
    // nilai initial state ditampung di values, dan ujntuk otak atik melalui set values
    const [values, setValues] = useState(initialState);

// jika ada perubahan value form maka
// 1. amnbil nilai values yang ada di usestate
// 2. isi value tersebut berdasarkan nama dan value yg sama (seperti array) ['elemen'] = 'value'
// yang mana elemen adalah namanya dan value adalah valuenya
    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    // saat submit gunakan callback function 
    // di dalam file login.js dan register.js callback ini digunakan untuk menampung error massage, contoh di login.js baris ke 23
    const onSubmit = event => {
        event.preventDefault();
        callback();
    }

    return {
        onChange,
        onSubmit,
        values
    };
}