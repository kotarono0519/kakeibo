import React, { useEffect, useState } from 'react';
import Graph from '../option/Graph';
import Dates from '../option/Dates';
import { useDispatch, useSelector } from 'react-redux';
import { setKakeibo } from '../../Store/kakeiboSlice';


function KakeiboForm() {
  const [inputData, setInputData] = useState('');
  const datas = useSelector((state) => state.kakeibo.value);
  const nowData = useSelector((state) => state.dateId.value);
  const dispatch = useDispatch();

  const getData = async() => {
    await fetch(`http://localhost:3000/kekibo/get`)
    .then((res) => res.json())
    .then(kakeiboData => dispatch(setKakeibo(kakeiboData)))
    .catch(err => console.log(err))
  };

  const handleInputChange = (event) => {
      setInputData(event.target.value);
    };
  
    const handleSubmit = async() => {
      await fetch('http://localhost:3000/kekibo/put', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify ({
          id: JSON.stringify(nowData.id),
          data: inputData,
        })
      })
      .then((res) => res.json())
      .then(kakeiboData => dispatch(setKakeibo(kakeiboData)))
      .catch((err) => console.log(err))
      getData();
    };

  return (
    <div>
      <h1>家計簿</h1>
      <Dates />
      <Graph />
      <h4>{nowData ? nowData.month : ''}月の金額を記入</h4>
      <input type='number' value={inputData} placeholder="万円" onChange={handleInputChange} />
      <button onClick={handleSubmit}>万円</button>
    </div>
  )
};

export default KakeiboForm;
