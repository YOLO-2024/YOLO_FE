function Dropdown({ onClickFileBtn, onClickDefaultImage}) {
  return (
    <>
      <div
        onClick={onClickDefaultImage}
        style={{
          marginTop: '9px',
          marginBottom: '9px',
        }}
      >
        기본 이미지
      </div>
      <div
        onClick={onClickFileBtn}
        style={{
          marginBottom: '9px',
        }}
      >
        이미지 선택
      </div>
    </>
  );
}

export default Dropdown;
