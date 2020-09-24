import React, { FC } from 'react';
import {
    Theme,
    makeStyles,
    createStyles,
    Typography,
} from '@material-ui/core';

const Footer: FC = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer1}>
            <Typography
                variant='body1'
                className={classes.footer_title}
            >
                &copy; El Mehdi Lamrhari
            </Typography>
        </footer>
    )
}

// Init Style;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        footer_title: {
            color: '#FFF',
            margin: theme.spacing(0, 4)
        },
        footer1: {
            backgroundColor: theme.palette.primary.dark,
            width: '100%',
            padding: theme.spacing(4, 0)
        }
    })
)

export default Footer;