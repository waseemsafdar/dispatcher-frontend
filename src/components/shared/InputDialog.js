import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField
} from '@mui/material';

/**
 * A reusable dialog component for collecting input
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {Function} props.onClose - Function to call when the dialog is closed without confirmation
 * @param {Function} props.onSubmit - Function to call when the user submits the form with inputValue as parameter
 * @param {string} props.title - The dialog title
 * @param {string} props.label - Label for the input field
 * @param {string} props.initialValue - Initial value for the input field
 * @param {string} props.cancelButtonText - Text for the cancel button
 * @param {string} props.submitButtonText - Text for the submit button
 * @param {string} props.cancelButtonColor - MUI color for the cancel button
 * @param {string} props.submitButtonColor - MUI color for the submit button
 * @param {boolean} props.fullWidth - Whether the dialog should take up the full width
 * @param {('xs'|'sm'|'md'|'lg'|'xl')} props.maxWidth - Maximum width of the dialog
 */
const InputDialog = ({
  open,
  onClose,
  onSubmit,
  title = 'Enter Information',
  label = 'Title',
  initialValue = '',
  cancelButtonText = 'Cancel',
  submitButtonText = 'Submit',
  cancelButtonColor = 'primary',
  submitButtonColor = 'primary',
  fullWidth = true,
  maxWidth = 'sm'
}) => {
  const [inputValue, setInputValue] = useState(initialValue);

  // Reset input value when dialog opens with initial value
  useEffect(() => {
    if (open) {
      setInputValue(initialValue);
    }
  }, [open, initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="input-dialog-title"
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="input-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="input-dialog-field"
            label={label}
            type="text"
            fullWidth
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={onClose} 
            color={cancelButtonColor}
          >
            {cancelButtonText}
          </Button>
          <Button 
            type="submit"
            variant="contained" 
            color={submitButtonColor}
            disabled={!inputValue.trim()}
          >
            {submitButtonText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

InputDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  label: PropTypes.string,
  initialValue: PropTypes.string,
  cancelButtonText: PropTypes.string,
  submitButtonText: PropTypes.string,
  cancelButtonColor: PropTypes.string,
  submitButtonColor: PropTypes.string,
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])
};

export default InputDialog;