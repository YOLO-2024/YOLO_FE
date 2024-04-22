import BackIcon from '../../assets/svgs/BackIcon';
import { useNavigate } from 'react-router-dom';
import '../../styles/component/common/SearchBar.scss';

export default function SearchBar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="searchBar_Wrapper">
      <div className="gobackButton" onClick={handleClick}>
        <BackIcon />
      </div>
      <input
        type="text"
        className="searchInput"
        placeholder="제목, 글 내용, 관심사, 거주지"
        style={{ fontSize: '15px' }}
      />
      <div className="searchButton">검색</div>
    </div>
  );
}
