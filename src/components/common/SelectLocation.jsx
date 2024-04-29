import { useState } from 'react';
import '../../styles/component/common/SelectLocation.scss';
import arrow_down from '../../assets/svgs/arrow_down.svg';
import arrow_up from '../../assets/svgs/arrow_up.svg'; // arrow_up 이미지 import
import { locations } from '../../data/location';

const SelectLocation = (props) => {
  // props 추가
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const toggleDropdown = () => {
    setIsExpanded(!isExpanded);
  };

  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setIsExpanded(false); // 사용자가 위치를 선택하면 드롭다운을 닫습니다.
    props.onChange(location); // 부모 컴포넌트에 선택된 위치 정보 전달
  };

  return (
    <div
      className="location_Wrapper"
      style={{ height: isExpanded ? '293px' : 'calc(var(--vh, 1vh) * 6)' }}
    >
      <div className="location_Selected_Wrapper" onClick={toggleDropdown}>
        <span>{selectedLocation}</span>{' '}
        <img src={isExpanded ? arrow_up : arrow_down} alt="dropdown arrow" />
      </div>
      {isExpanded && (
        <>
          <input
            type="text"
            placeholder="거주지를 검색하세요."
            className="location_Search_Wrapper"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div>
            {filteredLocations.map((location, index) => (
              <li
                key={index}
                className={`location_Item_Wrapper ${selectedLocation === location ? 'selected' : ''}`}
                onClick={() => handleLocationClick(location)}
              >
                {location}
              </li>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SelectLocation;
