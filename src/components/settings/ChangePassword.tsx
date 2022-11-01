import { SyntheticEvent, useEffect, useState } from "react"
import '../../styles/styles'
import Modal from 'react-modal';
import axios from "axios";
import ResultModal from "../modals/ResultModal";

const ChangePassword = () => {
 
  const [confirm, setConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');


  const submitPassword = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put(`me/update-password`,
    {
        current_password: currentPassword,
        password: newPassword,
        password_confirm: confirmNewPassword
    });
    setConfirm(true)
  }


  Modal.setAppElement('#root');

  if(confirm){
    return(
      <ResultModal open={true} message={"Your profile settings are saved"} />
    )
  }

  return (

    <div className="profile-settings">
        <h1 className="text-lg">Profile <span>settings</span></h1>
        <h3>Change your password</h3>
        <form onSubmit={submitPassword} className="password-form">
          <div className="">
            <label>Current password</label>
            <input type="password" className="modal-email-input" placeholder="Current password" required onChange={e => setCurrentPassword(e.target.value)}/>
          </div>
          <div>
            <label>New password</label>
            <input type="password" className="modal-email-input" placeholder="New password" required onChange={e => setNewPassword(e.target.value)}/>  
          </div>
          <div>
            <label>Confirm new password</label>
            <input type="password" className="modal-email-input" placeholder="Confirm new password" required onChange={e => setConfirmNewPassword(e.target.value)}/>
          </div>           
          <button className="modal-submit-button" type="submit">Submit</button>
        </form>
    </div>
  )
}

export default ChangePassword