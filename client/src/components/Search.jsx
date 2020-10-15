import React from 'react';
import '../main.css';

const Search = ({ searchResult }) => {
    if (searchResult) {
        document.getElementsByName('search')[0].value = searchResult
    }

    return (
        <div>
            <form>
                <input type='text' maxLength='20' className='search_input' name='search' placeholder='검색어를 입력해주세요.' />
                <input type='submit' value='검색' className='serach_submit' />
            </form>
        </div>
    )
}

export default Search