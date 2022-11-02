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
        className='modal-window'
        isOpen={modalIsOpen}
        onRequestClose={()=> props.stayOpen(false)}>
        {props.children}
        <a className='modal-cancel-button pointer' onClick={()=> props.stayOpen(false)}>Cancel</a>
      </Modal>
    </div>
  )
}

export default ModalComp