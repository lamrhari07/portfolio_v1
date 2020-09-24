import React, { FC, Fragment } from 'react';
import { withFormik, FormikProps, FormikErrors, Form } from 'formik';
import {
    CircularProgress,
    Typography,
    TextField,
    makeStyles,
    Theme,
    createStyles,
    Button,
} from '@material-ui/core';
import FormikField from '../FormikField';

// Define Layout component interface; 
interface FormSignUpProps {
    data: any
    isLoading: boolean | any
    handleRegister: (input: any) => void
}

const FormSignUp: FC<FormSignUpProps & FormikProps<FormProps>> = (props) => {
    const classes = useStyles();

    const { touched, errors, data, isLoading, handleRegister } = props;
    return (
        <Fragment>
            <Form className={classes.form}>
                {
                    [
                        { name: 'username', type: 'text', label: 'Username:', error: errors.username, touched: touched.username },
                        { name: 'email', type: 'email', label: 'Email address', error: errors.email, touched: touched.email },
                        { name: 'birth_date', type: 'date', label: 'Date of Birth', error: errors.birth_date, touched: touched.birth_date },
                        { name: 'password', type: 'password', label: 'Password:', error: errors.password, touched: touched.password },
                        { name: 'password_2', type: 'password', label: 'Password confirmation', error: errors.password_2, touched: touched.password_2 },
                    ].map((v, i) => {
                        return (
                            <FormikField
                                key={i}
                                name={v.name}
                                type={v.type}
                                label={v.label}
                                touched={v.touched}
                                error={v.error}
                            />
                        )
                    })
                }
                <div className={classes.formButtons}>
                    {isLoading ? (
                        <CircularProgress size={26} className={classes.loader} />
                    ) : (
                            <Button
                                // onClick={handleRegister}
                                type='submit'
                                size='large'
                                variant='contained'
                                color='primary'
                                className={classes.formButtons}
                            >
                                Create your account
                            </Button>
                        )}
                </div>
            </Form>
        </Fragment>
    )
}

// Init Style;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        errorMessage: {
            textAlign: 'center',
            marginTop: '20px'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: theme.spacing(2),
        },
        formButtons: {
            marginTop: theme.spacing(1),
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
        },
        loader: {
            marginLeft: theme.spacing(4)
        },
    })
)


// Define Form component interface; 
interface FormProps {
    username: string
    email: string
    birth_date?: Date
    password: string
    password_2: string
}


// Wrap our form with the withFormik HoC
const SignUp = withFormik<FormSignUpProps, FormProps>({
    // Transform outer props into form values
    mapPropsToValues: props => {
        return {
            username: '',
            email: '',
            password: '',
            password_2: '',
        };
    },

    // Add a custom validation function (this can be async too!)
    validate: (values: FormProps, { data }) => {

        let errors: FormikErrors<FormProps> = {};
        if (!values.username) {
            errors.username = 'Username is Required';
        }
        if (!values.email) {
            errors.email = 'Email is Required';
        }
        if (!values.birth_date) {
            errors.birth_date = 'Date of Birth is Required';
        }
        if (!values.password) {
            errors.password = 'Password is Required';
        }
        if (!values.password_2) {
            errors.password_2 = 'Password Confirmation is Required';
        }
        if (values.password && values.password !== values.password_2){
            errors.password_2 = 'Password is Not Matched';
        }
        return errors;
    },

    handleSubmit: (values: any, { props }) => {
        // do submitting things
        props.handleRegister(values)
        console.log(values);

    },
})(FormSignUp);

export default SignUp;