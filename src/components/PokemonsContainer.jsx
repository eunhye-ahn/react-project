import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import { formatPokemonData } from "../utils/pokemon-helper";
import Loader from "./Loader";
import TypesBar from "./TypesBar";

// type을 props로 전달 받도록 합니다
const PokemonsContainer = ({type}) => {
  // 포켓몬 리스트 상태관리
  const [pokemons,setPokemons] = useState([]);
  // loading 상태 관리
  const [loading,setLoading] = useState(true);

  const fetchPokemons = async () => {
    /*  선택된 포켓몬 타입으로 해당 타입을 가진 포켓몬 데이터를 불러오는 API */
    // example types dragon, normal , fighting, flying
    const API_END_POINT = `https://pokeapi.co/api/v2/type/${type}`;
    try{
      const response = await fetch(API_END_POINT);
      const data = await response.json();
      
      const formattedPokemons = data.pokemon.map((p) => 
        formatPokemonData(p.pokemon)
      );
      setPokemons(formattedPokemons);
    }catch(error){
      console.error("해당 타입 포켓몬을 불러오지 못함",error);
      setLoading(false);

    }finally{
      setLoading(false);

    }

    // API 응답에서 pokemon 리스트를 가져오고 리스트 내부의 pokemon 요소를 이용하여 detail 정보를 담은 리스트를 생성합니다.
    // 노션 참조

    /**
     * javascript array의 map을 사용하여 pokemon들의 데이터를
     * 포켓몬 데이터 포멧(정규화 작업)을 위해서는
     * @formatPokemonData 함수를 사용하세요.
     * ../utils/pokemon-helper.js 에서 확인하세요.
     */
  };

  useEffect(()=>{
    fetchPokemons();
}
  ,[type])

  // API를 호출하는 동안 로더 컴포넌트를 보여줍니다.
  // <Loader/>

  return (
    <div className="pokemons-container">
      {/* 포켓몬 카드리스트를 상태로 관리하고 리스트 렌더링 해봅시다 */}
      
      {loading ? <Loader/> :
      (
      pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      )))}
    </div>
  );
};

export default PokemonsContainer;
