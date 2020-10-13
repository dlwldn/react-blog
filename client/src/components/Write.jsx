import React from 'react';
import '../main.css'

const Write = () => {
    return (
        <div className="Write">
            <div>
                <input type='text' name='title' id="title_txt" placeholder="제목" />
            </div>

            <div>
                <textarea id="content_txt" name='contents' placeholder="내용을 입력하세요." />
            </div>
        </div>
    )
}

export default Write