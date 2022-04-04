import React from 'react'


const PokemonThumb = ({ data, image, visible, setShowModal }) => {



    const style = data.types[0].type.name + " thumb-container";



    return (
        <div className={style} onClick={(e) => { e.stopPropagation(); setShowModal(data.id) }}>
            <img src={image} alt={data.name} />
            <div className="detail-wrapper">
                <h3>{data.name}</h3>
                <small>Height: {data.height}</small>
                <small>Weight: {data.weight}</small>
                <ul><span>Abilities:</span> {
                    data.abilities.map((abilitiesVal, abilitiesKey) => {
                        return <li key={abilitiesKey}>{abilitiesVal.ability.name}</li>
                    })
                }</ul>
            </div>

        </div>
    )
}

export default PokemonThumb
