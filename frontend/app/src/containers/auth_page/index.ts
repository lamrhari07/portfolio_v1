import { withStyles, Theme, createStyles } from '@material-ui/core';
import { Authentication } from './Authentication';


const style = (theme: Theme) =>
    createStyles({
        container: {
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        logotypeContainer: {
            background: 'linear-gradient(to right, #8360c3, #2ebf91)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            [theme.breakpoints.down('md')]: {
                width: '50%'
            },
            [theme.breakpoints.down('sm')]: {
                display: 'none'
            }
        },
        logotypeImage: {
            width: 165,
            marginBottom: theme.spacing(4)
        },
        logotypeText: {
            fontSize: 60
        },
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        form: {
            marginTop: theme.spacing(4),
            width: '80%',
            [theme.breakpoints.down('xs')]: {
                width: '100%'
            }
        },
        tab: {
            fontWeight: 400,
            fontSize: 18,
        },
        formTitle: {
            fontWeight: 500,
            textAlign: 'center',
        },
    }
    )

export default withStyles(style)(Authentication);