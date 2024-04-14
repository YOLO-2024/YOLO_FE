import { useState } from 'react';
import '../../styles/pages/Post/Category.scss';

const Categories = [
  { key: '영화', value: '영화' },
  { key: '라이프스타일', value: '라이프스타일' },
  { key: '운동', value: '운동' },
  { key: '예술', value: '예술' },
  { key: '건강', value: '건강' },
  { key: '음악', value: '음악' },
  { key: '음식', value: '음식' },
  { key: '게임', value: '게임' },
  { key: '기술', value: '기술' },
];

export default function Category({
  setSelectedCategories,
  selectedCategories,
}) {
  const [interest, setInterest] = useState(selectedCategories || []);

  const handleSelect = (value) => {
    let updatedInterest = [];
    if (interest.includes(value)) {
      updatedInterest = interest.filter((arr) => arr !== value);
    } else {
      updatedInterest = [...interest, value];
    }
    setInterest(updatedInterest);
    setSelectedCategories(updatedInterest);
  };

  // console.log(interest);
  return (
    <div className="Categories">
      {Categories.map((item) => (
        <div
          key={item.key}
          onClick={() => handleSelect(item.value)}
          style={{
            color: interest.includes(item.value) ? '#266ED7' : '#686A8A', // 선택된 항목의 배경색 변경
          }}
          className="category_element"
        >
          {item.value}
        </div>
      ))}
    </div>
  );
}
