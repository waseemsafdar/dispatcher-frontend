import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';

/**
 * A reusable confirmation dialog component
 *
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {Function} props.onClose - Function to call when the dialog is closed without confirmation
 * @param {Function} props.onConfirm - Function to call when the user confirms the action
 * @param {string} props.title - The dialog title
 * @param {string} props.message - The message to display in the dialog
 * @param {string} props.cancelButtonText - Text for the cancel button
 * @param {string} props.confirmButtonText - Text for the confirm button
 * @param {string} props.cancelButtonColor - MUI color for the cancel button
 * @param {string} props.confirmButtonColor - MUI color for the confirm button
 */
const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirmation',
  message = 'Are you sure you want to continue?',
  cancelButtonText = 'Cancel',
  confirmButtonText = 'Confirm',
  cancelButtonColor = 'primary',
  confirmButtonColor = 'secondary'
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
      PaperProps={{
        style: {
          borderRadius: 16, // Rounded corners
        },
      }}
    >
      <DialogTitle id="confirmation-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="confirmation-dialog-description"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color={cancelButtonColor}
          variant="outlined"
          sx={{ borderRadius: 8 }} // Rounded button
        >
          {cancelButtonText}
        </Button>
        <Button
          onClick={onConfirm}
          color={confirmButtonColor}
          variant="contained"
          sx={{ borderRadius: 8,  backgroundColor: '#FFA500' }} // Rounded button
          autoFocus
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  cancelButtonText: PropTypes.string,
  confirmButtonText: PropTypes.string,
  cancelButtonColor: PropTypes.string,
  confirmButtonColor: PropTypes.string
};

export default ConfirmationDialog;