import React from 'react'
import PokemonThumb from './components/PokemonThumb'
import { Select } from 'antd';

const { Option } = Select;

const App = () => {
  const [showModal, setShowModal] = React.useState(false)


  const [allPokemons, setAllPokemons] = React.useState([])
  const [searchItem, setsearchItem] = React.useState([])
  const [loadMore, setLoadMore] = React.useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)

    function createPokemonObject(results) {
      results.forEach(async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()
        setAllPokemons(currentList => [...currentList, data])
        await allPokemons.sort((a, b) => a.id - b.id)
      })
    }
    createPokemonObject(data.results)
  }
  function sortPokemon(e) {
    let dupPokemon = [...allPokemons]
    if (e === "height" || e === "weight") {
      dupPokemon.sort((a, b) => a[e] - b[e])
    } else {
      dupPokemon.sort((a, b) => {
        if (a["name"] < b["name"]) { return -1; }
        if (a["name"] > b["name"]) { return 1; }
        return 0;
      })
    }
    setAllPokemons(dupPokemon)

  }

  React.useEffect(() => {
    getAllPokemons()
  }, [])


  return (
    <div className="app-contaner">
      <div className='functioanloty'>
        <div className='search'>
          <form onSubmit={async (e) => {
            e.preventDefault(); e.stopPropagation()

            try {
              const results = await Promise.allSettled(
                [
                  fetch(`https://pokeapi.co/api/v2/pokemon/${searchItem.toLocaleLowerCase()}`).then((response) => response.json()),
                  fetch(`https://pokeapi.co/api/v2/ability/${searchItem.toLocaleLowerCase()}`).then((response) => response.json()),

                ]);
              let filteredVal = results.filter((e) => {
                return e.status === "fulfilled"
              })
              if (filteredVal[0].value.sprites) {
                setAllPokemons([filteredVal[0].value]);
              }
              else {
                setAllPokemons([])
                filteredVal[0].value.pokemon.forEach(async pokemon => {
                  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon.name}`)
                  const data = await res.json()
                  setAllPokemons(currentList => [...currentList, data])
                })

              }

            } catch (error) {
              // console.error(error);
            }




          }}>
            <h1>Search</h1>
            <input value={searchItem} onChange={(e) => {
              setsearchItem(e.target.value)
            }}></input>
            <button type='submit'>Submit</button>
          </form>
        </div>
        <div className='sort'>
          <h1>Sort</h1>
          <Select style={{ width: 120 }} onChange={(e) => { sortPokemon(e) }}>
            <Option value="name">Name</Option>
            <Option value="height">Height</Option>
            <Option value="weight">Weight</Option>

          </Select>
        </div>
      </div>

      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemonStats, index) =>
            <PokemonThumb
              setShowModal={(e) => { setShowModal(e) }}
              visible={showModal == pokemonStats.id}
              data={pokemonStats}
              key={index}
              // id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
            // name={pokemonStats.name}
            />)}

        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>Load more</button>
      </div>
    </div >
  );
}

export default App;
