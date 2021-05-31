import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const AlertDialog = (props) => {
  return (
    <div>
      <Dialog open={props.open} aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.dialogButtonHandler} color="primary" autoFocus>
            Home
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
