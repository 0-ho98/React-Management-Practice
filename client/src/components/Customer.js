import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CustomerDelete from './CustomerDelete';
class Customer extends React.Component {
  render() {
    const { id, image, name, birthday, gender, job, stateRefresh } = this.props;
    return (
      <TableRow>
        <TableCell>{id}</TableCell>
        <TableCell>
          <img src={image} alt="profile" />
        </TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{birthday}</TableCell>
        <TableCell>{gender}</TableCell>
        <TableCell>{job}</TableCell>
        <TableCell><CustomerDelete stateRefresh={stateRefresh} id={id}/></TableCell>
      </TableRow>
    );
  }
}

export default Customer;
