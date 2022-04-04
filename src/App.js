import React from 'react'
import PokemonThumb from './components/PokemonThumb'


const App = () => {
  const [showModal, setShowModal] = React.useState(false)


  const [allPokemons, setAllPokemons] = React.useState([])
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


  React.useEffect(() => {
    getAllPokemons()
  }, [])


  return (
    <div className="app-contaner">

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

      </div>
    </div >
  );
}

export default App;
