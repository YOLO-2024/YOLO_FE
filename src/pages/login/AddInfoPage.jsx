import { useState, useRef } from 'react';
import Dropdown from '../../component/login/DropDown';
import '../../styles/login/AddInfoPage.scss';
import NoProfile from '../../assets/Login/NoProfile.png';
import styled from 'styled-components';
import { locations } from '../../data/location';

const AddInfoPage = () => {
    // 프로필 이미지 등록
    const [imageUrl, setImageUrl] = useState(null);
    const [view, setView] = useState(false); 
    const imgRef = useRef();

    // 주소 찾기 및 등록
    const [searchItem, setSearchItem] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState('');

    const onChangeImage = () => {
        const reader = new FileReader();
        const file = imgRef.current.files[0];
        console.log(file);

        reader.readAsDataURL(file);
        reader.onloadend = () => {
        setImageUrl(reader.result);
        console.log("이미지주소", reader.result);
        };
    };

    const onClickFileBtn = () => {
        imgRef.current.click();
    };

    const onClickDefaultImage = () => {
        setImageUrl(null);
    }

    return (
      <div className="AddInfo_Container">
        <div className="AddInfo_Wrapper">
          <div className="AddInfo_TopText">추가 정보 입력</div>
          {/* 프로필 이미지 등록 및 해제 */}
          <div className="AddInfo_ImageWraaper">
            <img
              src={imageUrl ? imageUrl : NoProfile}
              className="AddInfo_Image"
            />
            <input
              type="file"
              ref={imgRef}
              onChange={onChangeImage}
              style={{ display: 'none' }}
            />
            <div
              onClick={() => {
                setView(!view);
              }}
              className="AddInfo_ImageBtn"
            >
              <div className="AddInfo_ImageBtn_Text">
                프로필 등록 {view ? '▲' : '▼'}
              </div>
              {view && (
                <Dropdown
                  onClickFileBtn={onClickFileBtn}
                  onClickDefaultImage={onClickDefaultImage}
                />
              )}
            </div>
          </div>
          <div className="AddInfo_Dropdown_Wrapper">
            <div className="AddInfo_Dropdown_Text">거주지</div>
            <input
              type="text"
              onChange={(e) => setSearchItem(e.target.value)}
              className="AddInfo_Dropdown_Box"
              onClick={() => {
                isOpen ? setIsOpen(false) : setIsOpen(true);
              }}
              value={searchItem}
            />
            {isOpen ? (
              <div className="AddInfo_SelectWrapper">
                {locations
                  .filter((data) => {
                    if (searchItem == '') {
                      return data;
                    } else if (
                      data.toLowerCase().includes(searchItem.toLowerCase())
                    ) {
                      return data;
                    }
                  })
                  .map((data) => {
                    return (
                      <div
                        key={data}
                        onClick={() => {
                          setItem(data);
                          setIsOpen(false);
                          setSearchItem(data);
                        }}
                        className="AddInfo_SelectOptions"
                      >
                        {data}
                      </div>
                    );
                  })}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
};

export default AddInfoPage;