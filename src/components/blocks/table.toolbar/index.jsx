import React from "react";
import clsx from 'clsx';
import PropTypes  from 'prop-types';
import { useToolbarStyles } from "../../config/table.styles.config";
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import {
    Toolbar,
    Typography,
    Tooltip,
    IconButton,
} from "@material-ui/core";


const TableToolbar = props => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle">
            Nutrition
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };

TableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default TableToolbar;