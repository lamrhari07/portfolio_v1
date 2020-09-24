import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {
    CssBaseline,
    Theme,
    makeStyles,
    createStyles
} from '@material-ui/core';
// import './App.css'

// Interface...
import { IState, IUser } from '../utils/Interface';

// Components...
import Header from './components/header/Header';
import Layout from './components/Layout';


const App: FC<{}> = () => {

    const classes = useStyles();
    const history = useHistory();

    const [path, setPath] = React.useState<string>(history.location.pathname);

    const state = useSelector<IState>((state: IState) => state) as IState
    
    if(localStorage.getItem('id_token')){
        state.isAuthenticated = true
    }
    if(!localStorage.getItem('id_token')){
        state.isAuthenticated = false
    }

    const header = React.useRef<HTMLElement>(null);
    const section = React.useRef<HTMLDivElement>(null);

    const sectionOneOptions: IntersectionObserverInit = {
        threshold: .89,
        rootMargin: "0px 0px 5000px 0px",

    };

    const sectionOneObserver = new IntersectionObserver((
        entries: IntersectionObserverEntry[],
    ) => {
        entries.map(entry => {
            if (!entry.isIntersecting) {
                header.current && header.current.classList.add(classes.header)
            } else {
                header.current && header.current.classList.remove(classes.header)
            }
        })
    }, sectionOneOptions)

    React.useEffect(() => {
        if (section.current && header) {
            sectionOneObserver.observe(section.current)
        }
    }, [])

    React.useEffect(() => {
        return history.listen((location) => {
            setPath(location.pathname)
        })
    }, [history])

    return (
        <React.Fragment>
            <CssBaseline />
            {(path == '/' || path.startsWith('/portfolio')) && <Header section={header} auth={state.isAuthenticated} />}
            <div ref={section} >
                <Layout auth={state.isAuthenticated} />
            </div>
        </React.Fragment>
    )
}

// Init Style;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'absolute',
            backgroundColor: 'transparent',
            boxShadow: 'none',
        },
        header: {
            position: 'fixed',
            backgroundColor: '#FFF',
            padding: theme.spacing(1),
            boxShadow: "0 2.8px 2.2px rgba(0, 0, 0, 0.19)",
            transition: 'background-color 550ms ease-in'
        },
    })
)

export default App;