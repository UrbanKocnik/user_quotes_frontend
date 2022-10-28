import { SyntheticEvent, useEffect, useState } from "react"
import '../../styles/quoteCard.css'
import Modal from 'react-modal';
import axios from "axios";
import User from "../../models/user";
import Quote from "../../models/quote";
import ModalComp from "../modals/ModalComp";
import AddQuote from "../actions/AddQuote";
import ResultModal from "../modals/ResultModal";

const ChangePassword = () => {
 
  const [confirm, setConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');


  const submit = async (e: SyntheticEvent) => {
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

    <div>
        <h1>Profile settings</h1>
        <h3>Change your password</h3>
        <form onSubmit={submit}>
            <label>Current password</label>
            <input type="current_password" className="form-control" placeholder="Current password" required onChange={e => setCurrentPassword(e.target.value)}/>
            <label>New password</label>
            <input type="password" className="form-control" placeholder="New password" required onChange={e => setNewPassword(e.target.value)}/>
            <label>Confirm new password</label>
            <input type="password_confirm" className="form-control" placeholder="Confirm new password" required onChange={e => setConfirmNewPassword(e.target.value)}/>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </div>
  )
}

export default ChangePassword