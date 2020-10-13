import React from 'react';
import '../../main.css';
import axios from 'axios';


const RightWrite = () => {
    const submitBoard = async () => {
        const title = document.getElementsByName('title')[0].value.trim();
        const contents = document.getElementsByName('contents')[0].value.trim();

        if (title === "") {
            return alert("제목을 입력해주세요");
        } else if (contents === "") {
            return alert("내용을 입력해주세요");
        }

        const data = { title: title, contents: contents };
        const res = await axios('http://localhost:5000/api/add/board', {
            method: 'POST',
            data: data,
            headers: new Headers()
        })

        if (res.data) {
            alert('글 등록이 완료되었습니다.');
            return window.location.replace('/')
        }
    }


    return (
        <div id='post_submit'>
            <button onClick={submitBoard}> 포스트 등록 </button>
        </div>
    )
}

export default RightWrite