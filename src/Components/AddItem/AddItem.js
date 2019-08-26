import React from 'react';
import { additem } from '../../utils/service-layer/inventory';
import { usershops } from '../../utils/service-layer/shops'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import ShopImage from '../../utils/assets/shop.jpg'
import { useStyles } from '../../utils/use-style/useStyle'
import './AddItem.css'

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
        usershops('c', (response) => {
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
        return (
            <ItemDetails onSubmit={this.onSubmit} onChange={this.onChange}/>
        );
    }
}

function ItemDetails(props) {

    const classes = useStyles();

    return (
        <div className="margin-20px">
            <form className='align-webkit-center' onSubmit={props.onSubmit}>
                <Paper className={classes.paper}>
                    <Grid container spacing={1} >
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src={ShopImage} />
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