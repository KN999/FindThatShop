import React from 'react'
import { addshop } from '../../utils/service-layer/shops'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import ShopImage from '../../utils/assets/shop.jpg'
import { useStyles } from '../../utils/use-style/useStyle'
import './AddShop.css'

export default class AddShop extends React.Component {
    constructor (props) {
        super(props)
        console.log(this.state)
        this.state = {
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
            token : localStorage.getItem('Token'),
            shopname: this.state.shopname,
            shopowner: this.state.shopowner,
            shopaddress: this.state.shopaddress,
            shopcontactno: this.state.shopcontactno,
        }
        
        addshop(shop, (redirect) => {
            this.props.onClick()
            if(redirect === 0) {
                this.setState({
                    redirect : true
                });
            }
        })
    };

    render() {
        return (
            <ShopDetails onSubmit={this.onSubmit} onChange={this.onChange}/>
        );
    }
}

function ShopDetails(props) {

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