
import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useIdleTimer } from 'react-idle-timer'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '50%',
      height: '60%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

function Login() {
  const [open, setOpen] = useState(false);
  const [hasSession, setSession] = useState(false);
  const [failure,setFailure] = useState(0);
  const [isManyFailure,setManyFailure] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    permanent: "",
  });
  const onUpdateField = e => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };
  const onSubmitForm = e => {
    e.preventDefault();
    if (isManyFailure) {
        alert('Terlalu banyak kesalahan, coba lagi nanti')
        return;
    }
    const { isValid } = onValidateLogin(form);
    if (!isValid) {
        onFailure()
        alert('Username atau password salah')
        return;
    }
    setSession(true);
    setOpen(false);
  };
  const onIdle = () => {
    setSession(false);
  }

  const {
    start,
    reset,
    activate,
    pause,
    resume,
    isIdle,
    isPrompted,
    isLeader,
    getTabId,
    getRemainingTime,
    getElapsedTime,
    getLastIdleTime,
    getLastActiveTime,
    getTotalIdleTime,
    getTotalActiveTime
  } = useIdleTimer({
    onIdle,
    timeout: 1000 * 30,
    promptTimeout: 0,
    events: [
      'mousemove',
      'keydown',
      'wheel',
      'DOMMouseScroll',
      'mousewheel',
      'mousedown',
      'touchstart',
      'touchmove',
      'MSPointerDown',
      'MSPointerMove',
      'visibilitychange'
    ],
    immediateEvents: [],
    debounce: 0,
    throttle: 0,
    eventsThrottle: 200,
    element: document,
    startOnMount: true,
    startManually: false,
    stopOnIdle: false,
    crossTab: false,
    name: 'idle-timer',
    syncTimers: 0,
    leaderElection: false
  })

  function onValidateLogin(form){
    let isValid = true;
    if( form.username=='admin'&&
        form.password=='admin'&&
        form.permanent=='on'){
        isValid = true;
    }else{
        isValid = false;
    }
    return {
        isValid,
    };
  }

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function onFailure() {
    setFailure(failure+1);
    if(failure==3){
        setFailure(0);
        setManyFailure(true);
        setTimeout(function() {
            setManyFailure(false);
        }.bind(this), 30000)
    }
  }

  return (
    <>
        <div
        color="inherit"
        style={!hasSession ? { cursor: "pointer" } : { display: 'none' }}
        onClick={openModal}
        >
            Login
        </div>
        <Modal
        isOpen={open}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
        size="lg"
        >
            <h3>Login</h3>
            <form onSubmit={onSubmitForm}>
                <div>Username :</div>
                <div>
                    <input type="text" name="username" id="username" onChange={onUpdateField} />
                </div>
                <div>Password :</div>
                <div>
                    <input type="password" name="password" id="password" onChange={onUpdateField} />
                </div>
                <div>
                    <input type="checkbox" name="permanent" id="permanent" onChange={onUpdateField} /> permanent login
                </div>
                <input type="submit" value="Login" />
            </form>
        </Modal>
    </>
  );

}

export default Login