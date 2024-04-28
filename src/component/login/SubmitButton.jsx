import Apis from '../../apis/axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/login/AddInfoPage.scss';

const SubmitButton = (props) => {
    const navigate = useNavigate();
    const {imageUrl, location, nickname, introduce} = props;
    
    const onSubmit = () => {
        const formData = new FormData();
        const dto = {
            nickname: nickname,
            location: location,
            content: introduce
        }

        formData.append('file', new Blob([JSON.stringify(imageUrl)], { type: 'multipart/form-data' }))
        formData.append(
          'updateProfileRequestDto',
          new Blob([JSON.stringify(dto)], { type: 'application/json' })
        );
        
        Apis.post(`/api/v1/member/update-profile`, 
            formData
        )
        navigate('/addInterest')
    }

    return (
        <>
            <button
                onClick={onSubmit}
                className='addInfo_SubmitButton'
            >다음</button>
        </>
    );
};

export default SubmitButton;