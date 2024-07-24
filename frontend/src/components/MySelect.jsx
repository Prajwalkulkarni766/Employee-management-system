import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyles = (name, selectedOption, theme) => ({
  fontWeight:
    selectedOption.indexOf(name) === -1
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
});

const MyMultipleSelect = ({ options, labelName, value, onChange, errors, isTouched }) => {
  const name = labelName.toLowerCase().replace(/\s+/g, "-");
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = React.useState(value || []);

  const handleChange = (event) => {
    const {
      target: { value: selectedValues },
    } = event;
    setSelectedOption(selectedValues);
    onChange({ target: { value: selectedValues, name: labelName } });
  };

  return (
    <FormControl fullWidth error={isTouched && Boolean(errors)}>
      <InputLabel id={`${name}-label`}>{labelName}</InputLabel>
      <Select
        labelId={`${name}-label`}
        multiple
        value={selectedOption}
        onChange={handleChange}
        input={<OutlinedInput label={labelName} />}
        MenuProps={MenuProps}
        error={isTouched && Boolean(errors)}
        renderValue={(selected) => selected.join(', ')}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            style={getStyles(option, selectedOption, theme)}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MyMultipleSelect;
