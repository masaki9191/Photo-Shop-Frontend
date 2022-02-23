import React, {useState} from "react";

function ResetInfo() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [alertModal, setAlertModal] = useState(false);

    const handleSubmit = () => {
        if (email == '') {
            setError('Please input email')
            setAlertModal(true)
            return
        }
        if (password == '')
        {
            setError('Please input password')
            setAlertModal(true)
            return
        }
        var data = JSON.stringify({'email':email, 'password': password})
        var config = {
            method: 'post',
            url: `${base_url}/api/login`,
            headers: { 
              'Content-Type': 'application/json',
            },
            data: data
        }
        axios(config)
            .then((response)=>{
                
            })
            .catch((error)=>{

            })
    }

    return (
        <>
            <div className="login-resetInfo">
                <div className="login-resetInfo-item">
                    <div className="loginItem">
                        <div className="loginItem-bg">
                            <div className="form-group">
                                <label htmlFor="">登録メールアドレス</label>
                                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">新しいパスワード</label>
                                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">再確認</label>
                                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                            </div>
                            <a onClick={handleSubmit} className="loginItem-btn">確認</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetInfo;