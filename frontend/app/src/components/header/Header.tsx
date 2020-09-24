import React, { FC, MouseEvent } from 'react';
import {
    makeStyles,
    Theme,
    createStyles,
    AppBar,
    Typography,
    Toolbar,
    Button, IconButton
} from '@material-ui/core';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import { Link } from 'react-router-dom';

// import useVisibility from '../../../utils/Observers';


// Define Header component interface; 
interface HeaderProps {
    section?: any
    auth?: boolean
}

const Header: FC<HeaderProps> = ({ auth, section }) => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar position="static" className={classes.root} ref={section}>
                <Toolbar>
                    <Typography component={Link} to='/' variant="h3" color='secondary' className={classes.title}>
                        E&L
                    </Typography>
                    {
                        auth ?
                            <IconButton
                                component={Link}
                                to='/dash'
                                disableFocusRipple
                            >
                                <DashboardRoundedIcon color='secondary' />
                            </IconButton>
                            :
                            <Button
                                component={Link}
                                to='/login'
                                className={classes.menuButton} color="secondary"
                            >
                                Login
                            </Button>
                    }
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}


const drawerWidth = 240;

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'absolute',
            backgroundColor: 'transparent',
            boxShadow: 'none',
        },
        menuButton: {
            fontSize: 17,
            fontWeight: 500,
            textDecoration: 'none',
            [theme.breakpoints.down('sm')]: {
                width: 100,
            }
        },
        title: {
            flexGrow: 1,
            textDecoration: 'none',
        },
    }),
);

export default Header