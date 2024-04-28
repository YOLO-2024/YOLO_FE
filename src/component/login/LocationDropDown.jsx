import { useState } from 'react';
import styled from 'styled-components';
import { locations } from '../../data/location';
import { useEffect } from 'react';

const activeBorderRadius = '8px 8px 0 0';
const inactiveBorderRadius = '8px 8px 8px 8px';

const WholeBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 349px;
  margin: 0 auto;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 321px;
  padding: 16px;
  border: none;
  border-radius: ${(props) =>
    props.isHaveInputValue ? activeBorderRadius : inactiveBorderRadius};
  z-index: 3;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  flex: 1 0 0;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
`;

const DeleteButton = styled.div`
  cursor: pointer;
`;

const DropDownBox = styled.ul`
  display: flex;
  flex-direction: column;

  margin: 0 auto;

  width: 349px;
  max-height: 293px;

  overflow-y: scroll;

  padding: 0;
  background-color: white;

  border: none;
  border-radius: 0 0 16px 16px;

  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  list-style-type: none;
`;

const DropDownItem = styled.li`
  display: flex;
  height: 52px;
  flex-shrink: 0;
  align-items: center;
  padding: 0 16px;

  border-top: 1px solid lightgray;

  &.selected {
    background-color: lightgray;
  }
`;

const LocationDropDown = ({ location, setLocation }) => {
  const [isHaveInputValue, setIsHaveInputValue] = useState(false);
  const [dropDownList, setDropDownList] = useState(locations);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);

  const showDropDownList = () => {
    if (location === '') {
      setIsHaveInputValue(false);
      setDropDownList([]);
    } else {
      const choosenTextList = locations.filter((textItem) =>
        textItem.includes(location),
      );
      setDropDownList(choosenTextList);
    }
  };

  const changeInputValue = (event) => {
    setLocation(event.target.value);
    setIsHaveInputValue(true);
  };

  const clickDropDownItem = (clickedItem) => {
    setLocation(clickedItem);
    setIsHaveInputValue(false);
  };

  const handleDropDownKey = (event) => {
    //input에 값이 있을때만 작동
    if (isHaveInputValue) {
      if (
        event.key === 'ArrowDown' &&
        dropDownList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1);
      }

      if (event.key === 'ArrowUp' && dropDownItemIndex >= 0)
        setDropDownItemIndex(dropDownItemIndex - 1);
      if (event.key === 'Enter' && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex]);
        setDropDownItemIndex(-1);
      }
    }
  };

  useEffect(showDropDownList, [location]);
  return (
    <WholeBox>
      <div style={{ marginLeft: '8px', color : 'darkgray'}}>거주지</div>
      <InputBox isHaveInputValue={isHaveInputValue}>
        <Input
          type="text"
          value={location}
          onChange={changeInputValue}
          onKeyUp={handleDropDownKey}
        />
        <DeleteButton onClick={() => setLocation('')}>&times;</DeleteButton>
      </InputBox>
      {isHaveInputValue && (
        <DropDownBox>
          {dropDownList.length === 0 && (
            <DropDownItem>해당 주소가 없습니다</DropDownItem>
          )}
          {dropDownList.map((dropDownItem, dropDownIndex) => {
            return (
              <DropDownItem
                key={dropDownIndex}
                onClick={() => clickDropDownItem(dropDownItem)}
                onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                className={
                  dropDownItemIndex === dropDownIndex ? 'selected' : ''
                }
              >
                {dropDownItem}
              </DropDownItem>
            );
          })}
        </DropDownBox>
      )}
    </WholeBox>
  );
};

export default LocationDropDown;