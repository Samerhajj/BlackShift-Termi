import React,{useState} from 'react';

const SuggestCard=({data})=> {
return (
    <div>
        <div>
            <div>
            </div>
            <h1>{data['_id']}</h1>
            <br/>
            <h1>suggestedBy : {data['suggestedBy']}</h1>
            <h2>{JSON.stringify(data)}</h2>
        </div>
            <button className="btn btn-success">Add</button>
            <button className="btn btn-danger">Remove</button>
    </div>
    )
}


export default SuggestCard;