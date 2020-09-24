import React, { FC } from 'react';
import {
    Theme,
    makeStyles,
    createStyles,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';


const Loading: FC<{}> = () => {

    const classes = useStyles();

    return (
        <div className={classes.loading} >
            <CircularProgress size={100} color="secondary" disableShrink />
        </div >
    )
}



// Init Style;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        loading: {
            display: 'flex',
            justifyContent: 'center',
            alignItems:'center',
            height: '100vh'
        }
    })
)

export default Loading;