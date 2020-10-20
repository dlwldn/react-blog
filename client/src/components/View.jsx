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

    const removeView = async () => {
        if (window.confirm('해당 게시물을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.')) {
            const board_id = props.match.params.data;

            await axios('http://localhost:5000/api/delete/board', {
                method: 'POST',
                headers: new Headers(),
                data: { board_id: board_id }
            })

            alert('게시물이 삭제되었습니다.')
            return window.location.href = '/'
        }
    }

    return (
        <div className='Write'>
            {data.data
                ? <div>
                    <div className='write_option_div'>
                        <input type='button' value='수정' />
                        <input type='button' value='삭제' onClick={removeView} />
                    </div>

                    <div className='top_title'>
                        <input type='text' id='title_txt' name='title' defaultValue={data.data.data[0].title} readOnly />

                        <div className='date_div'>
                            {date}
                        </div>
                    </div>

                    <div>
                        <textarea id='content_txt' name='contents' defaultValue={data.data.data[0].contents} readOnly></textarea>
                    </div>

                    <input type='button' value='목록' id='view_list_button' onClick={() => window.location.href = '/'} />
                </div>
                : null}
        </div>
    )
}

export default View;