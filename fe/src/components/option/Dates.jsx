import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setKakeibo } from '../../Store/kakeiboSlice';
import { setDateId } from '../../Store/dateId';

function Dates() {
    const [screenYear, setScreenYear] = useState('');
    const [screenMonth, setScreenMonth] = useState('');
  
    const datas = useSelector((state) => state.kakeibo.value);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() +1;
    const dispatch = useDispatch();


    const getData = async() => {
        await fetch(`http://localhost:3000/kekibo/get`)
        .then((res) => res.json())
        .then(kakeiboData => dispatch(setKakeibo(kakeiboData)))
        .catch(err => console.log(err))
      };

      const firstPost = async() => {
        if (datas.dataExists === 'false') {
          fetch(`http://localhost:3000/kakeibo/post`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                year: currentYear,
                month: currentMonth
            })
        })
        .then((res) => res.json())
        .then(data => dispatch(setKakeibo(data)))
        .catch(err => console.log(err));
        }
      };
    
      useEffect(() => {
        setScreenYear(currentYear);
        setScreenMonth(currentMonth);
        getData();
      }, []);
      
      useEffect(() => {
        firstPost();
      if (datas.dataExists !== 'false') {
        dispatch(setDateId((datas.find((item) => item.year === JSON.stringify(screenYear) && item.month === JSON.stringify(screenMonth)))))
      }}, [getData]);


      const comebackMonth = async() => {
        //前の月を取得
        let beforeMonth = screenMonth - 1;
        //前の月は現在の月から四ヶ月前までとする
        if (currentMonth - 5 === beforeMonth){
          alert('現在の月から四ヶ月前までしか表示できません');
          return
        }; 
        //前の月が０になった時の処理
        if (beforeMonth === 0) {
          setScreenYear(screenYear - 1);
          setScreenMonth(12);
          beforeMonth = 12;
        };
        //前の月がデータベースのあるか確認。あったら表示。なかったら作成して表示
        const nowYear = datas.filter((item) => item.year === JSON.stringify(currentYear));
        const checkBeforeMonth = nowYear.find((item) => item.month === JSON.stringify(beforeMonth));
        if (checkBeforeMonth) {
          setScreenMonth(parseInt(checkBeforeMonth.month));
        } else {
          await fetch(`http://localhost:3000/kakeibo/post`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                year: screenYear,
                month: beforeMonth
            })
        })
        setScreenMonth(parseInt(beforeMonth));
      }
      getData();
      };
    

      const nextMonth = () => {
        //次の月を取得
        let nextMonth = parseInt(screenMonth) + 1;
        //現在の月より先には進めないようにする
        if (currentMonth + 1 === nextMonth) {
          alert('現在の月より先へ移動できません');
          return
        };
        //次の月が13になった時の処理
        if (nextMonth === 13) {
          setScreenYear(screenYear + 1);
          setScreenMonth(1);
          nextMonth = 1;
          getData();
          return
        };
        //次の月を表示
        setScreenMonth(nextMonth);
        getData();
      };

  return (
    <div>
        <div>
            <button onClick={comebackMonth}>前の月へ</button>
            <h2>{screenYear}年{screenMonth}月</h2>
            <button onClick={nextMonth}>次の月へ</button>
        </div>
    </div>
  )
}

export default Dates;
