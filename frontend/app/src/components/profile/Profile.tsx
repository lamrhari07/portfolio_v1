import React, { FC, useState } from 'react';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import {
    Theme,
    makeStyles,
    createStyles,
    Button,
    TextField,
    Typography,
    Paper,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { UserUpdateAction } from '../../../actions/AuthAction';
import { IUser } from '../../../utils/Interface';
import FormikField from '../FormikField';


// Interface...
interface IProfileProps {
    user: IUser
    handleUpdate: (input: IUser) => void
}


const FormProfile: FC<IProfileProps & FormikProps<FormProps>> = (props) => {

    const { user, touched, errors, setFieldValue, values } = props;

    const [disable, setDisable] = useState<boolean>(true)

    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <section className={classes.header}>
                <Typography variant='h2' className={classes.title}>Account</Typography>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => setDisable(false)}
                    color="primary"
                    disableElevation
                >
                    Edit
                </Button>
            </section>
            <Divider />
            <section className={classes.profile}>
                <Form className={classes.form}>
                    {
                        !disable &&
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                            <Typography variant='h6'>Upload Avatar Image:</Typography>
                            <input
                                name='avatar'
                                className={classes.input}
                                type="file"
                                id='avatar'
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setFieldValue("avatar", event.target?.files?.item(0));
                                }}
                            />
                            <label htmlFor="avatar">
                                <Button variant="contained" className={classes.button} color="primary" component="span">
                                    Upload
                                </Button>
                            </label>
                        </div>
                    }

                    {
                        [
                            { name: 'first_name', type: 'text', label: 'First Name', error: errors.first_name, touched: touched.first_name },
                            { name: 'last_name', type: 'text', label: 'Last Name', error: errors.last_name, touched: touched.last_name },
                            { name: 'phone', type: 'text', label: 'Phone Number', error: errors.phone, touched: touched.phone },
                            { name: 'birth_date', type: 'date', label: 'Birth day', error: errors.birth_date, touched: touched.birth_date },
                            { name: 'introduction', type: 'text', label: 'Introduction', multiline: true, error: errors.introduction, touched: touched.introduction },
                            { name: 'description', type: 'text', label: 'Description', multiline: true, error: errors.description, touched: touched.description }

                        ].map((v, i) => {
                            return (
                                <FormikField
                                    key={i}
                                    name={v.name}
                                    type={v.type}
                                    label={v.label}
                                    touched={v.touched}
                                    multiline={v.multiline}
                                    error={v.error}
                                    disabled={disable}
                                />
                            )
                        })
                    }
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="gender">Gender:</InputLabel>
                        <Select
                            id="gender"
                            name="gender"
                            label="Gender:"
                            disabled={disable}
                        >
                            <MenuItem value={1}></MenuItem>
                            <MenuItem value={2}>Male</MenuItem>
                            <MenuItem value={3}>Female</MenuItem>
                        </Select>
                    </FormControl>
                    {
                        !disable &&
                        <>
                            <Button
                                variant="contained"
                                className={classes.button}
                                color="primary"
                                type='submit'
                                disableElevation
                            >
                                Submit
                            </Button>
                            <Button
                                variant="contained"
                                className={classes.button}
                                color="primary"
                                disableElevation
                                onClick={() => setDisable(true)}
                            >
                                Cancel
                            </Button>
                        </>
                    }
                </Form>
            </section>
        </Paper>
    )
}

// Init Style;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(3, 2)
        },
        header: {
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.spacing(2, 0),
        },
        title: {
            flexGrow: 1,
            fontSize: 'calc(1em + 2.4vw)',
            color: theme.palette.primary.main
        },
        button: {
            width: 100,
            backgroundColor: theme.palette.warning.main,
            margin: theme.spacing(4, 1),
            padding: theme.spacing(1.3, 0),
        },
        profile: {
            margin: theme.spacing(0, 2,),
        },
        form: {
            margin: theme.spacing(2, 0),
        },
        input: {
            display: 'none',
        },
    })
)



// Define Form component interface; 
interface FormProps {
    avatar?: File
    first_name: string
    last_name: string
    email: string
    birth_date?: Date
    gender?: number
    phone?: number
    introduction: string
    description: string
}


// Wrap our form with the withFormik HoC
const Profile = withFormik<IProfileProps, FormProps>({
    // Transform outer props into form values
    mapPropsToValues: props => {
        return {
            first_name: props.user?.first_name || '',
            last_name: props.user?.last_name || '',
            email: props.user?.email || '',
            birth_date: props.user?.birth_date,
            gender: props.user?.gender,
            phone: props.user?.phone,
            introduction: props.user?.introduction || '',
            description: props.user?.description || ''

        };
    },

    // Add a custom validation function (this can be async too!)
    validate: (values: FormProps, { }) => {

        let errors: FormikErrors<FormProps> = {};
        if (!values.first_name) {
            errors.first_name = 'first_name is Required';
        }
        if (!values.last_name) {
            errors.last_name = 'Password is Required';
        }
        // if (error.non_field_errors) {
        //     errors.non_field_errors = error.non_field_errors
        // }
        return errors;
    },

    handleSubmit: (values: FormProps, { props }) => {
        // do submitting things
        props.handleUpdate(values as IUser)

    },
})(FormProfile);

export default Profile;