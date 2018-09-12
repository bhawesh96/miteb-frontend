import React, {Component} from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import {connect} from 'react-redux'
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FinishedContainer from './FinishedContainer.js'
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
      },
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: true,
      showCheckboxes: false,
      myArr: {},
      myArrx: {},
      allArr: {},
      originalArr: {},
      pendingArr: {},
      approvedArr: {},
      dialogOpen: false,
      currentEvent: {},
      fetching: true,
      searchContent: '',
      dateSort: null,

    };
    this.getStepContent = this.getStepContent.bind(this);
    this.handleCreditCategory = this.handleCreditCategory.bind(this);
    this.handleCreditAmount = this.handleCreditAmount.bind(this);
    this.handleDebitCategory = this.handleDebitCategory.bind(this);
    this.handleDebitAmount = this.handleDebitAmount.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.addCredit = this.addCredit.bind(this);
    this.addDebit = this.addDebit.bind(this);
    this.cleanCredit = this.cleanCredit.bind(this);
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div style={{display: 'flex', textAlign: 'center'}} height={'440px'}>
            <div style={{height: this.props.isMobile? 'auto':'400px',width: this.props.isMobile ? '100%' : '50%',flexDirection: 'column', justifyContent: 'space-around'}}>
              <h4>{this.props.currEvent && this.props.currEvent.title}</h4>
              {/*<h4>Credit</h4>*/}
                <div style={{width: '100%'}}>
                  <Table
                    style={{backgroundColor: ''}}
                    height={'250px'}
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
                      displayRowCheckbox={false}
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
                  <div style={{height:'25px'}}>
                  <TextField
                  value={this.state.credit.category}
                  style={{width:'30%'}}
                  hintText={"Category"}
                  onChange={this.handleCreditCategory}
                  />
                  <TextField
                  value={this.state.credit.amt}
                  style={{width:'30%',marginLeft:'5%'}}
                  hintText="Amount"
                  onChange={this.handleCreditAmount}
                  />
                  <FloatingActionButton 
                  mini={true}
                  style={{marginLeft:'5%'}}
                  onClick={this.addCredit}
                  >
                    <ContentAdd />
                  </FloatingActionButton>
                  
                  </div>
                </div>

              
            </div>
            <div style={{display: this.props.isMobile ? 'none' : '', height: '475px', border: '1px solid lightgrey'}}></div>

            <div style={{width: this.props.isMobile ? '100%' : '50%',flexDirection: 'column', justifyContent: 'space-around'}}>
              <h4>Debit</h4>
              <div style={{width: '100%'}}>
                  <Table
                    style={{backgroundColor: ''}}
                    height={'250px'}
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
                      displayRowCheckbox={false}
                      deselectOnClickaway={this.state.deselectOnClickaway}
                      showRowHover={this.state.showRowHover}
                      stripedRows={this.state.stripedRows}
                    >
                    { Object.keys(this.state.debitArray).length > 0 ? (Object.values(this.state.debitArray).map(function(debit, index) {
                      return (
                          <TableRow key={index}>
                            <TableRowColumn style={{width: '10%'}}>{debit.category}</TableRowColumn>
                            <TableRowColumn style={{width: '10%'}}>{debit.amt}</TableRowColumn>
                          </TableRow>
                      )}, this)) : <div><p>{"No Debit Recorded"}</p></div>}
                    </TableBody>
                  </Table>
                  <div style={{height:'25px'}}>
                  <TextField
                  value={this.state.debit.category}
                  style={{width:'30%'}}
                  hintText={"Category"}
                  onChange={this.handleDebitCategory}
                  />
                  <TextField
                  value={this.state.debit.amt}
                  style={{width:'30%',marginLeft:'5%'}}
                  hintText="Amount"
                  onChange={this.handleDebitAmount}
                  />
                  <FloatingActionButton 
                  mini={true}
                  style={{marginLeft:'5%'}}
                  onClick={this.addDebit}
                  >
                    <ContentAdd />
                  </FloatingActionButton>
                  
                  </div>
                </div>

              
            </div>
          </div>
        );

      case 1:
        return (
          <div style={{textAlign:'center'}}>
          <TextField
                  hintText={"No of total participants"}
                  onChange={this.handleParticipants}
                  />
          <br></br>
           <TextField
                  hintText={"No of external participants"}
                  onChange={this.handleParticipants}
                  />
          </div>
        );
      case 2: 
        return (
            <FinishedContainer />
          );
    }
  }

  handleCreditCategory(e) {
    this.setState({credit: {category: e.target.value, amt: this.state.credit.amt}});
  }

  handleCreditAmount(e) {
    this.setState({credit: {amt: e.target.value, category: this.state.credit.category}});
  }
  handleDebitCategory(e) {
    this.setState({debit: {category: e.target.value, amt: this.state.debit.amt}});
  }

  handleDebitAmount(e) {
    this.setState({debit: {amt: e.target.value, category: this.state.debit.category}});
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

  cleanDebit() {
    this.setState({debit: {category: '',amt:''}})
  }

  addDebit(category, amount) {
    let tempDebitArray = this.state.debitArray;
    tempDebitArray.push(this.state.debit);
    this.setState({debitArray: tempDebitArray})
    this.cleanDebit()
  }

  handleNext() {
    const {stepIndex} = this.state;

    if (stepIndex < 1) {
      this.setState({stepIndex: stepIndex + 1});
    }
  }

  handlePrev() {
    const {stepIndex} = this.state;

    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  handleFinish() {
    this.state.finished=true
    console.log(this.state.finished)
    console.log("finished")
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', padding: 15}}>
        <Paper style={{background: '', width: this.props.isMobile? '98%': '90%', height: this.props.isMobile?'700px':'575px', display: 'flex', justifyContent: 'center'}} zDepth={2}>
          <div style={{width: '100%', maxWidth: 700}}>
          {this.state.finished? (<FinishedContainer />) :
            (
              <div style={{width: this.props.isMobile ? '95%' : '85%'}}>
              <Stepper linear={false} activeStep={this.state.stepIndex} orientation={this.props.isMobile ? 'vertical' : 'horizontal'} style={{height: this.props.isMobile? 'auto':'50px',width: '80%', margin: '0 auto'}} connector={<ArrowForwardIcon />}>
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

              <div style={{height: '25px', marginBottom: 12}}>
                <FlatButton
                  label="Back"
                  disabled={this.state.stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{marginRight: '70%',marginTop:'10px'}}
                />
                  <RaisedButton
                    label={this.state.stepIndex === 1 ? 'Submit' : 'Next'}
                    primary={true}
                    onClick={this.state.stepIndex===1? this.handleFinish : this.handleNext}
                  />
              </div>
            </div>
          )}
          </div>
        </Paper>

      </div>
    )
  }
}

function mapStateToProps(state) {
  const {isMobile} = state.toggler
  const {user, currEvent} = state.authentication
  return {
    isMobile,
    user,
    currEvent
  }   
}
export default connect(mapStateToProps)(postEventComponent);