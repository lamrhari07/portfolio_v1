import React, { FC } from 'react';
import {
    Theme,
    makeStyles,
    createStyles,
    Typography,
    TextField,
    Button
} from '@material-ui/core';

// Interface...

// Components...


const ContactUsSection: FC = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}>
                <div className={classes.section2}>
                    <Typography variant='h1' color='secondary'>Contact Us</Typography>
                    <Typography variant='h3'>We Will Reply As Soon As Posible</Typography>
                </div>
                <div className={classes.section1}>
                    <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        className={classes.field}
                    />
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        className={classes.field} />
                    <TextField
                        id="phone_num"
                        label="Number Phone"
                        variant="outlined"
                        className={classes.field} />
                    <TextField
                        id="message"
                        label="Message"
                        variant="outlined"
                        className={classes.field}
                        multiline
                        rows={4} />
                    <Button
                        size='large'
                        variant='contained'
                        color='primary'
                        className={classes.button}
                    >
                        Send!
                    </Button>
                </div>
            </div>
        </React.Fragment>
    )
}

// Init Style;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(3, 1),
            display: 'flex',
            [theme.breakpoints.down('sm')]:{
                flexDirection: 'column'
            }
        },
        section1: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            [theme.breakpoints.up('sm')]:{
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                padding: theme.spacing(0, 4),
            }
        },
        section2: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#FFF',
            margin: theme.spacing(0, 2),
            paddingBottom: theme.spacing(4)
        },
        button: {
            margin: theme.spacing(1, 0),
            padding: theme.spacing(1.5, 0),
            backgroundColor: theme.palette.secondary.main
        },
        field: {
            margin: theme.spacing(1, 0),
            backgroundColor: '#fff',
        },
    })
)

export default ContactUsSection;