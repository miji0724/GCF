import './ManageBanner.css';
import SideMenu from './ManageSideMenu';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
                    id={`upload${moduleId}_${index}`}
                    type="file"
                    accept="image/*" // 이미지 파일만 허용
                    multiple
                    style={{ display: "none" }}
                    onChange={e => handleFileChange(moduleId, index, e)}
                  />
                  <span className="form__span--file">{input.attachment.length > 0 ? input.attachment.map(file => file.name).join(', ') : '이미지 파일만 업로드 바랍니다.'}</span>
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

function sendBannerData(modules, setLoading) {
  // 빈 칸이 있는지 확인하는 변수
  let isEmpty = false;

  // 모든 모듈 및 입력에 대해 빈 칸 여부를 확인합니다.
  modules.forEach((module, moduleIndex) => {
    module.inputs.forEach((input, inputIndex) => {
      // 첨부 파일 또는 링크 중 하나라도 비어 있으면 isEmpty를 true로 설정합니다.
      if (input.attachment.length === 0 || input.link.trim() === '') {
        isEmpty = true;
      }
    });
  });

  // 빈 칸이 있을 경우 경고창을 띄웁니다.
  if (isEmpty) {
    alert('빈 칸을 모두 작성해주세요.');
    return;
  }

  // 빈 칸이 없으면 FormData를 만들어서 서버로 데이터를 전송합니다.
  const formData = new FormData();

  modules.forEach((module, moduleIndex) => {
    const entityId = module.id === 1 ? 'bannerone' : 'bannertwo';
    formData.append(`modules[${moduleIndex}].entityId`, entityId);
    module.inputs.forEach((input, inputIndex) => {
      input.attachment.forEach((file, fileIndex) => {
        formData.append(`modules[${moduleIndex}].inputs[${inputIndex}].attachment`, file);
      });
      formData.append(`modules[${moduleIndex}].inputs[${inputIndex}].link`, input.link);
    });
  });

  // 전송 중임을 사용자에게 알립니다.
  setLoading(true);

  axios.post('http://localhost:8090/manage/updateBanners', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => {
      console.log('배너 데이터가 성공적으로 전송되었습니다.');
      alert('배너 데이터가 성공적으로 업데이트되었습니다.');
      setLoading(false); // 전송 완료 후 로딩 상태 변경
    })
    .catch(error => {
      console.error('배너 데이터 전송 중 오류가 발생했습니다:', error);
      setLoading(false); // 오류 발생 후 로딩 상태 변경
    });
}

function ManageBanner() {
  const initialInputs = { attachment: [], link: '' };
  const initialModules = [
    { id: 1, inputs: [initialInputs, initialInputs] },
    { id: 2, inputs: [initialInputs, initialInputs] }
  ];
  const [modules, setModules] = useState(initialModules);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); //뒤로가기
  };

  const addInput = moduleId => {
    setModules(prevModules =>
      prevModules.map(module =>
        module.id === moduleId ? { ...module, inputs: [...module.inputs, { ...initialInputs }] } : module
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

  const resetInputs = () => {
    setModules(initialModules);
  };

  useEffect(() => {
    console.log("modules state updated: ", modules);
  }, [modules]);

  useEffect(() => {
    resetInputs(); // 컴포넌트가 처음 렌더링될 때 초기화 함수 호출
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

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
              onRemoveInput={(moduleId, index) => removeInput(module.id, index)}
              onInputChange={(moduleId, index, value) => handleInputChange(moduleId, index, value)}
            />
          ))}
        </div>
        {loading ? (
          <p>전송 중입니다. 잠시 기다려주세요...</p>
        ) : (
          <div>
          <button className='banner_confirm' onClick={() => sendBannerData(modules, setLoading)}>저장</button>
          <button className='banner_cancel' onClick={handleBack}>취소</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageBanner;

