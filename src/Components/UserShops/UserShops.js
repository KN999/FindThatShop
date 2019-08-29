import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import ItemImage from '../../utils/assets/item.jpg'
import { getitem } from '../../utils/service-layer/inventory'
import AddImage from '../../utils/assets/addSign.png'
import AddItem from '../AddItem/AddItem'
import { useStyles } from '../../utils/use-style/useStyle'
import './UserShops.css'

function AddItemButton (props) {
    const classes = useStyles();
    return (
        <Paper className={classes.paper2}>
            <Grid container spacing={1} >
                <Grid item>
                    <ButtonBase className={classes.image} onClick={props.onClick}>
                        <img className={classes.img} alt="complex" src={AddImage} />
                    </ButtonBase>
                </Grid>
            </Grid>
        </Paper>
    )
}

function Items(props) {

    const classes = useStyles();
    const [additem, setadditem] = useState(false);

    return (
        <div className="makeStyles-root-1 row">
            {props.items.map(Item=>(
                <Paper className={classes.paper3}>
                <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase className={classes.image}>
                    <img className={classes.img} alt="complex" src={ItemImage} />
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
            {additem === true ? <AddItem onClick={ () => setadditem(false)} shopid={props.shopid}/> : <AddItemButton onClick={ () => setadditem(true) }/>}
        </div>
    );
}
  
export default class GetShop extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            shopid:'',
            shops : [],
            items : []
        }
    }

    componentDidMount() {
        var self = this

        getitem(this.props.location.state.shopid, (response) => {
            self.setState({items: response.data.item.items})
        })
    }

    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
        });
        
    }

    render() {
        return(
            <div className="margin-top-50px">
                <Items items={this.state.items} shopid = {this.props.location.state.shopid}/>
            </div>
        )
    }
}
