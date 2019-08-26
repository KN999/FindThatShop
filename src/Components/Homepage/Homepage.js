import React, {useState} from 'react';
import { FindThatShop } from '../../utils/service-layer/search';
import { useStyles } from '../../utils/use-style/useStyle'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import ShopImage from '../../utils/assets/shop.jpg'
import './Homepage.css';


function Shops(props) {

    const classes = useStyles();
    const qshops = [];
    const query = props.query;

    props.shops.map(shop => {
        shop.items.map(item=> {
            if(item.itemName === query)
            {
                qshops.push(item);
                console.log("KLKLKLKLL",qshops)
            }
        })
    
    })

    return (
        <div className={classes.root}>
            {qshops.map(Item => (
                <Paper className={classes.paper3}>
                <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase className={classes.image}>
                    <img className={classes.img} alt="complex" src={ShopImage} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container className="text-align-left">
                    <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                            <legend> {Item.itemName}</legend>
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            Mass : {Item.itemMass}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            Quantity : {Item.itemQuantity}
                        </Typography>
                    </Grid>
                    </Grid>
                    <Grid item>
                    <Typography variant="subtitle1">₹{Item.itemPrice}</Typography>
                    </Grid>
                </Grid>
                </Grid>
            </Paper>
            ))}
        </div>
    );
}

export default class Homepage extends React.Component {  
    constructor(props) {
        super(props);

        this.state = {
            thing : '',
            shops : [],
        }
    }
    
    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
        });
    }

    onSubmit = (event) => {
        event.preventDefault()
        var thing = this.state.thing;
        var self = this;
        FindThatShop(thing, (response)=>{
            console.log(response);
            self.setState({ shops: response.data.shop })
        })
        
    };

    render() {
        
        return (
            <div class="backImage">
                <div className="align-webkit-center">
                    <h1 className="font-size-3-5 font-color-white padding-top-175px">Find That Shop</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="input-group width-45 ">
                            <input type="text" name="thing" className="form-control" placeholder="where I can find a..." onChange={this.onChange} />
                            <span className="input-group-btn">
                                <button type="submit" className="btn btn-primary">Go</button>
                            </span>
                        </div>
                    </form>
                </div>
                <div>
                <Shops shops={this.state.shops} query={this.state.thing}/>
                </div>
            </div>
        )
    };
}



function Result(props) {
    return(
        <div>
            {props.item}
            {console.log("KLKLKLKKLKLKL",props.item)}
        </div>
    )
}