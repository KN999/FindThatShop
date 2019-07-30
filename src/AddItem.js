import React, {Component} from 'react'
import { additem } from './service-layer/inventory'
import { getshop } from './service-layer/shops'
import './AddItem.css'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Shop from './shop.jpg'

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

export default class AddItem extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            shopid: '',
            itemname : '',
            quantity : '',
            price : '',
            mass : '',
            shops : []
        }
    }

    componentDidMount() {
        var self = this
        getshop('c', (response) => {
            self.setState({shops: response.data.shop.shops})
        })

    }

    onSubmit = (event) => {
        event.preventDefault()
        var item = {
            shopid: this.props.shopid,
            itemname: this.state.itemname,
            quantity: this.state.quantity,
            price: this.state.price,
            mass : this.state.mass,
        }
        
        additem(item, (redirect) => {
            this.props.onClick()
            if(redirect === 0) {
                this.setState({
                    redirect : true
                });
            }
        })
    };
    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
        });
    }

    render() {

        //const { history } = this.props;
        //if (this.state.redirect == true)
        //{
        //    history.push("/dashboard")
        //}
    
        return (
            <Item onSubmit={this.onSubmit} onChange={this.onChange}/>
        );
    }
}

function Item(props) {

    const classes = useStyles();

    return (
        <div className="margin-20px">
            <form className='align-webkit-center' onSubmit={props.onSubmit}>
                <Paper className={classes.paper}>
                    <Grid container spacing={1} >
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src={Shop} />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container className="text-align-left">
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        <input type='text' name='itemname' placeholder='Item Name' className='form-control' onChange={props.onChange} />
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1">
                                        <input type='text' name='quantity' placeholder='Quantity' className='form-control' onChange={props.onChange} />
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1">
                                        <input type='text' name='price' placeholder='Price' className='form-control' onChange={props.onChange} />
                                    </Typography>
                                    <div className="form-group width-30">
                                        <input type='tel' name='mass' placeholder='Mass' className='form-control' onChange={props.onChange} />
                                    </div>
                                </Grid>
                                <Button type="submit">Add Item</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </form>
        </div>
    )
}