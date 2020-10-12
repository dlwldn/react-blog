import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import Modal from 'react-awesome-modal';
import axios from 'axios';
import '../App.css';

const Header = () => {
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const openModal = () => {
        setVisible(true);
    }

    const closeModal = () => {
        setVisible(false);
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
        const res = await axios('http://localhost:5000/api/send/pw', {
            method: 'POST',
            data: { id, password },
            headers: new Headers()
        })

        if (res.data) {
            console.log(res.data)
        }
    }

    return (
        <div className='header_grid'>
            <div> </div>
            <div className='acenter'>
                <Route path='/' />
                <Link className='link_tit' to='/'> <h3>지우's Blog</h3> </Link>
            </div>

            <div className='acenter'>
                <h5 onClick={openModal}> 관리자 로그인 </h5>

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
                                    <input type='text' name='id' onChange={onChangeIdHandler} />
                                </div>

                                <div className='login_input_div' style={{ 'marginTop': '40px' }}>
                                    <p> 관리자 Password </p>
                                    <input type='text' name='password' onChange={onChangePasswordHandler} />
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


