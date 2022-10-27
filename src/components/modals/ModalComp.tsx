import React, { useEffect } from 'react'
import Modal from 'react-modal'


const ModalComp = (props: any) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    setIsOpen(props.open)
  })

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={()=> props.stayOpen(false)}>
        {props.children}
        <button onClick={()=> props.stayOpen(false)}>Cancel</button>
      </Modal>
    </div>
  )
}

export default ModalComp