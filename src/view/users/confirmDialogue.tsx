import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Button} from '@mui/material';

interface ConfirmDialogProps {
    confirmStatus: boolean;
    confirmOpen: boolean;
    handleClickDialog:(status:boolean) => void;
}
const ConfirmationDialog :React.FC<ConfirmDialogProps> = ({ confirmStatus, confirmOpen,handleClickDialog }: ConfirmDialogProps) =>{
    return(
        <Dialog
        open={confirmOpen}
        onClose={()=>handleClickDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you want to remove permenantly?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            When click delete the data will be removed. If not want to delete please click cancel
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClickDialog(false)}>Cancel</Button>
          <Button onClick={()=>handleClickDialog(true)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    )
}
export default ConfirmationDialog;