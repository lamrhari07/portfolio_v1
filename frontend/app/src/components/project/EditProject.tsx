import React, { FC, Fragment, useEffect } from 'react';
import {
    Theme,
    makeStyles,
    createStyles,
    TextField,
    Button,
    ButtonGroup,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';

// Interface...
interface IEditProjectProps {
    val: any
    handleClose: () => void
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    editProject: (event: React.MouseEvent<HTMLButtonElement>, project:string) => void
}
// Components...


const EditProject: FC<IEditProjectProps> = ({ val, handleClose, editProject, handleInputChange }) => {
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };

    console.log(val);
    
    return (
        <Fragment>
            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel id="name-label">Project name:</InputLabel>
                <TextField id="name" name="name" variant="outlined" onChange={handleInputChange} />
            </FormControl>
            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel id="language-select-label">Programming Language:</InputLabel>
                <Select
                    id="language"
                    name="language"
                    label="Programming Language:"
                    value={age}
                    onChange={e => {
                        handleChange(e);
                        handleInputChange(e);

                    }}
                >
                    <MenuItem value=''>None</MenuItem>
                    <MenuItem value={1}>Python</MenuItem>
                    <MenuItem value={22}>Java</MenuItem>
                    <MenuItem value={3}>JavaScript</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel id="description-label">Project Description:</InputLabel>
                <TextField id="description" name="description" label='Project Description:' multiline rows={4} rowsMax={8} variant="outlined" onChange={handleInputChange} />
            </FormControl>
            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel id="git_url-label">Project URL:</InputLabel>
                <TextField id="git_url" name="git_url" variant="outlined" onChange={handleInputChange} />
            </FormControl>
            <ButtonGroup className={classes.buttons} >
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={e=> editProject(e, val.name)}
                >
                    Update
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
        </Fragment>
    )
}

// Init Style;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(4)
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
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
        modal: {
            display: 'flex',
            padding: theme.spacing(1),
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
)

export default EditProject;