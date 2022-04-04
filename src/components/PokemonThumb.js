import React from 'react'
import { Modal } from 'antd';

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
            <Modal footer={null} title={data.name} visible={visible} onCancel={(e) => { e.stopPropagation(); setShowModal(false) }} onOk={(e) => { e.stopPropagation(); setShowModal(false) }}>
                <p><span style={{ textDecoration: "underline" }}>Base Experience</span>: {data.base_experience}</p>
                {/* <small>Species:{data.species}</small> */}
                <p><span style={{ textDecoration: "underline" }}>Forms</span>: {data.forms.map((val, key) => {
                    return <span key={key}>{val.name}</span>
                })}</p>

                <p><span style={{ textDecoration: "underline" }}>Moves</span>: {
                    data.moves.map((val, key) => {
                        return <span>{val.move.name}, </span>
                    })
                }</p>

            </Modal>
        </div>
    )
}

export default PokemonThumb
