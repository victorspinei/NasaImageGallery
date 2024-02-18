import { useState } from "react";
import Modal from "./Modal";
import "./Item.css"

function Item({ itemData }) {
  const item = itemData.data['0'];
  const [modal, setModal] = useState(false);
  const link = itemData.links['0']['href'];

  const format = (s) => s.slice(0, s.indexOf("T"));
  

  return (
    <div onClick={() => setModal(true)}>
      <img className="item-img" src={link}/>
      <Modal openModal={modal} closeModal={() => setModal(false)}>
        <div className="extra-info">
          <p>NASA ID: <span>{item.nasa_id}</span></p>
          <p>Date Created: <span>{format(item.date_created)}</span></p>
        </div>
        <a href={link} target="_blank"><img className="modal-img" src={link}/></a>
        <h2>{item.title}</h2>
        <div className="keywords-div">
          <p>Keywords: </p>
          {item.keywords ? item.keywords.map((v, i) => {
            return (<p className="keyword" key={i}>{v} </p>)
          }) : ""}
          <p>{item.description}</p>
        </div>
      </Modal>
    </div>
  )
}

export default Item;
