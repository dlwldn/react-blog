import React, { useState, useEffect, useCallback, memo } from 'react';
import axios from 'axios';
import '../main.css';

const List = memo(() => {
    const [data, setData] = useState([]);
    const [pageAll, setPageAll] = useState([]);
    const [sessionPage, setSessionPage] = useState('');
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        getListData();
        setPage();
    }, [])

    const getListData = useCallback(async () => {
        const postPage = setPage();

        const totalCnt = await axios('http://localhost:5000/api/get/board_cnt');
        // const dataList = await axios('http://localhost:5000/api/get/board', {
        //     method: 'GET',
        //     headers: new Headers(),
        // })

        const totalList = await axios('http://localhost:5000/api/get/board', {
            method: 'POST',
            headers: new Headers(),
            data: { limit: limit, page: postPage }
        })

        let pageArr = [];
        for (let i = 1; i <= Math.ceil(totalCnt.data.cnt / limit); i++) {
            pageArr.push(i);
        }
        setPageAll(pageArr);
        setData(totalList);
    }, [])

    const changePage = useCallback((el) => {
        setSessionPage(el);
        sessionStorage.setItem('page', el);

        return getListData();
    }, [])

    const setPage = useCallback(() => {
        if (sessionStorage.page) {
            setSessionPage(Number(sessionStorage.page))
            return Number(sessionStorage.page);
        }

        setSessionPage(1);
        return 1;
    }, [])

    return (
        <div className='List'>

            <div className='list_grid list_tit'>
                <div> 제목 </div>
                <div> 조회수 </div>
                <div className='acenter'> 날짜 </div>
            </div>

            {data.data ? data.data.map((el, key) => {
                return (
                    <div className='list_grid list_data' key={key}>
                        <div> {el.title} </div>
                        <div> </div>
                        <div className='acenter'> {el.date.slice(0, 10)} </div>
                    </div>
                )
            })
                : null}


            <div className='paging_div'>
                <div> </div>
                <div>
                    <ul>
                        {pageAll ? pageAll.map((el, key) => {
                            return (
                                el === sessionPage ? <li key={key} className='page_num'> <b> {el} </b> </li>
                                    : <li key={key} className='page_num' onClick={() => changePage(el)}> {el} </li>
                            )
                        })
                            : null}
                    </ul>
                </div>
                <div> </div>
            </div>
        </div>
    )
})

export default List