import React, {Component} from 'react';
import axios from 'axios';
import {firebaseDB} from '../../../firebaseConfig'
import firebase from 'firebase'
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
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle'

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
      totalParticipants:0,
      externalParticipants:0,
      tParticipantsError:'',
      eParticipantsError:'',
      creditCatError:'',
      creditAmtError:'',
      debitCatError:'',
      debitAmtError:'',
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
      notes: '',
      finished: false
    };
    this.getStepContent = this.getStepContent.bind(this);
    this.handleCreditCategory = this.handleCreditCategory.bind(this);
    this.handleCreditAmount = this.handleCreditAmount.bind(this);
    this.handleDebitCategory = this.handleDebitCategory.bind(this);
    this.handleDebitAmount = this.handleDebitAmount.bind(this);
    this.handleExternalParticipants = this.handleExternalParticipants.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTotalParticipants = this.handleTotalParticipants.bind(this);
    this.handleRemoveDebit = this.handleRemoveDebit.bind(this);
    this.addCredit = this.addCredit.bind(this);
    this.addDebit = this.addDebit.bind(this);
    this.cleanCredit = this.cleanCredit.bind(this);
    this.handleRemoveCredit = this.handleRemoveCredit.bind(this);
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div style={{display: 'flex', textAlign: 'center'}} height={'440px'}>
            <div style={{height: this.props.isMobile? 'auto':'400px',width: '100%', flexDirection: 'column', justifyContent: 'space-around'}}>
              <h4>Credit</h4>
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
                        <TableHeaderColumn style={{color: '#000', fontWeight: 700, width: '10%'}}>Action</TableHeaderColumn>
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
                            <TableRowColumn style={{width: '10%'}}>
                              <IconButton tooltip="remove" iconStyle={{color: '#03a9f4'}} onClick={()=>this.handleRemoveCredit(index)}>
                                <ContentRemoveCircle />
                              </IconButton>
                            </TableRowColumn>

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
                  errorText={this.state.creditCatError}
                  required
                  />
                  <TextField
                  value={this.state.credit.amt}
                  style={{width:'30%',marginLeft:'5%'}}
                  hintText="Amount"
                  onChange={this.handleCreditAmount}
                  errorText={this.state.creditAmtError}
                  required
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
          </div>
        );

      case 1:
        return (
          <div style={{display: 'flex', textAlign: 'center'}} height={'440px'}>
            <div style={{height: this.props.isMobile? 'auto':'400px', width:'100%' ,flexDirection: 'column', justifyContent: 'space-around'}}>
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
                        <TableHeaderColumn style={{color: '#000', fontWeight: 700, width: '10%'}}>Action</TableHeaderColumn>
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
                            <TableRowColumn style={{width: '10%'}}>
                              <IconButton tooltip="remove" iconStyle={{color: '#03a9f4'}} onClick={()=>this.handleRemoveDebit(index)}>
                                <ContentRemoveCircle />
                              </IconButton>
                            </TableRowColumn>
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
                  errorText={this.state.debitCatError}
                  required

                  />
                  <TextField
                  value={this.state.debit.amt}
                  style={{width:'30%',marginLeft:'5%'}}
                  hintText="Amount"
                  onChange={this.handleDebitAmount}
                  errorText={this.state.debitAmtError}
                  required
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

        )
      case 2: 
        return (
          <div style={{textAlign:'center', marginTop: '10%'}}>
          <TextField
                  floatingLabelText={"Total participants"}
                  onBlur={this.handleTotalParticipants}
                  errorText={this.state.tParticipantsError}
                  required
                  />
          <br></br>
           <TextField
                  floatingLabelText={"External participants"}
                  onBlur={this.handleExternalParticipants}
                  errorText={this.state.eParticipantsError}
                  required
                  />
          <br></br>
          <TextField 
            multiLine={true}
            rows={1}
            rowsMax={this.props.isMobile ? 3 : 5}
            style={{textAlign: 'left'}}
            floatingLabelText="Notes" 
            type="text"
            onChange={this.handleNotes}
            value={this.state.notes}
          />
          </div>
        );
    }
  }

  handleNotes(e) {
    this.setState({notes:e.target.value})
  }

  handleRemoveCredit(index) {
    var credArr = this.state.creditArray
    if(credArr.length==1) {
      this.setState({creditArray: []})
    } else {
      delete credArr[index]
      var newCredArr = []
      var j=0
      for (var i = 0; i < credArr.length-1; i++) {
        if(j==index)j++;
        newCredArr[i] = credArr[j++];
      }
      this.setState({creditArray: newCredArr})
    }
  }

  handleRemoveDebit(index) {
    var debArr = this.state.debitArray
    if(debArr.length==1) {
      this.setState({debitArray: []})
    } else {
      delete debArr[index]
      var newDebArr = []
      var j=0
      for (var i = 0; i < debArr.length-1; i++) {
        if(j==index)j++;
        newDebArr[i] = debArr[j++];
      }
      this.setState({debitArray: newDebArr})
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
    if(this.state.credit.category=='' || this.state.credit.amt=='') {
      if(this.state.credit.category=='') {
        this.setState({creditCatError:'This field is empty'})
      }
      if(this.state.credit.amt=='') {
        this.setState({creditAmtError:'This field is empty'})
      }
    } else {
      this.setState({creditCatError:'',creditAmtError:''})
      let tempCreditArray = this.state.creditArray;
      tempCreditArray.push(this.state.credit);
      this.setState({creditArray: tempCreditArray})
      this.cleanCredit()
    }
  }

  cleanCredit() {
    this.setState({credit: {category: '',amt:''}})
  }

  cleanDebit() {
    this.setState({debit: {category: '',amt:''}})
  }

  addDebit(category, amount) {
    if(this.state.debit.category=='' || this.state.debit.amt=='') {
      if(this.state.debit.category=='') {
        this.setState({debitCatError:'This field is empty'})
      }
      if(this.state.debit.amt=='') {
        this.setState({debitAmtError:'This field is empty'})
      }
    }else {
      this.setState({debitCatError:'',debitAmtError:''})
      let tempDebitArray = this.state.debitArray;
      tempDebitArray.push(this.state.debit);
      this.setState({debitArray: tempDebitArray})
      this.cleanDebit()
    }
  }

  handleNext() {
    const {stepIndex} = this.state;
    if(stepIndex==0 && this.state.creditArray.length==0) {
      // credit
      if(this.state.credit.category=='') {
        this.setState({creditCatError:'This field is empty'})
      }
      if(this.state.credit.amt=='') {
        this.setState({creditAmtError:'This field is empty'})
      }
    } else if(stepIndex==1 && this.state.debitArray.length==0) {
      console.log("hello")
      if(this.state.debit.category=='') {
        this.setState({debitCatError:'This field is empty'})
      }
      if(this.state.debit.amt=='') {
        this.setState({debitAmtError:'This field is empty'})
      }
    } else {
      this.setState({creditCatError:'',creditAmtError:'',debitCatError:'',debitAmtError:''})
      if (stepIndex < 2) {
        this.setState({stepIndex: stepIndex + 1});
      }
    }
  }

  handlePrev() {
    const {stepIndex} = this.state;

    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  handleSubmit() {
    if(this.state.totalParticipants==0 || this.state.externalParticipants==0) {
      if(this.state.totalParticipants==0) {
        this.setState({tParticipantsError:'This field is empty'})
      }
      if(this.state.externalParticipants==0) {
        this.setState({eParticipantsError:'This field is empty'})
      }
    } else {
      this.setState({tParticipantsError:'', eParticipantsError:''})
      var eventID = this.props.currEvent.key
      var updates = {};
      updates['/events/' + eventID + '/postEventDetails/creditArray'] = this.state.creditArray;
      updates['/events/' + eventID + '/postEventDetails/debitArray'] = this.state.debitArray;
      updates['/events/' + eventID + '/postEventDetails/totalParticipants'] = this.state.totalParticipants;
      updates['/events/' + eventID + '/postEventDetails/externalParticipants'] = this.state.externalParticipants;
      updates['/events/' + eventID + '/postEventDetails/notes'] = this.state.notes;
      updates['/events/' + eventID + '/postEventFlag'] = true;
      firebaseDB.ref().update(updates)
      this.setState({finished:true})
    }
  }

  handleTotalParticipants(e) {
    this.setState({totalParticipants: e.target.value})
  }

  handleExternalParticipants(e) {
    this.setState({externalParticipants: e.target.value})
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', padding: 15}}>
        <Paper style={{background: '', width: this.props.isMobile? '98%': '90%', height: this.props.isMobile?'700px':'575px', display: 'flex', justifyContent: 'center'}} zDepth={2}>
          <div style={{width: '100%', maxWidth: 700}}>
          {this.state.finished? (<FinishedContainer event={this.props.currEvent}/>) :
            (
              <div style={{width: this.props.isMobile ? '95%' : '85%'}}>
              <Stepper linear={false} activeStep={this.state.stepIndex} orientation={this.props.isMobile ? 'vertical' : 'horizontal'} style={{height: this.props.isMobile? 'auto':'50px',width: '80%', margin: '0 auto'}} connector={this.props.isMobile?<NavigationArrowDownward />:<ArrowForwardIcon />}>
                <Step>
                  <StepLabel>Credit</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Debit</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Participation</StepLabel>
                </Step>
              </Stepper>

              {this.getStepContent(this.state.stepIndex)}

              <div style={{height: '25px', marginBottom: 12, marginTop: this.props.isMobile?60:24}}>
                <FlatButton
                  label="Back"
                  disabled={this.state.stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{marginRight: this.props.isMobile?'50%':'70%',marginTop:'10px'}}
                />
                  <RaisedButton
                    label={this.state.stepIndex === 2 ? 'Submit' : 'Next'}
                    primary={true}
                    onClick={this.state.stepIndex===2? this.handleSubmit : this.handleNext}
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