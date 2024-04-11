import { useState, Fragment } from 'react';
import '../../styles/component/common/SelectLocation.scss';

import SelectLocation from '../../components/common/SelectLocation';
import { locations } from '../../data/location';

const TestPage = () => {
  const [formData, setFormData] = useState({
    locationOne: {
      value: '',
      error: '',
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();

    let errors = {};
    for (let key in formData) {
      if (formData[key].value === '') {
        errors[key] = '거주지를 입력해주세요.';
      }
    }

    if (Object.keys(errors).length === 0) {
      console.log(formData.locationOne.value);
      console.log('submit form...');
    } else {
      setFormData((prev) => {
        let data = {};
        for (let key in errors) {
          data[key] = {
            ...prev[key],
            error: errors[key],
          };
        }

        return {
          ...prev,
          ...data,
        };
      });
    }
  };

  const changeHandler = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: {
        value,
        error: value !== '' ? '' : prev[name].error,
      },
    }));
  };

  return (
    <Fragment>
      <div className="container">
        <form className="form" onSubmit={submitHandler}>
          <SelectLocation
            label="거주지"
            searchPlaceholder="Search"
            data={locations}
            value={formData.locationOne.value}
            onChange={changeHandler}
            error={formData.locationOne.error}
            name="countryOne"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default TestPage;
