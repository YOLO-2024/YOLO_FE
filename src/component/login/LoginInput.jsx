import '../../styles/login/AddInfoPage.scss';

const LoginInput = ({ type, value, setValue }) => {
  const onChangeValue = (e) => {
    setValue(e.target.value);
  };

  console.log(value);
  return (
    <div className="AddInfo_LoginInput_Wrapper">
      <div className="AddInfo_LoginInput_Text">{type}</div>
      <input
        type="text"
        className="AddInfo_LoginInput_InputBox"
        onChange={onChangeValue}
        defaultValue={value}
      />
    </div>
  );
};

export default LoginInput;
