import React, { FC } from 'react';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import {
    Theme,
    makeStyles,
    createStyles,
    Button,
    ButtonGroup,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
} from '@material-ui/core';
import { IProject } from '../../../utils/Interface';
import FormikField from '../FormikField';

// Interface...
interface ICreateProjectProps {
    handleClose: () => void
    handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    createProject: (input: IProject) => void
}
// Components...


const FormCreateProject: FC<ICreateProjectProps & FormikProps<IProject>> = (props) => {
    const classes = useStyles();

    const { touched, errors, isSubmitting, handleClose } = props;

    return (
        <Form>
            <FormControl variant="outlined" error={Boolean(errors.language)} className={classes.formControl}>
                <InputLabel id="language">Programming Language:</InputLabel>
                <Field
                    type="text"
                    name="language"
                    label="Programming Language:"
                    as={Select}
                >
                    <MenuItem value=''>None</MenuItem>
                    <MenuItem value={1}>Python</MenuItem>
                    <MenuItem value={2}>Java</MenuItem>
                    <MenuItem value={3}>JavaScript</MenuItem>
                </Field>
                {touched.language && errors.language && <FormHelperText style={{ marginLeft: 15 }}>{errors.language}</FormHelperText>}
            </FormControl>
            {
                [
                    { name: 'name', label: 'Project name:', error: errors.name, touched: touched.name },
                    { name: 'description', label: 'Project Description:', error: errors.description, touched: touched.description },
                    { name: 'git_url', label: 'Project URL:', error: errors.git_url, touched: touched.git_url },
                ].map((attr: any, i: number) => (
                    <FormikField
                        key={i}
                        name={attr.name}
                        label={attr.label}
                        touched={attr.touched}
                        error={attr.error}
                    />
                ))
            }

            <ButtonGroup className={classes.buttons} >
                <Button
                    className={classes.button}
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>
                <Button
                    className={classes.button}
                    onClick={handleClose}
                    variant="contained"
                    color="primary"
                >
                    Close
                </Button>
            </ButtonGroup>
        </Form>
    )
}

// Init Style;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttons: {
            float: 'right',
        },
        button: {
            float: 'right',
            width: 100,
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
            backgroundColor: theme.palette.warning.main,
            padding: theme.spacing(1.3, 0),
            margin: theme.spacing(2, 1),
        },
        formControl: {
            width: 250,
            margin: theme.spacing(1),
        },
    })
)


// Wrap our form with the withFormik HoC
const CreateProject = withFormik<ICreateProjectProps, IProject>({
    // Transform outer props into form values
    mapPropsToValues: props => {
        return {
            name: '',
            language: '',
            description: '',
            git_url: '',
        };
    },

    // Add a custom validation function (this can be async too!)
    validate: (values: IProject) => {
        let errors: FormikErrors<IProject> = {};
        if (!values.name) {
            errors.name = 'Project Name is Required';
        }
        if (!values.language) {
            errors.language = 'Project Programming Language is Required';
        }
        if (!values.description) {
            errors.description = 'Project Description is Required';
        }
        if (!values.git_url) {
            errors.git_url = 'Project URL is Required';
        }
        return errors;
    },

    handleSubmit: (values: IProject, { props }) => {
        // do submitting things
        props.createProject(values)

    },
})(FormCreateProject);

export default CreateProject;