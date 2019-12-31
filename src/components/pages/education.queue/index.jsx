import React, { Component } from 'react';
import { connect } from "react-redux";
import Loader from '../../blocks/loader';
import { educationQueuePending } from '../../../actions/education.queue.action.creator';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableCell,
  TableRow,
} from '@material-ui/core';


class EducationQueue extends Component {
  state = {
    rowsPerPage: 5,
    page: 0,

  }
  setTargetState = (stateName, stateValue) => {
    this.setState({
      [stateName]: stateValue
    });
  }

  handleChangePage = (event, page) => {
    this.setTargetState("page", page);
  }
  handleChangeRowsPerPage = (event) => {
      this.setTargetState("rowsPerPage", parseInt(event.target.value, 10));
  }

  componentDidMount() {
      this.props.dispatch(educationQueuePending());
  }
  render() {
    const { educationQueue: {isLoading}, educationQueue} = this.props;
    const {rowsPerPage, page } = this.state;
    if(isLoading) return <Loader/>;
    return (
      <section className="container">
          <section className="education-queue">
            <span className="education-queue__title">54 Education Queues Data </span>
            <Paper>
              <TableContainer>
                <Table>
                  <TableHead>
                      <TableRow>

                          <TableCell>Row Number</TableCell>
                          <TableCell>Ua Edr</TableCell>
                          <TableCell>Short Name</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Number seats</TableCell>
                          <TableCell>Number children</TableCell>
                          <TableCell>Excess Younger</TableCell>
                          <TableCell>Excess Elder</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>{Object.values(educationQueue).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((educationQueueRow, index)=>{
                      return !educationQueueRow ? null : <TableRow key={educationQueueRow.Ua_edr}>
                          <TableCell>{index+1}</TableCell>
                          <TableCell>{educationQueueRow.Ua_edr}</TableCell>
                          <TableCell>{educationQueueRow.Short_name}</TableCell>
                          <TableCell>{educationQueueRow.Date}</TableCell>
                          <TableCell>{educationQueueRow.Number_seats || 'Is not specified'}</TableCell>
                          <TableCell>{educationQueueRow.Number_children || 'Is not specified'}</TableCell>
                          <TableCell>{educationQueueRow.ExcessYounger || 'Is not specified'}</TableCell>
                          <TableCell>{educationQueueRow.ExcessElder || 'Is not specified'}</TableCell>
                      </TableRow>
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={Object.values(educationQueue).length}
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
