import React from 'react';
import PropTypes from 'prop-types';
import { Chip, Tooltip, Box } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';

/**
 * A component to display a saved filter with title and close button
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - The title of the saved filter
 * @param {Function} props.onDelete - Function to call when the filter is deleted
 * @param {Function} props.onClick - Function to call when the filter is clicked
 */
const SavedFilterChip = ({ title, onDelete, onClick }) => {
  return (
    <Tooltip title={`Apply filter: ${title}`}>
      <Box sx={{ position: 'relative', mr: 1, mb: 1 }}>
        <Chip
          label={title}
          onClick={onClick}
          onDelete={onDelete}
          deleteIcon={
            <Box 
              sx={{ 
                bgcolor: 'grey.300', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 16,
                height: 16
              }}
            >
              <GridCloseIcon fontSize="small" sx={{ fontSize: '12px' }} />
            </Box>
          }
          sx={{
            borderRadius: '16px',
            backgroundColor: '#e3f2fd',
            color: '#1565c0',
            fontWeight: '500',
            '&:hover': {
              backgroundColor: '#bbdefb',
            },
            pl: 1,
            pr: 0.5,
            py: 0.75
          }}
        />
      </Box>
    </Tooltip>
  );
};

SavedFilterChip.propTypes = {
  title: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default SavedFilterChip;