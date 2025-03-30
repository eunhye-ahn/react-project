import {useState, useEffect} from 'react';
import { getTypeIconSrc } from "../utils/pokemon-helper";

// API로 포켓몬 타입을 받아온 후, 화면에 타입들을 보여주는 컴포넌트 입니다.
// 함수를 props로 받아와서 App.jsx의 type 상태를 바꿔봅시다.
const TypesBar = ({toggleType}) => {

  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>
    {
      const fetchTypes = async () => {
        const API_END_POINT = `https://pokeapi.co/api/v2/type/`;
        const res = await fetch(API_END_POINT); //데이터 저장
        const {results} = await res.json(); //문자열->데이터
        setTypes(
          results.filter(({name})=>
            name !== 'unknown' && name !== 'shadow' && name !== 'stellar'
          )
        );
      };
      fetchTypes();
    },[]);

    // API의 Response를 확인하고자 한다면 엔드포인트를 복사한 후, 브라우저에 붙여넣어보세요!
    /*  모든 포켓몬 타입들을 불러오는 API   */

    /**
     * 
     *
     * 반환된 타입 데이터를 보면 몇가지 필요하지 않은 타입들이 있습니다.
     * 아래 필터 조건을 적용하여 필요한 타입만 남기세요.
     *
     * name !== 'unknown' && name !== 'shadow' && name !== 'stellar'
     *
     * hint: filter 함수를 사용하세요.
     */

  // App.css에서 types-bar 스타일을 완성해주세요
        /* API로 받아온 type 리스트를 상태로 관리하고, 그 상태를 기반으로 리스트 렌더링을 구현해주세요 */
      /* type의 이름을 넣으면 해당 타입의 이미지 source를 return하는 getTypeIconSrc를 사용해서 구현해주세요 */
  
 
  return (
    <nav className="types-bar">
        {types.map(({name}) => (
          <a key={name} className={name} 
          onClick={()=>toggleType(name)}>
            <img src={getTypeIconSrc(name)} alt="포켓몬타입" />
          </a>
        ))
      }
    </nav>
);

};
export default TypesBar;

          // a 태그의 배경은 App.css의 .dragon 과 같이 타입별 background를 사용합니다.

