import '../../styles/login/AddInfoPage.scss';

const LoginInput = ({ type, nickname, introduce, setNickname, setIntroduce}) => {
  const onChangeValue = (e) => {
    switch(type) {
        case '닉네임':
            setNickname(e.target.value);
            break;
        case '한 줄 소개':
            setIntroduce(e.target.value);
            break;
    }
  };
  return (
    <>
      <div className="AddInfo_LoginInput_Wrapper">
        <div className="AddInfo_LoginInput_Text">{type}</div>
        <input 
            type="text" 
            className="AddInfo_LoginInput_InputBox" 
            onChange={onChangeValue}
            value={type === '닉네임' ? nickname : introduce}
        />
      </div>
    </>
  );
};

export default LoginInput;