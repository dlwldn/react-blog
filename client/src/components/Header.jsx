import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import Modal from 'react-awesome-modal';
import axios from 'axios';
import '../App.css';

const Header = () => {
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);

    useEffect(() => {
        if (sessionStorage.login) {
            setLogin(true);
        }
    }, [login])


    const openModal = () => {
        setVisible(true);
    }

    const closeModal = () => {
        setVisible(false);
        setId('');
        setPassword('');
    }

    const onChangeIdHandler = () => {
        const id = document.getElementsByName('id')[0].value;
        setId(id);
        console.log(id);
    }

    const onChangePasswordHandler = () => {
        const password = document.getElementsByName('password')[0].value;
        setPassword(password);
        console.log(password);
    }

    const selectUserData = async (e) => {
        const _id = id.trim();
        const _password = password.trim();

        if (_id === "") {
            return alert('아이디를 입력해주세요.');
        } else if (_password === "") {
            return alert('비밀번호를 입력해주세요.');
        }
        const obj = { id: _id, password: _password };
        const res = await axios('http://localhost:5000/api/send/pw', {
            method: 'POST',
            data: obj,
            headers: new Headers()
        })

        if (res.data) {
            console.log(res.data.msg);

            if (res.data.suc) {
                sessionStorage.setItem('login', true)
                setLogin(true);
                closeModal();

                return alert('로그인 되었습니다.');
            } else {
                return alert('아이디 또는 비밀번호가 일치하지 않습니다.');
            }
        }
    }

    const logout = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            sessionStorage.removeItem('login');
            setLogin(false);
        }
    }


    return (
        <div className='header_grid'>
            <div></div>
            <div className='acenter'>
                <h3>지우 Blog</h3>
                {login ? <h5><Link to="/write">포스트 작성</Link></h5> : null}
            </div>

            <div className='acenter'>
                {login ? <h5 className='btn_cursor' onClick={logout}> 관리자 로그아웃 </h5>
                    : <h5 className='btn_cursor' onClick={openModal}> 관리자 로그인 </h5>}

                <Modal visible={visible}
                    width="400" height="360"
                    effect="fadeInDown"
                    onClickAway={closeModal}
                >
                    <div>
                        <h4 className='acenter login_tit'> 관리자 로그인 </h4>
                        <form>
                            <div className='login_div'>
                                <div className='login_input_div'>
                                    <p> 관리자 ID </p>
                                    <input type='text' name='id' value={id} onChange={onChangeIdHandler} />
                                </div>

                                <div className='login_input_div' style={{ 'marginTop': '40px' }}>
                                    <p> 관리자 Password </p>
                                    <input type='password' name='password' value={password} onChange={onChangePasswordHandler} />
                                </div>

                                <div className='submit_div'>
                                    <div> <input type='button' value='로그인' onClick={selectUserData} /> </div>
                                    <div> <input type='button' value='취소' onClick={closeModal} /> </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    );

}

export default Header;


