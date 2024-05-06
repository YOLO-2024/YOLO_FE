import { useEffect } from 'react';
import Apis from '../../apis/axios';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        Apis.get('/api/v1/member/profile')
        .then((response) => {
            sessionStorage.setItem(
              'memberState',
              JSON.stringify(response.data.data)
            );
        })
    }, [])

    const memberState = JSON.parse(sessionStorage.getItem('memberState'));
    
    return (
        <div>
            
        </div>
    );
};

export default MainPage;