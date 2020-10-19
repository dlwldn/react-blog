import React, { useState, useEffect } from 'react';
import '../main.css';
import axios from 'axios';


const View = (props) => {
    const [data, setData] = useState([]);
    const [date, setDate] = useState('');

    useEffect(() => {
        const board_id = props.match.params.data;
        getData(board_id);
        addViewCnt(board_id);
    }, [])

    const getData = async (board_id) => {
        const getBoardData = await axios('http://localhost:5000/api/get/board_data', {
            method: 'POST',
            headers: new Headers(),
            data: { id: board_id }
        });
        const date = getBoardData.data.data[0].date.slice(0, 10) + ' ' + getBoardData.data.data[0].date.slice(11, 16);
        setData(() => getBoardData);
        setDate(date)
    }

    const addViewCnt = async function (board_id) {
        const addView = await axios('http://localhost:5000/api/update/view_cnt', {
            method: 'POST',
            headers: new Headers(),
            data: { id: board_id }
        })
    }


    return (
        <div className='Write'>
            {data.data
                ? <div>

                    <div className='top_title'>
                        <input type='text' id='title_txt' name='title' defaultValue={data.data.data[0].title} readOnly />

                        <div className='date_div'>
                            {date}
                        </div>
                    </div>

                    <div>
                        <textarea id='content_txt' name='contents' defaultValue={data.data.data[0].contents} readOnly></textarea>
                    </div>
                </div>
                : null}
        </div>
    )
}

export default View;