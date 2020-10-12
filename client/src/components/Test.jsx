import React from 'react';
import queryString from 'query-string';

const Test = (props) => {
    console.log(props);
    const qry = queryString.parse(props.location.search);
    console.log(qry);
    return (
        <div>
            <h1>welcome 여긴 Test페이지입니다. {qry.name} </h1>
        </div>
    )
}

export default Test