import React, { FC, Fragment } from 'react';
import { withFormik, FormikProps, FormikErrors, Form } from 'formik';
import {
    CircularProgress,
    Typography,
    makeStyles,
    Theme,
    createStyles,
    Button,
} from '@material-ui/core';
import FormikField from '../FormikField';

// Define Layout component interface; 
interface FormSignInProps {
    error: any
    isLoading: boolean | any
    handleLogin: (input: any) => void
}

const FormSignIn: FC<FormSignInProps & FormikProps<FormProps>> = (props) => {

    const classes = useStyles();
    const { touched, errors, error, isLoading } = props;

    return (
        <Fragment>
            <Typography color='secondary' className={classes.errorMessage}>
                {error?.non_field_errors && error?.non_field_errors}
            </Typography>
            <Form className={classes.form}>
                {
                    [
                        { name: 'username', type: 'text', label: 'Username:', error: errors.username, touched: touched.username },
                        { name: 'password', type: 'password', label: 'Password:', error: errors.password, touched: touched.password },
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
                        <CircularProgress size={26} className={classes.loginLoader} />
                    ) : (
                            <Button
                                variant='contained'
                                type='submit'
                                color='primary'
                                size='large'
                            >
                                Login
                            </Button>
                        )}
                    <Button
                        color='primary'
                        size='large'
                        className={classes.forgetButton}
                    >
                        Forget Password
                    </Button>
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
        },
        formButtons: {
            width: '100%',
            marginTop: theme.spacing(1),
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        forgetButton: {
            textTransform: 'none',
            fontWeight: 400
        },
        loginLoader: {
            marginLeft: theme.spacing(4)
        },
    })
)


// Define Form component interface; 
interface FormProps {
    username: string
    password: string
    non_field_errors?: string
}


// Wrap our form with the withFormik HoC
const SignIn = withFormik<FormSignInProps, FormProps>({
    // Transform outer props into form values
    mapPropsToValues: props => {
        return {
            username: '',
            password: '',
            non_field_errors: ''
        };
    },
    
    // Add a custom validation function (this can be async too!)
    validate: (values: FormProps, { error }) => {

        let errors: FormikErrors<FormProps> = {};
        if (!values.username) {
            errors.username = 'Username is Required';
        }
        if (!values.password) {
            errors.password = 'Password is Required';
        }
        // if (error.non_field_errors) {
        //     errors.non_field_errors = error.non_field_errors
        // }
        return errors;
    },

    handleSubmit: (values: any, { props }) => {
        // do submitting things
        props.handleLogin(values)
        console.log(values);

    },
})(FormSignIn);

export default SignIn;