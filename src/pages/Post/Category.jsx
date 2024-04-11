import { useEffect, useState } from 'react';
import '../../styles/pages/Post/Category.scss';

const Categories = [
  { id: '영화', value: '영화' },
  { id: '예술', value: '예술' },
  { id: '운동', value: '운동' },
  { id: '라이프스타일', value: '라이프스타일' },
  { id: '건강', value: '건강' },
  { id: '기술', value: '기술' },
];

export default function Category({ onCategorySelect, selectedCategories }) {
  const [selected, setSelected] = useState([]);
  const initalSelected = selectedCategories;

  useEffect(() => {
    setSelected(initalSelected);
  }, [initalSelected]);

  const handleSelected = (key) => {
    setSelected((prevSelected) => {
      const newSelected = prevSelected.includes(key)
        ? prevSelected.filter((selectedId) => selectedId !== key)
        : [...prevSelected, key];
      onCategorySelect(newSelected);

      return newSelected;
    });
  };

  return (
    <div className="element">
      {Categories.map((item) => (
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
