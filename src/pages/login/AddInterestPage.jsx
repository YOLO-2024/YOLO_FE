import { useNavigate } from 'react-router-dom';
import '../../styles/login/AddInterestPage.scss';
import backButton from '../../assets/Login/interest/backButton.svg'
import art from '../../assets/Login/interest/art.svg';
import food from '../../assets/Login/interest/food.svg';
import game from '../../assets/Login/interest/game.svg';
import healthcare from '../../assets/Login/interest/healthcare.svg';
import lifestyle from '../../assets/Login/interest/lifestyle.svg';
import movie from '../../assets/Login/interest/movie.svg';
import music from '../../assets/Login/interest/music.svg';
import sport from '../../assets/Login/interest/sport.svg';
import tech from '../../assets/Login/interest/tech.svg';
import { useState } from 'react';
import Apis from '../../apis/axios';


const interestList = [
  {
    value: '영화',
    src: movie,
  },
  {
    value: '라이프스타일',
    src: lifestyle,
  },
  {
    value: '운동',
    src: sport,
  },
  {
    value: '예술',
    src: art,
  },
  {
    value: '건강',
    src: healthcare,
  },
  {
    value: '음악',
    src: music,
  },
  {
    value: '음식',
    src: food,
  },
  {
    value: '게임',
    src: game,
  },
  {
    value: '기술',
    src: tech,
  },
];

const AddInterestPage = () => {
    const navigate = useNavigate();
    const [list, setlist] = useState([]);

    const onClickBackButton = () => {
        navigate(-1);
    }

    const onClickInterestIcon = (value) => {
        let updatedInterest = [];
        if (list.includes(value)) {
          updatedInterest = list.filter((arr) => arr !== value);
        } else {
          updatedInterest = [...list, value];
        }
        setlist(updatedInterest);
    };
    
    const handleSumbit = () => {
        const dto = {
          interestList: list,
        };
        Apis.post(`/api/v1/member/update-interest`, dto);
        navigate('/')
    }

    return (
      <div className="AddInterest_Container">
        <div className="AddInterest_Wrapper">
          <img
            src={backButton}
            onClick={onClickBackButton}
            className="AddInterest_BackButton"
          />
          <div className="AddInterest_TopText">관심사를 선택해주세요.</div>
          <div className="AddInterest_InterestList">
            {interestList.map((interest) => (
              <div
                className="AddInterest_Interest_Box"
                key={interest.value}
                onClick={() => onClickInterestIcon(interest.value)}
              >
                <div
                  style={{
                    background: list.includes(interest.value)
                      ? '#93BBF6'
                      : '#F6F5FF',
                  }}
                  className="AddInterest_InterestImage_Wrapper"
                >
                  <img
                    src={interest.src}
                    className="AddInterest_InterestImage"
                  />
                </div>
                <div className="AddInterest_Interest_Text">
                  {interest.value}
                </div>
              </div>
            ))}
          </div>
          <button
            className={
              list.length > 0
                ? 'AddInterest_SubmitButton'
                : 'AddInterest_DisableButton'
            }
            onClick={handleSumbit}
            disabled={list.length > 0 ? false : true}
          >
            시작해보기
          </button>
        </div>
      </div>
    );
};

export default AddInterestPage;