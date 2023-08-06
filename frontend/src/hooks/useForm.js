import React from 'react';

export function useForm() {
    const [values, setValues] = React.useState({});

    const handleChange = (e) => {
        const input = e.target;
        const value = input.value;
        const name = input.name;
        setValues({...values, [name]: value });
    }
    return{values, handleChange, setValues };
}