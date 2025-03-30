import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import { formatPokemonData } from "../utils/pokemon-helper";
import Loader from "./Loader";
import TypesBar from "./TypesBar";


const PokemonsContainer = ({type}) => {

  const [pokemons,setPokemons] = useState([]);
  const [loading,setLoading] = useState(true);


  //이 함수는 API에서 데이터를 가져오고 pokemons 상태를 업데이트하는 역할을 합니다.
  useEffect(()=>{
    const fetchPokemons = async () =>{

      setLoading(true);
      const API_END_POINT = `https://pokeapi.co/api/v2/type/${type}`;
      const res = await fetch(API_END_POINT); //문자열 받아오기
      const {pokemon : pokemonList} = await res.json(); //데이터로 바꾸기
  

      const pokemons = await Promise.all( //해당 타입 포켓몬의 개인 상세정보
        pokemonList.map(async ({pokemon})=> {
          const res = await fetch(pokemon.url); //상세데이터 요청
          const data = await res.json(); //json으로 변환

          return formatPokemonData(data);
        })

      )

      setLoading(false);
      return setPokemons(pokemons);
    }
    fetchPokemons();


  },[type]);

  if (loading) {
    return <Loader/>;
  }


  return (
    <div className="pokemons-container">
      {pokemons.map((pokemon)=>(
        <PokemonCard key={pokemon.id} pokemon={pokemon}/>
      ))}
    </div>
  );
};

export default PokemonsContainer;
