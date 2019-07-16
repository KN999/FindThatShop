import React from 'react';
import './Homepage.css';
import SimpleMap from './map';

export default function Homepage() {         
return (
    <div className="align-webkit-center">
        <div>
            <h1 className="margin-5 font-400">ShopKeeper's List</h1>
            <h4 className="margin-5">Find things that are sold in shops near you and check it's availability.</h4>
        </div>
        <div className="input-group width-65">
            <input type="text" name="thing" className="form-control"/>
            <span className="input-group-btn">
                <button type="submit" className="btn btn-primary">search</button>
            </span>
        </div>
        
    </div>
  );
}