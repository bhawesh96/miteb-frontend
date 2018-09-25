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
        return (event) => {
            this.setState((prev) => {
                prev.rows.splice(index, 1);
                return { rows: prev.rows };
            });
            this.props.onChange(this.state.rows);
        }
    }
    handleAdd(event) {
        this.setState((prev) => {
            let a = {};
            for (let i = 0; i < this.props.cols.length; i++) {
                a[this.props.cols[i].fieldName] = '';
            }
            this.props.onChange(prev.rows.concat([a]));
            return { rows: prev.rows.concat([a]) };
        });

    }
    handleChange(index, col) {
        return (event) => {
            this.setState((prev) => {
                let row = prev.rows[index];
                row [col] =document.getElementById(col + '' + index).value;
                return { rows: prev.rows.concat([row])};
            });
            this.props.onChange(this.state.rows);
        }
    }
    render() {
        const { id } = this.props;
        return (
            <div>
                <Paper style={{ display: 'flex', flexDirection: 'column', height: '40vh', overflowX: 'scroll', overFlowY: 'scroll' }}>
                    <Table style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <TableHead style={{ display: 'flex', flexDirection: 'column' }}>
                            <TableRow style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                {this.props.cols.map((obj, index) =>
                                    <TableCell
                                        key={id + '_head_' + index}
                                        style={{
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
                                this.state.rows && 
                                this.state.rows.map((row, index) => {
                                    return (
                                        <TableRow
                                            key={id + '_row_' + index}
                                            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                            {Object.keys(row).map((val, index) => {
                                                return (
                                                    <TableCell
                                                        key={id + '_rowcell_' + index}
                                                        style={{ flex: '1', justifyContent: 'center', padding: '0 1.5rem' }}>
                                                        <TextField
                                                            key={id+'_text_'+index}
                                                            variant='standard'
                                                            placeholder={val}
                                                            id={val + '' + index} name={val}
                                                            fullWidth={true}
                                                            onChange={this.handleChange(index, val)}
                                                            value={row[val]} />
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell
                                                key ={id+'_remove_'+index}
                                                style={{ flex: '0.25', boxStyle: 'border-box', padding: 0 }}>
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