import { SyntheticEvent, useEffect, useState } from "react"
import '../../styles/quoteCard.css'
import Modal from 'react-modal';
import axios from "axios";
import User from "../../models/user";
import Quote from "../../models/quote";
import ModalComp from "../modals/ModalComp";
import AddQuote from "../actions/AddQuote";
import ResultModal from "../modals/ResultModal";

interface QuoteProps {
  quote: Quote,
  rating: string,
  author?: boolean
}

const Settings = (props: {
    loggedUser: User
}) => {
 
  const [pictureIsOpen, setPictureIsOpen] = useState(false);
  const [passwordIsOpen, setPasswordIsOpen] = useState(false);
  const [user, setUser] = useState(new User());
  const [confirm, setConfirm] = useState(false);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');

  function changePwModal(){
    setPasswordIsOpen(true)  
  }

  function ChangePfpModal(){
    setPictureIsOpen(true)  
  }

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put(`me/update-info`,
    {
        first_name: first_name,
        last_name: last_name,
        email: email
    });
    setConfirm(true)
  }


  Modal.setAppElement('#root');

  useEffect(() => {
    (
        async () => {           
            if(props.loggedUser.id !== 0){
                setUser(new User(
                    props.loggedUser.id,
                    props.loggedUser.first_name,
                    props.loggedUser.last_name,
                    props.loggedUser.email,
                    props.loggedUser.image
                ))
            }
          }
    )()
  }, [])

  if(confirm){
    return(
      <ResultModal open={true} message={"Your profile settings are saved"} />
    )
  }

  return (

    <div>
        <h1>Profile settings</h1>
        <h3>Change your profile settings</h3>
        <form onSubmit={submit}>
            <input type="email" className="form-control" defaultValue={user.email} required onChange={e => setEmail(e.target.value)}/>
            <input type="first_name" className="form-control" defaultValue={user.first_name} required onChange={e => setFirstName(e.target.value)}/>
            <input type="last_name" className="form-control" defaultValue={user.last_name} required onChange={e => setLastName(e.target.value)}/>
            <div id="root">
                <button onClick={ChangePfpModal}>Changee password</button>
                {pictureIsOpen && <ModalComp open={pictureIsOpen} children={<AddQuote />} stayOpen={setPictureIsOpen} />}
                <button onClick={changePwModal}>Change profile picture</button>
                {passwordIsOpen && <ModalComp open={passwordIsOpen} children={<AddQuote />} stayOpen={setPasswordIsOpen} />}
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Settings