import { useState } from 'react';
import '../../styles/pages/Post/Category.scss';

const Categories = [
  { id: 'movie', value: '영화' },
  { id: 'art', value: '예술' },
  { id: 'exercise', value: '운동' },
  { id: 'life', value: '라이프스타일' },
  { id: 'health', value: '건강' },
  { id: 'tech', value: '기술' },
];

export default function Category({ onCategorySelect }) {
  const category = Categories;
  const [selected, setSelected] = useState([]);

  const handleSelected = (id) => {
    setSelected((prevSelected) => {
      const newSelected = prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id];

      onCategorySelect(newSelected);
      // console.log(newSelected);
      return newSelected;
    });
  };

  return (
    <div className="element">
      {category.map((item) => (
        <div
          key={item.id}
          onClick={() => handleSelected(item.id)}
          className={selected.includes(item.id) ? 'selected' : ''}
        >
          {item.value}
        </div>
      ))}
    </div>
  );
}
