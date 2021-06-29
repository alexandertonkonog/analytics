import React from 'react';

const WialonAuth = ({wialon}) => {
    return (
        <div className="wialon">
            <p>Пользователь: {wialon.login}</p>
            <p>Пароль: {wialon.password}</p>
            <iframe 
                src="https://web.erc61.ru/login.html?activation_time=31536000&redirect_uri=http://localhost:3000/" 
                frameBorder="0" 
                className="wialon"></iframe>
        </div>
    )
}
// 
export default WialonAuth;