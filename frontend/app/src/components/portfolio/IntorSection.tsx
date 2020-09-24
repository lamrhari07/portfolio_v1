import React, { FC, Fragment } from 'react';
import {
    Theme,
    makeStyles,
    createStyles,
    Typography,
    Avatar
} from '@material-ui/core';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import KeyboardArrowDownTwoToneIcon from '@material-ui/icons/KeyboardArrowDownTwoTone';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';

import { IUser } from '../../../utils/Interface';


// Define Layout component interface; 
interface IntroProps {
    userData: IUser | any
}

const IntroSection: FC<IntroProps> = ({userData}) => {
    const classes = useStyles();
    return (
        <Fragment>
            <Avatar
                className={classes.avatar}
                src={userData?.avatar}
            />
            <Typography
                variant='h4'
                className={classes.title_name}
            >
                <span>I am,</span> {userData?.first_name} {userData?.last_name}
            </Typography>
            <Typography
                style={{ color: '#FFF8' }}
                variant='h5'
            >
                {userData.description}
            </Typography>
            <div className={classes.icon}>
                <FavoriteBorderRoundedIcon fontSize='large'/>
                <KeyboardArrowDownTwoToneIcon fontSize='large' />
                <ShareRoundedIcon fontSize='large'/>
            </div>
        </Fragment >
    )
}



// Init Style;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            margin: '0 auto',
            width: theme.spacing(20),
            height: theme.spacing(20),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(27),
                height: theme.spacing(27),
            }
        },
        title_name: {
            margin: theme.spacing(3, 0),
            color: '#FFF',
            fontSize: 'calc(1em + 3vw)',
            '& span': {
                color: theme.palette.secondary.main,
            }
        },
        icon: {
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            top: 90,
            color: '#FFF'
        },
    })
)

export default IntroSection;