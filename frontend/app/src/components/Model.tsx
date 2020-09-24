import React, { FC, Fragment, useEffect } from 'react';
import {
    Theme,
    makeStyles,
    createStyles,
    Modal,
    Typography,
    Paper,
} from '@material-ui/core';
import CreateProject from './project/CreateProject';
import EditProject from './project/EditProject';
import { IProject } from '../../utils/Interface';

// Interface...
interface IModelProps {
    open: {
        edit: boolean
        project: boolean
    }
    val?: any
    handleClose: () => void
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    createProject: (input:IProject) => void
    editProject: (event: React.MouseEvent<HTMLButtonElement>, project:string) => void
}
// Components...


const Model: FC<IModelProps> = ({ open, val, handleClose, createProject, editProject, handleInputChange }) => {
    const classes = useStyles();

    useEffect(() => {
        return () => {
            createProject;
            editProject;
        }
    }, [])

    return (
            <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                open={open.edit || open.project}
                onClose={handleClose}
                className={classes.modal}
            >
                <Paper className={classes.paper}>
                    <div className={classes.form}>
                        {open.project && <CreateProject
                            handleClose={handleClose}
                            createProject={createProject}
                            // handleInputChange={handleInputChange}
                        />}
                        {open.edit && <EditProject
                            val={val}
                            handleClose={handleClose}
                            editProject={editProject}
                            handleInputChange={handleInputChange}
                        />}
                    </div>
                </Paper>
            </Modal>
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

export default Model;