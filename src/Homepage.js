import React from 'react';
import './Homepage.css';
import SimpleMap from './map';

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
        alert(thing)
        //need to work on this
        //findthatshop(thing, (response) => {
        //    self.setState({shops: response.data.shop.shops})
        //})
    };

    render() {
        return (
            <div class="backImage">
                <div className="align-webkit-center">
                    <h1 className="font-size-3-5 font-color-white padding-top-175px">Find That Shop</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="input-group width-65 ">
                            <input type="text" name="thing" className="form-control" placeholder="Where I can find a..." onChange={this.onChange}/>
                            <span className="input-group-btn">
                                <button type="submit" className="btn btn-primary">Go</button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        )};
}