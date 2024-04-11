import MovieIcon from '../../assets/svgs/interests/MovieIcon';
import LifeStyleIcon from '../../assets/svgs/interests/LifeStyleIcon';
import SportsIcon from '../../assets/svgs/interests/SportsIcon';
import ArtIcon from '../../assets/svgs/interests/ArtIcon';
import HealthIcon from '../../assets/svgs/interests/HealthIcon';
import MusicIcon from '../../assets/svgs/interests/MusicIcon';
import FoodIcon from '../../assets/svgs/interests/FoodIcon';
import GameIcon from '../../assets/svgs/interests/GameIcon';
import TechIcon from '../../assets/svgs/interests/TechIcon';
import '../../styles/pages/login/InterestPage.scss';
import { useState } from 'react';

export default function InterestList({ onInterestChange }) {
  // const [isselected, setIsselected] = useState(false);
  const [interest, setInterest] = useState([]);

  const categorylist = [
    { key: '영화', value: <MovieIcon /> },
    { key: '라이프스타일', value: <LifeStyleIcon /> },
    { key: '운동', value: <SportsIcon /> },
    { key: '예술', value: <ArtIcon /> },
    { key: '건강', value: <HealthIcon /> },
    { key: '음악', value: <MusicIcon /> },
    { key: '음식', value: <FoodIcon /> },
    { key: '게임', value: <GameIcon /> },
    { key: '기술', value: <TechIcon /> },
  ];

  const handleSelect = (value) => {
    let updatedInterest = [];
    if (interest.includes(value)) {
      updatedInterest = interest.filter((arr) => arr !== value);
    } else {
      updatedInterest = [...interest, value];
    }
    setInterest(updatedInterest);
    onInterestChange(updatedInterest); // 상위 컴포넌트로 선택된 관심사의 상태를 전달
  };
  console.log(interest);

  return (
    <div
      style={{
        width: '90%',
        display: 'flex',
        flexFlow: 'wrap',
        margin: 'auto',
      }}
    >
      {categorylist.map((category) => (
        <div
          key={category.key}
          className="interestBox"
          onClick={() => handleSelect(category.key)}
          style={{
            background: interest.includes(category.key) ? '#93BBF6' : '#F6F5FF', // 선택된 항목의 배경색 변경
          }}
        >
          {category.value}
          <div className="interestTitle">{category.key}</div>
        </div>
      ))}
    </div>
  );
}
