import { makeStyles, Theme, createStyles, fade } from '@material-ui/core/styles';


const drawerWidth = 240;

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            padding: theme.spacing(1, 2),
            backgroundColor: theme.palette.secondary.main,
            zIndex: 9,
            [theme.breakpoints.only('xs')]: {
                padding: theme.spacing(2, 2),
            },
        },
        title: {
            flexGrow: 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            zIndex: -1,
        },
        drawerPaper: {
            width: drawerWidth,
            paddingTop: theme.spacing(10)
        },
        search: {
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(50),
                '&:focus': {
                    width: theme.spacing(70),
                },
            },
        },
        container: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.palette.primary.main,
            position: 'absolute',
            top: 0,
            left: 0,
        },
        paperRoot: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: theme.spacing(9),
            marginTop: theme.spacing(10),
            paddingBottom: theme.spacing(9),
            paddingLeft: theme.spacing(10),
            paddingRight: theme.spacing(10),
            maxWidth: 450,
        },
        textRow: {
            marginBottom: theme.spacing(5),
            textAlign: 'center',
        },
        errorCode: {
            fontSize: 148,
            fontWeight: 600,
        },
        backButton: {
            textTransform: 'none',
            fontSize: 22,
        }
    }),
);