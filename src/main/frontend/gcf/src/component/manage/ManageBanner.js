import './ManageBanner.css';
import SideMenu from './ManageSideMenu';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BannerModule({ moduleId, onAddInput, onRemoveInput, onInputChange, inputs }) {
  const handleFileChange = (moduleId, index, event) => {
    const files = Array.from(event.target.files); // 파일 객체 배열로 변환
    onInputChange(moduleId, index, { attachment: files, link: inputs[index].link });
  };

  return (
    <div className='banner_item'>
      <p>배너 {moduleId}</p>
      {inputs.map((input, index) => (
        <div key={index} className="input_row">
          <div className="input_group">
            <ul>
              <li className='input_title'><p>첨부 파일 {index + 1} :</p></li>
              <li className='input_title'><p>파일 {index + 1} 링크 :</p></li>
            </ul>
            <ul>
              <li className='input_detail'>
                <div className="form__input--file_wrap">
                  <input
                    className="form__input--file"
                    id={`upload${moduleId}_${index}`} // 고유한 ID 부여
                    type="file"
                    multiple
                    style={{ display: "none" }}
                    onChange={e => handleFileChange(moduleId, index, e)} // 모듈 ID 전달
                  />
                  <span className="form__span--file">{input.attachment.length > 0 ? input.attachment.map(file => file.name).join(', ') : '선택된 파일이 없습니다.'}</span>
                  <label className="form__label--file" htmlFor={`upload${moduleId}_${index}`}>파일선택</label>
                </div>
              </li>
              <li className='input_detail'>
                <input
                  type='text'
                  className='input_link'
                  value={input.link}
                  onChange={e => onInputChange(moduleId, index, { attachment: input.attachment, link: e.target.value })} // 모듈 ID 전달
                  placeholder={`링크를 입력하세요`}
                />
                {inputs.length > 1 && (
                  <button className='minus' onClick={() => onRemoveInput(moduleId, index)}>-</button>
                )}
                <button className='plus' onClick={onAddInput}>+</button>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function sendBannerData(modules) {
  const formData = new FormData();

  modules.forEach((module, moduleIndex) => {
    const entityId = module.id === 1 ? 'bannerone' : 'bannertwo'; // Assigning entity IDs based on module ID
    formData.append(`modules[${moduleIndex}].entityId`, entityId); // Appending entity ID to differentiate between bannerone and bannertwo
    module.inputs.forEach((input, inputIndex) => {
      input.attachment.forEach((file, fileIndex) => {
        formData.append(`modules[${moduleIndex}].inputs[${inputIndex}].attachment`, file);
      });
      formData.append(`modules[${moduleIndex}].inputs[${inputIndex}].link`, input.link);
    });
  });

  // FormData 출력
  for (const pair of formData.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
  }

  // Axios를 사용하여 POST 요청을 보냅니다.
  axios.post('http://localhost:8090/manage/updateBanners', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => {
      console.log('배너 데이터가 성공적으로 전송되었습니다.');
      // 서버로부터 응답을 받은 후 추가적인 처리를 수행할 수 있습니다.
    })
    .catch(error => {
      console.error('배너 데이터 전송 중 오류가 발생했습니다:', error);
      // 오류 처리를 수행할 수 있습니다.
    });
}



function ManageBanner() {
  const [modules, setModules] = useState([
    { id: 1, inputs: [{ attachment: [], link: '' }, { attachment: [], link: '' }] },
    { id: 2, inputs: [{ attachment: [], link: '' }, { attachment: [], link: '' }] }
  ]);

  const addInput = moduleId => {
    setModules(prevModules =>
      prevModules.map(module =>
        module.id === moduleId ? { ...module, inputs: [...module.inputs, { attachment: [], link: '' }] } : module
      )
    );
  };

  const removeInput = (moduleId, indexToRemove) => {
    setModules(prevModules =>
      prevModules.map(module =>
        module.id === moduleId
          ? {
            ...module,
            inputs: module.inputs.filter((_, index) => index !== indexToRemove)
          }
          : module
      )
    );
  };

  const handleInputChange = (moduleId, index, value) => {
    setModules(prevModules =>
      prevModules.map(module =>
        module.id === moduleId
          ? {
            ...module,
            inputs: module.inputs.map((input, i) => (i === index ? value : input))
          }
          : module
      )
    );
  };

  useEffect(() => {
    console.log("modules state updated: ", modules);
  }, [modules]);

  return (
    <div className='banner_container'>
      <SideMenu />
      <div className='banner'>
        <p>배너 및 홈 화면 관리</p>
        <div className='banner_area'>
          {modules.map(module => (
            <BannerModule
              key={module.id}
              moduleId={module.id}
              inputs={module.inputs}
              onAddInput={() => addInput(module.id)}
              onRemoveInput={(moduleId, index) => removeInput(moduleId, index)}
              onInputChange={(moduleId, index, value) => handleInputChange(moduleId, index, value)}
            />
          ))}
        </div>
        <button className='banner_confirm' onClick={() => sendBannerData(modules)}>저장</button>
      </div>
    </div>
  );
}

export default ManageBanner;
