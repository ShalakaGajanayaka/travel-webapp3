import React from "react";
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import Panel from "./Panel";

const FloatingButton = () => {
  const [button, setButton] = useState(true)
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true);
    setButton(false);
  };

  const handleClose = () => {
    setOpen(false);
    setButton(true);
  };

  return (
    <>
      {button && (
        <div style={styles.fabContainer}>
          <button
            className="floating-chat-button"
            onClick={handleOpen}
          >
            <span className="label">Live Chat</span>
            <span className="icon" aria-hidden="true"></span>
          </button>
        </div>
      )}
      <Dialog open={open} onClose={handleClose} className="relative z-10">
        <Panel onClose={handleClose}/>
      </Dialog>
    </>
  );
};

const styles = {
  fabContainer: {
    position: "fixed",
    bottom: "15px", // Adjust as needed
    right: "15px", // Adjust as needed
    zIndex: 1000, // Ensure it stays on top
  },
};

export default FloatingButton;
