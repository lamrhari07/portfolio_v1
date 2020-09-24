import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';

const themes: ThemeOptions = createMuiTheme(
    {
        palette: {
            primary: {
                main: '#545454'//'#3A3F58'
            },
            secondary: {
                main: '#FF9001'
            },
            info: {
                main: '#6F459E'
            },
            warning: {
                main: '#EE6A59'
            }
        },
        typography: {
            fontFamily: "'Noto Sans KR', sans-serif",
            h1: {
                fontSize: '3rem',
                fontWeight: 600
            },
            h2: {
                fontSize: '2.5rem',
                fontWeight: 600
            },
            h3: {
                fontSize: '2rem',
                fontWeight: 500
            },
            h4: {
                fontSize: '1.4rem',
                fontWeight: 500
            },
            h5: {
                fontSize: '1.2rem',
            },
            h6: {
                fontSize: '1rem',
            }
        }
    }
);

export default themes;