import React, { useState, useEffect, useCallback, memo } from 'react';
import axios from 'axios';
import '../main.css';
import Search from './Search';
import queryString from 'query-string';

const List = memo((props) => {
    const [data, setData] = useState([]);
    const [pageAll, setPageAll] = useState([]);
    const [sessionPage, setSessionPage] = useState('');
    const [limit, setLimit] = useState(10);
    const [searchResult, setSearchResult] = useState('');

    useEffect(() => {
        getListData();
        setPage();
    }, [])

    const getListData = useCallback(async () => {
        const postPage = setPage();
        let search = queryString.parse(props.location.search);
        if (search) {
            search = search.search;
        }
        console.log(search)

        const totalCnt = await axios('http://localhost:5000/api/get/board_cnt', {
            method: 'POST',
            headers: new Headers(),
            data: { search: search }
        });

        // const dataList = await axios('http://localhost:5000/api/get/board', {
        //     method: 'GET',
        //     headers: new Headers(),
        // })

        const totalList = await axios('http://localhost:5000/api/get/board', {
            method: 'POST',
            headers: new Headers(),
            data: { limit: limit, page: postPage, search: search }
        })

        let pageArr = [];
        for (let i = 1; i <= Math.ceil(totalCnt.data.cnt / limit); i++) {
            pageArr.push(i);
        }

        console.log(pageArr);
        setPageAll(pageArr);
        setData(totalList);
        setSearchResult(search);
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

            {data.data && data.data.length > 0 ? data.data.map((el, key) => {
                return (
                    <div className='list_grid list_data' key={key}>
                        <div> {el.title} </div>
                        <div> </div>
                        <div className='acenter'> {el.date.slice(0, 10)} </div>
                    </div>
                )
            })
                : <div className='not_data acenter'>
                    {searchResult !== "" ? <div> 검색된 결과가 없습니다. </div> // 검색 사용
                        : <div> 데이터가 없습니다. </div> // 검색 사용 X
                    }
                </div>
            }


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

                    <Search searchResult={searchResult} />
                </div>
                <div>

                </div>
            </div>
        </div>
    )
})

export default List