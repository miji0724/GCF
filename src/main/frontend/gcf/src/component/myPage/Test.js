import React, { useState, useEffect } from 'react';
import './Test.css';

function EducationItem({ id, name, onDelete, onAddSubItem, onDeleteSubItem, isParent }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", width: "500px", height: "40px", marginTop: "10px" }}>
        {isParent && (
            <>
                {/* 상위 항목 */}
                <p>{name}</p>
                <p style={{ marginRight: "10px" }}>강</p>
                <input type="text" value={text} onChange={handleTextChange} style={{ marginRight: "10px" }} />
                <button onClick={onAddSubItem} style={{
                    marginRight: "10px"
                    , width: "30px"
                    , height: "30px"
                    , marginRight: "10px"
                    , backgroundColor: "#EDEDED"
                }}>+</button>{/* 하위 추가 */}
                <button onClick={onDeleteSubItem} style={{
                    width: "30px"
                    , height: "30px"
                    , marginRight: "10px"
                    , backgroundColor: "#FF8585"
                }}>-</button>{/* 하위 제거 */}
            </>
        )}
        {!isParent && (
            <>
                {/* 하위 항목 */}
                <p style={{ marginLeft: "10px", marginRight: "10px" }}>{name}</p>
                <input type="text" value={text} onChange={handleTextChange} style={{ marginRight: "10px" }} />
                <input type="file" onChange={handleFileChange} style={{ backgroundColor: "rgba(0, 0, 0, 0)" }} />
            </>
        )}
    </div>
);
}

function App() {
  const [items, setItems] = useState([]);
  const [parentCounter, setParentCounter] = useState(1);
  const [subCounters, setSubCounters] = useState({}); // 각 상위 항목의 하위 항목 카운터를 저장하는 객체

  const handleAddItem = () => {
    const newItemId = parentCounter;
    const newItem = {
      id: newItemId,
      name: `${newItemId}`,
      subItems: [],
    };
    setItems([...items, newItem]);
    setParentCounter(parentCounter + 1);
  };

  const handleAddSubItem = (parentId) => {
    const newSubItemId = (subCounters[parentId] || 0) + 1; // 현재 하위 항목의 카운터
    const newSubItem = {
      id: `${parentId}-${newSubItemId}`, // 부모 항목 ID와 하위 항목 일련번호를 조합하여 생성
      name: `${parentId}-${newSubItemId}`,
    };
    const updatedItems = items.map(item => {
      if (item.id === parentId) {
        return {
          ...item,
          subItems: [...item.subItems, newSubItem],
        };
      }
      return item;
    });
    setItems(updatedItems);
    setSubCounters({
      ...subCounters,
      [parentId]: newSubItemId,
    });
  };

  const handleDeleteItem = () => {
    const maxId = Math.max(...items.map(item => item.id));
    const updatedItems = items.filter(item => item.id !== maxId);
    setItems(updatedItems);
    setParentCounter(parentCounter - 1);
    if (parentCounter < 1) {
        setParentCounter(0);
    }
};

const handleDeleteSubItem = (parentId) => {
    const maxId = Math.max(...items.find(item => item.id === parentId).subItems.map(subItem => parseInt(subItem.id.split('-')[1])));
    const updatedItems = items.map(item => {
        if (item.id === parentId) {
            const newSubItems = item.subItems.filter(subItem => parseInt(subItem.id.split('-')[1]) !== maxId);
            return {
                ...item,
                subItems: newSubItems,
            };
        }
        return item;
    });
    setItems(updatedItems);
    setSubCounters({
        ...subCounters,
        [parentId]: maxId - 1,
    });
    if (subCounters[parentId] < 1) { // parentId의 하위 항목 개수가 1보다 작을 때
        setSubCounters({
            ...subCounters,
            [parentId]: 0,
        });
    }
};


  return (
    <div className='trainList_area'>
    {items.map(item => (
        <div className='trainList_left' >
            <div key={item.id} className="education-item-wrapper">
                <EducationItem
                    id={item.id}
                    name={item.name}
                    onDelete={() => handleDeleteItem(item.id)}
                    onAddSubItem={() => handleAddSubItem(item.id)}
                    onDeleteSubItem={() => handleDeleteSubItem(item.id)}
                    isParent={true}
                />
                {item.subItems.map(subItem => (
                    <div key={subItem.id} className="sub-education-item-wrapper">
                        <EducationItem
                            id={subItem.id}
                            name={subItem.name}
                            onDeleteSubItem={() => handleDeleteSubItem(item.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
      ))}
      <button onClick={handleAddItem} style={{ float: "right", clear: "both" }}>상위 추가</button>
      <button onClick={handleDeleteItem} style={{ float: "right", clear: "both", marginRight: "10px" }}>상위 제거</button>
    </div>
  );
}

export default App;