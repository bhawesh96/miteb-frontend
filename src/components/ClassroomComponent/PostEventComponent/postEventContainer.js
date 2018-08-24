import React, {Component} from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import {connect} from 'react-redux'
import FlatButton from 'material-ui/FlatButton';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';



class postEventComponent extends Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.state = {
      stepIndex:0,
      creditArray: [],
      debitArray: [],
      credit: {
        category: '',
        amt: '',
      },
      debit: {
        category: '',
        amt: ''
      }

    };
    this.getStepContent = this.getStepContent.bind(this);
    this.handleCreditCategory = this.handleCreditCategory.bind(this);
    this.handleCreditAmount = this.handleCreditAmount.bind(this);
    this.addCredit = this.addCredit.bind(this);
    this.addDebit = this.addDebit.bind(this);
    this.cleanCredit = this.cleanCredit.bind(this);
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div style={{display: 'flex', textAlign: 'center'}}>
            <div style={{width: this.props.isMobile ? '100%' : '50%',flexDirection: 'column', justifyContent: 'space-around'}}>
              <h4>Credit</h4>
                <div>
                  <Table
                    style={{backgroundColor: '',overflow: 'scroll'}}
                    height={'440px'}
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                  >
                    <TableHeader
                      displaySelectAll={this.state.showCheckboxes}
                      adjustForCheckbox={this.state.showCheckboxes}
                      enableSelectAll={this.state.enableSelectAll}
                    >
                      <TableRow style={{backgroundColor: '#EFF0F2'}}>
                        <TableHeaderColumn style={{color: '#000', fontWeight: 700, width: '10%'}}>Category</TableHeaderColumn>
                        <TableHeaderColumn style={{color: '#000', fontWeight: 700, width: '10%'}}>Amount</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody
                      displayRowCheckbox={this.state.showCheckboxes}
                      deselectOnClickaway={this.state.deselectOnClickaway}
                      showRowHover={this.state.showRowHover}
                      stripedRows={this.state.stripedRows}
                    >
                    { Object.keys(this.state.creditArray).length > 0 ? (Object.values(this.state.creditArray).map(function(credit, index) {
                      return (
                          <TableRow key={index}>
                            <TableRowColumn style={{width: '10%'}}>{credit.category}</TableRowColumn>
                            <TableRowColumn style={{width: '10%'}}>{credit.amt}</TableRowColumn>
                          </TableRow>
                      )}, this)) : <div><p>{"No Credit Recorded"}</p></div>}
                    </TableBody>
                  </Table>
                </div>

              <TextField
                hintText="Enter Category"
                onChange = {this.handleCreditCategory}
                value={this.state.credit.category}
              /><br />
              <TextField
                hintText="Enter Amount"
                onChange={this.handleCreditAmount}
                value={this.state.credit.amt}
              /><br />
              <RaisedButton
                  label='add Credit'
                  primary={true}
                  onClick={this.addCredit}
                />
            </div>
            <div style={{display: this.props.isMobile ? 'none' : '', height: 300, border: '1px solid lightgrey'}}></div>

            <div style={{width: this.props.isMobile ? '100%' : '50%',flexDirection: 'column', justifyContent: 'space-around'}}>
              <h4>Debit</h4>
            </div>
          </div>
        );

      case 1:
        return (
          <p>
            {'An ad group contains one or more ads which target a shared set of keywords.'}
          </p>
        );

      case 2:
        return (
          <p>
            {'Try out different ad text to see what brings in the most customers, and learn ' +
            'how to enhance your ads using features like ad extensions. If you run into any ' +
            'problems with your ads, find out how to tell if they\'re running and how to ' +
            'resolve approval issues.'}
          </p>
        );
    }
  }

  handleCreditCategory(e) {
    this.setState({credit: {category: e.target.value, amt: this.state.credit.amt}});
  }

  handleCreditAmount(e) {
    this.setState({credit: {amt: e.target.value, category: this.state.credit.category}});
  }
  addCredit() {
    let tempCreditArray = this.state.creditArray;
    tempCreditArray.push(this.state.credit);
    this.setState({creditArray: tempCreditArray})
    this.cleanCredit()
    // console.log("********************")
    // console.log(tempCreditArray)
  }

  cleanCredit() {
    this.setState({credit: {category: '',amt:''}})
  }

  addDebit(category, amount) {
    let tempDebit = {
      category: category,
      amount: amount
    }
    this.setState({debit: tempDebit})
    let tempDebitArray = this.state.debitArray
    tempDebitArray.push(tempDebit)
    this.setState({debitArray: tempDebitArray})
  }

  handleNext() {
    const {stepIndex} = this.state;

    if (stepIndex < 2) {
      this.setState({stepIndex: stepIndex + 1});
    }
  }

  handlePrev() {
    const {stepIndex} = this.state;

    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }



  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', padding: 15}}>
        <Paper style={{background: '', width: this.props.isMobile? '98%': '90%', height: '500px', display: 'flex', justifyContent: 'center'}} zDepth={2}>
          <div style={{width: '100%', maxWidth: 700}}>
            <Stepper linear={false} activeStep={this.state.stepIndex} orientation={this.props.isMobile ? 'vertical' : 'horizontal'} style={{width: '80%', margin: '0 auto'}} connector={<ArrowForwardIcon />}>
              <Step>
                <StepLabel>Financials</StepLabel>
              </Step>

              <Step>
                <StepLabel>Participation</StepLabel>
              </Step>

              <Step>
                <StepLabel>Book Another Event!</StepLabel>
              </Step>
            </Stepper>

            {this.getStepContent(this.state.stepIndex)}

            <div style={{marginTop: 24, marginBottom: 12}}>
              <FlatButton
                label="Back"
                disabled={this.state.stepIndex === 0}
                onClick={this.handlePrev}
                style={{marginRight: 12}}
              />
                <RaisedButton
                  label={this.state.stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  onClick={this.handleNext}
                />
            </div>
          </div>
        </Paper>

      </div>
    )
  }
}

function mapStateToProps(state) {
  const {isMobile} = state.toggler
  const {user} = state.authentication
  return {
    isMobile,
    user
  }   
}
export default connect(mapStateToProps)(postEventComponent);