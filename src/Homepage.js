import React from 'react';
import './Homepage.css';
import SimpleMap from './map';

export default function Homepage() {      
    
return (
    <div>
        <div className="align-webkit-center margin-16">
            <h1 className="font-size-3-5 font-color-white">Find That Shop</h1>
            
            <div className="input-group width-65 ">
                <input type="text" name="thing" className="form-control" placeholder="Where I can find a..."/>
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-primary">Go</button>
                </span>
            </div>
        </div>
    </div>
  );
}