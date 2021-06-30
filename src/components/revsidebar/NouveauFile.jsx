import "./nouveauFile.css"
import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
export default function NouveauFile() {
    return (
        <div className='newFile'>
        <div className="newFile__container" >
            <AddIcon fontSize='large' />
            <p>New</p>
        </div>

        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div>
                <p>Select files you want to upload!</p>
                
                            <>
                                <input type="file"  />
                                <button >Upload</button>
                            </>
                       
            </div>
        </Modal>
    </div>
    )
}
