import React, { FC, Fragment } from 'react';
import { Typography, Tabs, Tab, Grid } from '@material-ui/core';
import SignIn from '../../components/authentication/SignIn';
import SignUp from '../../components/authentication/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authenticationAction } from '../../../actions/AuthAction';
import { IReducer, IState } from '../../../utils/Interface';

// Components.


interface IAuthProps {
    classes: any
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: FC<TabPanelProps> = ({ children, value, index, ...other }) => {
    return (
        <div style={{ margin: '0 2rem' }}>{value === index && children}</div>
    );
}

export const Authentication: FC<IAuthProps> = ({ classes }) => {

    const error = useSelector<IState>((state: IState) => state?.error)
    const isLoading = useSelector<IState>((state: IState) => state?.isLoading)

    const dispatch = useDispatch();
    const history = useHistory();

    const [input, setInput] = React.useState<object>({})
    const [value, setValue] = React.useState<number>(0);
    const chart = require('../../../images/chart.png');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setInput(input => ({ ...input, [event.target.name]: event.target.value }))
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }

    const handleLogin = (input: any) => {
        // event.preventDefault();
        dispatch(authenticationAction(input, 'auth/login', history))
    }

    const handleRegister = (input: any) => {
        // event.preventDefault();
        dispatch(authenticationAction(input, 'auth/register', history))
    }


    return (
        <Fragment>
            <Grid container className={classes.container}>
                <Grid item md={7} className={classes.logotypeContainer}>
                    <img src={chart.default} alt='logo' className={classes.logotypeImage} />
                    <Typography className={classes.logotypeText} color='secondary' variant='h1'>E&L</Typography>
                </Grid>
                <Grid item xs={12} md={5} className={classes.formContainer}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        className={classes.formTab}
                        indicatorColor='primary'
                        textColor='primary'
                    >
                        <Tab label='Login' classes={{ root: classes.tab }} />
                        <Tab label='Sign Up' classes={{ root: classes.tab }} />
                    </Tabs>
                    <div className={classes.form}>
                        <Typography variant='h5' color='secondary' className={classes.formTitle}>
                            Welcome
                        </Typography>
                        <TabPanel value={value} index={0}>
                            <SignIn
                                error={error}
                                isLoading={isLoading}
                                handleLogin={handleLogin}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <SignUp
                                data={error}
                                isLoading={isLoading}
                                handleRegister={handleRegister}
                            />
                        </TabPanel>
                    </div>
                </Grid>
            </Grid>
        </Fragment>
    )
}