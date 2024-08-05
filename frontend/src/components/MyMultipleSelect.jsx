import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 55;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function MyMultipleSelect({ options, labelName, onChange, value, isTouched, errors }) {

    const name = labelName.toLowerCase().replace(/\s+/g, "-");

    const handleChange = (event) => {
        const { value } = event.target;
        onChange(value);
    };


    return (
        <FormControl fullWidth>
            <InputLabel id={`${name}-label`}>{labelName}</InputLabel>
            <Select
                labelId={`${name}-label`}
                value={value}
                onChange={handleChange}
                input={<OutlinedInput label={labelName} />}
                MenuProps={MenuProps}
                multiple
            >
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        value={option}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Select>
            {isTouched && errors ? <p className="error-text">{errors}</p> : <p></p>}
        </FormControl>
    );
};
