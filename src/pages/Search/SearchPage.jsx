import { useState } from 'react';
import BottomNavBar from '../../components/Layout/BottomNavBar';
import SearchBar from '../../components/Search/SearchBar';
import '../../styles/pages/search/SearchPage.scss';
import PostSearchResult from '../../components/Search/PostSearchResult';
import ChatSearchResult from '../../components/Search/ChatSearchResult';

export default function SearchPage() {
  const [selected, setSelected] = useState('');

  const onTargetClick = (type) => {
    setSelected(type);
  };

  return (
    <>
      <SearchBar />
      <div className="search_Wrapper">
        <div className="searchTarget_Container">
          <div
            className={`searchTarget_Text ${selected === '게시물' ? 'selected' : ''}`}
            onClick={() => onTargetClick('게시물')}
          >
            게시물
          </div>
          <div
            className={`searchTarget_Text ${selected === '채팅방' ? 'selected' : ''}`}
            onClick={() => onTargetClick('채팅방')}
          >
            채팅방
          </div>
        </div>
        <div className="searchResult_Container">
          {selected === '게시물' && <PostSearchResult />}
          {selected === '채팅방' && <ChatSearchResult />}
        </div>
      </div>
      <BottomNavBar />
    </>
  );
}
