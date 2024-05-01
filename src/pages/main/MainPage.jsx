import { useEffect } from 'react';
import Apis from '../../apis/axios';

const MainPage = () => {
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
    console.log(memberState);
    return (
        <div>
            
        </div>
    );
};

export default MainPage;