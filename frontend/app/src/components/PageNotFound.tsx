import React, { FC, Fragment } from 'react';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useStyles } from '../../themes/style';


const PageNotFound: FC = props => {
    const classes = useStyles();
    return (
        <Fragment>
            <div className={classes.container}>
                <Paper classes={{ root: classes.paperRoot }}>
                    <Typography variant="h1" color="primary" className={clsx(classes.textRow, classes.errorCode)}>404</Typography>
                    <Typography variant="h5" color="primary" className={classes.textRow}>Oops. Looks like the page you're looking for no longer exists</Typography>
                    <Button variant="contained" color="primary" component={Link} to="/" size="large" className={classes.backButton}>Back to Home</Button>
                </Paper>
            </div>
        </Fragment>
    )
}

export default PageNotFound;