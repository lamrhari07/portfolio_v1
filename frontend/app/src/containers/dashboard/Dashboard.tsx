import React, { FC, Fragment, lazy, Suspense, useEffect, useCallback, useState, ChangeEvent } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Grid,
    Avatar,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
} from '@material-ui/core';

// Actions.
import { IProject, IState, IUser } from '../../../utils/Interface';
import { fetchUserProfileAction, UserLogOut, UserUpdateAction } from '../../../actions/AuthAction';
import { fetchUserProjectsAction, CreateProjectAction, DeletProjects, UpdateProjectAction } from '../../../actions/ProjectAction';

// Components.
import Model from '../../components/Model';
import Loading from '../../components/Loading';

// Lazy Load Components.
const Profile = (lazy(() => (import('../../components/profile/Profile'))))
const ProjectComponent = (lazy(() => (import('../../components/project/ProjectComponent'))))

interface IHomeProps {
    classes: any
}

export const Dashboard: FC<IHomeProps> = ({ classes }) => {

    const user = useSelector<IState>((state: IState) => state?.user) as IUser
    const project = useSelector<IState>((state: IState) => state?.project) as IProject[]
    const [input, setInput] = useState<object>({})

    const [open, setOpen] = useState({
        edit: false,
        project: false
    });

    const dispatch = useDispatch();

    const handleOpenProject = () => {
        setOpen((x) => ({ ...x, project: true }));
    };

    const handleOpenEdit = () => {
        setOpen((x) => ({ ...x, edit: true }));
    };

    const handleClose = () => {
        setOpen((x) => ({ ...x, edit: false, project: false }));
    };

    const fetchUserData = useCallback(() => {
        dispatch(fetchUserProfileAction())
    }, [user])

    const fetchUserProjects = useCallback(() => {
        dispatch(fetchUserProjectsAction())
    }, [project])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setInput(input => ({ ...input, [event.target.name]: event.target.value }))
    }



    const handleUpdate = (input: IUser) => {
        dispatch(UserUpdateAction(input))
    }

    const createProject = (input: IProject) => {
        // event.preventDefault();
        dispatch(CreateProjectAction(input))
        alert('Project has been added.');
        handleClose();
    }

    const editProject = (event: React.MouseEvent<HTMLButtonElement>, project: string) => {
        event.preventDefault();
        dispatch(UpdateProjectAction(input, project))
    }

    const DeletProject = (event: React.MouseEvent<HTMLButtonElement>, name: IProject) => {
        event.preventDefault();
        if (confirm('Do you want to delete this project?')) {
            dispatch(DeletProjects(name));
        }
    }

    const HandleLogOut = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(UserLogOut())
    }

    useEffect(() => {
        fetchUserData();
        fetchUserProjects();
        return () => {
            createProject;
            DeletProject;
        }
    }, [])

    return (
        <Fragment>
            <div className={classes.toolbar} />
            <Grid container>
                <Grid item xs={12} md={4} className={classes.grid_left}>
                    <div className={classes.user}>
                        <Avatar
                            alt="Avatar"
                            src={user?.avatar as any}
                            className={classes.large}
                        />
                        <Typography variant='h4'>{user?.first_name}&nbsp;{user?.last_name}</Typography>
                        <List component="nav" className={classes.list}>
                            <ListItem component={Link} to={`/portfolio/${user?.username}`} button className={classes.sub_list}>
                                <ListItemText primary="Resume" />
                            </ListItem>
                            <ListItem component={Link} to='/dash' button className={classes.sub_list}>
                                <ListItemText primary="Profile" />
                            </ListItem>
                            <ListItem component={Link} to='/dash/project' button className={classes.sub_list} >
                                <ListItemText primary="Projects" />
                            </ListItem>
                            <Button
                                variant="contained"
                                className={classes.button}
                                onClick={HandleLogOut}
                                color="primary"
                                disableElevation>
                                LOG OUT
                        </Button>
                        </List>
                    </div>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Suspense fallback={<Loading />}>
                        <Switch>
                            <Route
                                path='/dash'
                                exact
                                component={() => <Profile
                                    user={user}
                                    handleUpdate={handleUpdate}
                                />}
                            />
                            <Route
                                path='/dash/project'
                                exact
                                component={() => <ProjectComponent
                                    open={open}
                                    projects={project}
                                    handleOpenProject={handleOpenProject}
                                    handleOpenEdit={handleOpenEdit}
                                    handleClose={handleClose}
                                    createProject={createProject}
                                    editProject={editProject}
                                    DeletProject={DeletProject}
                                    handleInputChange={handleInputChange}
                                />}
                            />
                        </Switch>
                    </Suspense>
                </Grid>
            </Grid>
        </Fragment>
    )
}