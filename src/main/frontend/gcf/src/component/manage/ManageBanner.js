import './ManageBanner.css';
import SideMenu from './ManageSideMenu';
import React, { useState } from 'react';
import axios from 'axios';

function BannerModule({ moduleId, onAddInput, onRemoveInput, onInputChange, inputs }) {
  const handleFileChange = (moduleId, index, event) => {
    const files = event.target.files;
    const fileNames = Array.from(files).map(file => file.name);
    onInputChange(moduleId, index, { attachment: fileNames, link: inputs[index].link });
  };

  return (
    <div className='banner_item'>
      {/* 배너 제목 */}
      <p>배너 {moduleId}</p>
      {/* 입력칸들 렌더링 */}
      {inputs.map((input, index) => (
        <div key={index} className="input_row">
          {/* 첨부 파일 입력 */}
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
                  <span className="form__span--file">{input.attachment.length > 0 ? input.attachment.join(', ') : '선택된 파일이 없습니다.'}</span>
                  <label className="form__label--file" htmlFor={`upload${moduleId}_${index}`}>파일선택</label>
                </div>
              </li>
              <li className='input_detail'>{/* 링크 입력, 추가 버튼, 제거 버튼 */}
                <input
                  type='text'
                  className='input_link'
                  value={input.link}
                  onChange={e => onInputChange(moduleId, index, { attachment: input.attachment, link: e.target.value })} // 모듈 ID 전달
                  placeholder={`링크를 입력하세요`}
                />
                {/* 삭제 버튼은 1개 있을 때만 비활성화 */}
                {inputs.length > 1 && (
                  <button className='minus' onClick={() => onRemoveInput(moduleId, index)}>-</button>
                )}
                <button className='plus' onClick={onAddInput}>+</button>
              </li>
            </ul>
          </div>
        </div>
      ))}
      {/* + 버튼은 언제나 있음 */}

    </div>
  );
}

function sendBannerData(modules) {
  // 각 모듈의 링크와 첨부 파일만을 추출하여 새로운 객체로 생성
  const dataToSend = modules.map(module => ({
    id: module.id,
    inputs: module.inputs.map(input => ({
      attachment: input.attachment,
      link: input.link
    }))
  }));

  // 새로운 객체를 백엔드로 전송
  axios.post('http://localhost:8090/manage/updateBanners', dataToSend)
    .then(response => {
      console.log('Data sent successfully:', response.data);
      console.log("Data to send: ", dataToSend);
    })
    .catch(error => {
      console.error('Error sending data to backend:', error);
      console.log("Data to send: ", dataToSend);
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
    console.log("modules after adding input: ", modules);
  };
  

  // 입력칸 제거 함수
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

  // 입력값 변경 함수
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

  return (
    <div className='banner_container'>
      <SideMenu />
      <div className='banner'>
        <p>배너 및 홈 화면 관리</p>
        <div className='banner_area'>
          {/* 모듈들 렌더링 */}
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
        <button className='banner_confirm' onClick={sendBannerData}>저장</button>
      </div>
    </div>
  );
}

export default ManageBanner;
