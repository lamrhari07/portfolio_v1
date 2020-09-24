import { withStyles, Theme, createStyles } from '@material-ui/core';
import { Home } from './Home';


const style = (theme: Theme) =>
    createStyles({
        intro: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'linear-gradient(to right, #8360c3, #2ebf91)',
            height: '100vh',
            width: '100%',
            textAlign: 'center',
        },
        grid: {
            display: 'grid',
            gridGap: '1.5rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            justifyContent: 'center',
        },
        cards: {
            position: 'relative',
            margin: '0 auto',
            borderRadius: '10%',

        },
        medias: {
            margin: '0 auto',
            width: 250,
            height: 250
        },
        content: {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 0,
            height: '100%',
            width: '100%',
            color: '#FFF',
            backgroundColor: 'rgb(0, 0, 0, 0.5)',
        },
        username: {
            textDecoration: 'none',
            color: '#FFF',
            fontWeight: 600,
            margin: '1.5rem 0'
        },
        card: {
            position: 'relative',
            margin: '0 auto',
            borderRadius: '50%',
            width: 'auto',

        },
        media: {
            margin: '0 auto',
            width: 250,
            height: 250
        },
        title: {
            padding: theme.spacing(8, 0),
            color: theme.palette.primary.main,
        },
        section2: {
            display: 'flex',
            flexDirection: 'column',
            margin: theme.spacing(0, 5),
            paddingBottom: theme.spacing(5),
        }
    }
    )

export default withStyles(style)(Home);