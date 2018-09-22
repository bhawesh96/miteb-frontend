import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Input } from '@material-ui/core';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import Paper from 'material-ui/Paper'

export default class EditTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    handleRemove(index) {
        return (event) => {
            this.setState((prev) => {
                prev.rows.splice(index, 1)
                return { rows: prev.rows };
            })
        }
    }
    handleAdd(event) {
        this.setState((prev) => {
            return { rows: prev.rows.concat([{ category: '', amount: 0 }]) };
        });
    }
    handleCategoryChange(index) {
        return (event) => {
            this.setState((prev) => {
                prev.rows[index].category = event.target.value;
                return { rows: prev };
            });
        }
    }
    render() {
        return (
            <div>
                <Paper style={{ width: '100%', height: '40vh', overflowX: 'hidden', overFlowY: 'scroll' }} height='30vh'>
                    <Table style={{ width: '100%', margin: 2 }}>
                        <TableHead style={{ width: '100%' }}>
                            <TableRow style={{ width: '100%' }}>
                                {this.props.cols.map((obj) =>
                                    <TableCell>{obj.title}</TableCell>
                                )}
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.rows.map((row, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell >
                                                <Input
                                                    value={this.state.rows[index].category}></Input>
                                            </TableCell>
                                            <TableCell style={{width:'10%'}}>
                                                <Input
                                                    value={this.state.rows[index].amount}></Input>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton tooltip="remove"
                                                    iconStyle={{ color: '#03a9f4' }}
                                                    onClick={this.handleRemove(index)}>
                                                    <ContentRemoveCircle />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </Paper>
                <RaisedButton
                    label='Add'
                    primary={true}
                    style={{ margin: '1em' }}
                    onClick={this.handleAdd}
                />
            </div>
        );
    }
}