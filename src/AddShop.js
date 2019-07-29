// Need to remove state username and add state image
import React, {Component} from 'react'
import { addshop } from './service-layer/shops'
import './AddShop.css'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
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
        margin: 'auto',
        maxWidth: 160
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

export default class AddShop extends React.Component {
    constructor (props) {
        super(props)
        console.log(this.state)
        this.state = {
            username : '', 
            shopname : '',
            shopowner : '',
            shopaddress : '',
            shopcontactno : '',
            redirect : false,
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
        });
    }

    onSubmit = (event) => {
        event.preventDefault()
        var shop = {
            username : this.state.username,
            shopname: this.state.shopname,
            shopowner: this.state.shopowner,
            shopaddress: this.state.shopaddress,
            shopcontactno: this.state.shopcontactno,
        }
        
        addshop(shop, (redirect) => {
            if(redirect === 0) {
                this.setState({
                    redirect : true
                });
            }
        })
    };

    render() {

        //const { history } = this.props;

        //if (this.state.redirect == true)
        //    history.push("/dashboard")
        
        return (
            <ShopDetails onSubmit={this.onSubmit} onChange={this.onChange}/>
        );
    }
}

function ShopDetails(props) {

    const classes = useStyles();

    return (
        <div className="margin-top-50px">
            <form className='align-webkit-center' onSubmit={props.onSubmit}>
                <Paper className={classes.paper}>
                    <Grid container spacing={1} >
                        <Grid item xs={12} sm container className="text-align-left">
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        <input type='text' name='username' placeholder='username' className='form-control' onChange={props.onChange} />
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1">
                                        <input type='text' name='shopname' placeholder='Shop Name' className='form-control' onChange={props.onChange} />
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1">
                                        <input type='text' name='shopowner' placeholder='Shop Owner' className='form-control' onChange={props.onChange} />
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1">
                                        <input type='text' name='shopaddress' placeholder='Shop Address' className='form-control' onChange={props.onChange} />
                                    </Typography>
                                    <div className="form-group width-30">
                                        <input type='tel' name='shopcontactno' placeholder='Contact No.' className='form-control' onChange={props.onChange} />
                                    </div>
                                </Grid>
                                <Button type="submit">Add Shop</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </form>
        </div>
    )

}