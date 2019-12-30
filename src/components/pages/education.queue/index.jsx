import React, { Component } from 'react';
import { connect } from "react-redux";
import { useToolbarStyles } from '../../config/table.styles.config';
import TableToolbar from '../../blocks/table.toolbar';
import { stableSort, getSorting } from '../../../services/table.service';
import { educationQueuePending } from '../../../actions/education.queue.action.creator';
import {
    Paper,
    Table,
    TableCell,
    TableRow,
    TableBody,
    TableContainer,
    Checkbox,
    TablePagination,
} from '@material-ui/core';
import Loader from '../../blocks/loader';
import TableHeader from '../../blocks/table.header';


class EducationQueue extends Component {
  state = {
    order: 'asc',
    orderBy: '',
    selected: [],
    page: 0,
    dense: false,
    rowPerPage: 5,
    classes: []
  }
  setTargetState = (propName, value) => {
      this.setState({
        [propName] : value
      });
  }
  handleSelectAllClick = event => {
      if (event.target.checked) {
        const selectedRows = this.props.educationQueue.map(row => row.name);
        this.setTargetState("selected", selectedRows);
        return;
      }
      this.setTargetState("selected", []);
  };

  handleRequestSort = (event, property) => {
      const isAsc = this.state.orderBy === property && this.state.order === 'asc';
      this.setTargetState("order", isAsc ? 'desc' : 'asc');
      this.setTargetState("orderBy", property);
  };
  handleClick = (event, name) => {
    const {selected} = this.state;
    const selectedIndex = this.state.selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
           this.state.selected.slice(0, selectedIndex),
           this.state.selected.slice(selectedIndex + 1),
        );
    }

    this.setTargetState(newSelected);
  };
  handleChangePage = (event, newPage) => {
    this.setTargetState("page", newPage);
  };

  handleChangeRowsPerPage = event => {
    this.setTargetState("rowPerPage", parseInt(event.target.value, 10));
    this.setTargetState("rowPerPage", 0);
  };

  handleChangeDense = event => {
    this.setTargetState("dense", event.target.checked);
  };

  isSelected = name => this.state.selected.indexOf(name) !== -1;

  emptyRows = () => {
    const { rowsPerPage, page } = this.state;
    this.setTargetState("rowPerPage", rowsPerPage - Math.min(rowsPerPage, this.props.educationQueue.length - page * rowsPerPage))
    return this.state.rowPerPage;
  };
  componentDidMount () {
    this.setTargetState("classes", useToolbarStyles());
    this.props.dispatch(educationQueuePending());
  }

  render() {
    const { classes, rowsPerPage, order, orderBy, selected, dense, page} = this.state;
    const { educationQueue: {isLoading},  educationQueue} = this.props;
    if(isLoading) return <Loader/>;
    return (
      <section className="container">
          <section className="education-queue">
          <Paper className={classes.paper}>
          <TableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <TableHeader
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={educationQueue.length}
              />
              <TableBody>
                {stableSort(educationQueue, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = this.isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    );
                  })}
                {this.emptyRows() > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * this.emptyRows() }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={educationQueue.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
      </Paper>
          </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  educationQueue: state.educationQueue
});

export default connect(mapStateToProps)(EducationQueue);
