import React, { FC, Fragment, Suspense } from 'react';
import {
    Theme,
    makeStyles,
    createStyles,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import GitHubIcon from '@material-ui/icons/GitHub';
import EditIcon from '@material-ui/icons/Edit';
import { IProject } from '../../../utils/Interface';
import Loading from '../Loading';
import Model from '../Model';

// Interface...
interface IProjectComponentProps {
    open: {
        edit: boolean
        project: boolean
    }
    projects: IProject[]
    handleOpenProject: () => void
    handleClose: () => void
    handleOpenEdit: () => void
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    DeletProject: (event: React.MouseEvent<HTMLButtonElement>, name: IProject) => void
    createProject: (input: IProject) => void
    editProject: (event: React.MouseEvent<HTMLButtonElement>, project: string) => void
}
// Components...


const ProjectComponent: FC<IProjectComponentProps> = ({ open, projects, handleClose, createProject, editProject, handleInputChange, handleOpenProject, handleOpenEdit, DeletProject }) => {
    const classes = useStyles();

    return (
        <Fragment>
            <Button variant="contained" onClick={handleOpenProject} className={classes.add_button} color="primary" disableElevation>
                Add
            </Button>
            <TableContainer>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Language</TableCell>
                            <TableCell align="left">Git Repository</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            projects.map((value: IProject, key: number) => {
                                return (
                                    <TableRow key={key}>
                                        <TableCell component="th" scope="row">
                                            {value.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {value.language}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <IconButton
                                                component={Button}
                                                size='small'
                                                href={value.git_url}
                                            >
                                                <GitHubIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <IconButton size='small' onClick={handleOpenEdit}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton size='small' onClick={e => {
                                                DeletProject(e, value)
                                            }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Model
                open={open}
                // val={value}
                handleClose={handleClose}
                createProject={createProject}
                editProject={editProject}
                handleInputChange={handleInputChange}
            />
        </Fragment>
    )
}

// Init Style;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        add_button: {
            float: 'right',
            width: 100,
            backgroundColor: theme.palette.warning.main,
            padding: theme.spacing(1.3, 0),
            margin: theme.spacing(2, 1),
        },
        table: {
            backgroundColor: '#FFF'
        },
        modal: {
            display: 'flex',
            padding: theme.spacing(1),
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
)

export default ProjectComponent;