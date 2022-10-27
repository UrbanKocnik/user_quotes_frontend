import React, { useEffect } from 'react'
import Modal from 'react-modal'


const ConfirmModal = (props:{
  message: string,
  open: boolean
}) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    setIsOpen(props.open)
  })

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={()=> window.location.reload()}>
          {props.message}
        <button onClick={()=> window.location.reload()}>Close</button>
      </Modal>
    </div>
  )
}

export default ConfirmModal