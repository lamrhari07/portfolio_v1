import { withStyles, Theme, createStyles } from '@material-ui/core';
import { Portfolio } from './Portfolio';


const style = (theme: Theme) =>
    createStyles({
        intro: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'linear-gradient(to right, #8360c3, #2ebf91)',
            height: '100vh',
            width: '100%',
            padding: theme.spacing(0, 2),
            textAlign: 'center',
        },
        title: {
            padding: theme.spacing(6, 0),
            color: theme.palette.primary.main,
        },
        section1: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#eceff2',
            height: 200,
            padding: theme.spacing(0, 3),
            textAlign: 'center',
        },
        discr: {
            color: theme.palette.primary.main,
            lineHeight: 1.5,
            [theme.breakpoints.down('sm')]: {
                fontSize: '3vmax',
            },
            '& span': {
                color: theme.palette.info.main,
            }
        },
        section2: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: theme.spacing(0, 2),
            paddingBottom: theme.spacing(4),
        },
        section3: {
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            backgroundColor: '#eceff2',
            minHeight: 300,
            padding: theme.spacing(0, 3),
        },
        form: {
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: theme.spacing(4),
        },
        footer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.palette.primary.main,
        },
    }
    )

export default withStyles(style)(Portfolio);