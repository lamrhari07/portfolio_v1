import React, { FC } from 'react';
import {
    Theme,
    makeStyles,
    createStyles,
    TextField
} from '@material-ui/core';
import { Field, ErrorMessage } from 'formik';

// Interface...
interface IFormikFieldProps {
    name: string
    label: string
    type?: string
    multiline?: boolean
    disabled?: boolean
    error: any
    touched: any
}
// Components...


const FormikField: FC<IFormikFieldProps> = ({ name, type, label, multiline, error, touched, disabled }) => {
    const classes = useStyles();

    return (
        <Field
            as={TextField}
            name={name}
            type={type || 'text'}
            label={label}
            variant="outlined"
            error={
                Boolean(error && touched)
            }
            multiline={multiline && true}
            rows={multiline ? 3 : 1}
            InputLabelProps={ (type === 'date') && {shrink:true }}
            className={classes.field}
            helperText={<ErrorMessage name={name} />}
            disabled={disabled}
        />
    )
}

// Init Style;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        field: {
            width: '100%',
            margin: theme.spacing(1, 0),
        }
    })
)

export default FormikField;