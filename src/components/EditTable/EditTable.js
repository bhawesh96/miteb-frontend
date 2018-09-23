import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Input } from '@material-ui/core';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import Paper from 'material-ui/Paper'
import TextField from '@material-ui/core/TextField';

export default class EditTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleRemove(index) {
        console.log("Delete");
        return (event) => {
            this.setState((prev) => {
                prev.rows.splice(index, 1)
                console.log(prev);
                return { rows: prev.rows };
            })
        }
    }
    handleAdd(event) {
        this.setState((prev) => {
            let a = {};
            for (let i = 0; i < this.props.cols.length; i++) {
                a[this.props.cols[i].fieldName] = '';
            }
            return { rows: prev.rows.concat([a]) };
        });
    }
    handleChange(index, col) {
        return (event) => {
            this.setState((prev) => {
                prev.rows[index][col] = document.getElementById(col + '' + index).value;
                return { rows: prev.rows };
            });
        }
    }
    render() {
        return (
            <div>
                <Paper style={{ display: 'flex', flexDirection: 'column', height: '40vh', overflowX: 'scroll', overFlowY: 'scroll' }}>
                    <Table style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <TableHead style={{ display: 'flex', flexDirection: 'column' }}>
                            <TableRow style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                {this.props.cols.map((obj) =>
                                    <TableCell style={{
                                        flex: '1',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        boxSizing: 'border-box',
                                        paddingTop: '1rem',
                                    }}>{obj.title}</TableCell>
                                )}
                                <TableCell style={{ flex: '0.25' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ display: 'flex', flexDirection: 'column' }}>
                            {
                                this.state.rows.map((row, index) => {
                                    return (
                                        <TableRow key={index} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                            {Object.keys(row).map((val) => {
                                                return (
                                                    <TableCell style={{ flex: '1', justifyContent: 'center', padding: '0 1.5rem' }}>
                                                        <TextField
                                                            variant='standard'
                                                            placeholder={val}
                                                            id={val + '' + index} name={val}
                                                            fullWidth={true}
                                                            onChange={this.handleChange(index, val)}
                                                            value={row[val]} />
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell style={{ flex: '0.25', boxStyle: 'border-box', padding: 0 }}>
                                                <IconButton iconStyle={{ color: '#03a9f4' }} margin='none' onClick={this.handleRemove(index)}>
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