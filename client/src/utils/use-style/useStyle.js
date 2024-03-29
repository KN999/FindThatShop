import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1000
    },
    paper2: {
        padding: theme.spacing(2),
        margin: 'auto auto 20px auto',
        maxWidth: 160
    },
    paper3: {
        padding: theme.spacing(2),
        margin: 'auto auto 20px auto',
        maxWidth: 500,
    },
    paper4: {
        padding: theme.spacing(2),
        margin: '20px auto 20px auto',
        maxWidth: 350,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    
}));

