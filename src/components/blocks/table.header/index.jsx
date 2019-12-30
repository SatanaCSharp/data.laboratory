import React from  "react";
import {
    TableHead,
    TableCell,
    TableRow,
    Checkbox,
    TableSortLabel,
} from '@material-ui/core';
import PropTypes  from 'prop-types';

const headCells = [
    { id: 'Ua_edr', numeric: false, disablePadding: true, label: 'Ua Edr' },
    { id: 'Education_name', numeric: true, disablePadding: false, label: 'Education Name' },
    { id: 'Short_name', numeric: true, disablePadding: false, label: 'Short Name' },
    { id: 'Date', numeric: true, disablePadding: false, label: 'Date' },
    { id: 'Number_seats', numeric: true, disablePadding: false, label: 'Number Seats' },
    { id: 'Number_children', numeric: true, disablePadding: false, label: 'Number Children' },
    { id: 'ExcessYounger', numeric: true, disablePadding: false, label: 'Excess Younger' },
    { id: 'ExcessElder', numeric: true, disablePadding: false, label: 'Excess Elder' },
];

const TableHeader = (props) => {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = property => event => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
          {headCells.map(headCell => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  TableHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default TableHeader;