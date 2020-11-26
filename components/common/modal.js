import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"

const Modal = ({ titleModal, textModal, open, onClose }) => (
  open && (
    createPortal(
      <div className="m-modal-container modal">
        <div className="m-modal-content w-1/2">
          <div className="m-modal-header">
            <h3 className="font-semibold text-lg">{titleModal}</h3>
            <button className="text-black close-modal" onClick={onClose}>&times;</button>
          </div>
          <div className="m-4 grid grid-cols-4 gap-4">
            {
              textModal.map( (item , idx) => (
                <div className="flex items-center" key={idx}>
                  <h1>{item['key']} <span className="text-gray-500">{item['doc_count']}</span></h1>
                </div>
              ))
            }
          </div>
        </div>
      </div>, document.body
    )
  )
)

export default Modal;