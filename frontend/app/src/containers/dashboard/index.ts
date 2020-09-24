import { withStyles, Theme, createStyles } from '@material-ui/core';
import { Dashboard } from './Dashboard';


const style = (theme: Theme) =>
    createStyles({
        toolbar: {
            marginTop: theme.spacing(9)
        },
        user: {
            [theme.breakpoints.up('md')]: {
                position: 'fixed',
                top: theme.spacing(10),
            }
        },
        grid_left: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
        },
        large: {
            width: theme.spacing(25),
            height: theme.spacing(25),
            marginRight: 'auto',
            marginLeft: 'auto',
            margin: theme.spacing(2, 0)
        },
        list: {
            width: 250,
            margin: theme.spacing(2, 0),
        },
        sub_list: {
            textAlign: 'center',
            border: '1px solid #eee',
            margin: theme.spacing(1, 0),
        },
        button: {
            width: 250,
            backgroundColor: theme.palette.warning.main,
            padding: theme.spacing(2, 0),
            margin: theme.spacing(2, 0),

        },
    }
    )

export default withStyles(style)(Dashboard);