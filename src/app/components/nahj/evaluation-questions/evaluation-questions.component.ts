import { evaluation } from './../../../services/MainAdminEvaluation/evaluation';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { questionDetails } from '../../../services/MainAdminEvaluation/questionsDetails';

@Component({
  selector: 'app-evaluation-questions',
  templateUrl: './evaluation-questions.component.html',
  styleUrls: ['./evaluation-questions.component.scss']
})
export class EvaluationQuestionsComponent implements OnInit {

  updateFilter: boolean = false;
  selectedEvaluation;
  selectedQuestion;
  questionGroups;
  questions = [];
  edit = true;
  add = true;

  url: string = 'http://localhost:4466';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private questionDetails: questionDetails,
    private evaluation: evaluation
  ) { }

  ngOnInit() {
    this.clearAllInputs();
  }
  handleEditQuestionChanges(){
    this.edit = false;
  }
  handleAddQuestionChanges(){
    this.add = false;
    this.clearAllInputs()
  }

  clearAllInputs(){
    this.form = this.fb.group({
      questionGroup: ['', Validators.required],
      question: ['', Validators.required],
      details: ['', Validators.required],
      enhancement: ['', Validators.required],
      weight: ['', Validators.required],
      multiSelect: ['', Validators.required],
      isPercentage: [false, Validators.required],
      isEqualWeights: [false, Validators.required]
		})
  }
  // list functions
	evaluationClicked($event){
		this.selectedEvaluation = $event.id;
    console.log("clciked", $event)
    this.questionGroups = $event.questionGroup;
  }
  getQuestions(id){
    this.evaluation.service({
      method: "GET",
      url: this.url
    }).subscribe(data=>{
      data['data'].evaluations.map((evaluations, index)=>{
        if(!id && index==0){
          this.questions = evaluations.questionGroup.questions;
        }else if(id == evaluations.id){
          this.questions = evaluations.questionGroup.questions;
        }
        console.log("ss", this.questions)
      })
    })
  }
  getQuestionDetails(question){
    if(question){
      this.selectedQuestion = question;
      this.form = this.fb.group({
        questionGroup: [this.form.value.questionGroup, Validators.required],
        question: [question.question, Validators.required],
        details: [question.details, Validators.required],
        enhancement: [question.enhancement, Validators.required],
        weight: [question.weight, Validators.required],
        multiSelect: [question.multiSelect, Validators.required],
        isPercentage: [question.isPercentage, Validators.required],
        isEqualWeights: [question.isEqualWeights, Validators.required]
      })
    }
  }
  getQuestionGroupDetails(question){
		this.selectedQuestion = question;
		console.log("question",question)
		this.clearAllInputs();
  }
  
  addNewQuestion(){
    if (this.form.valid) {
      this.questionDetails.service({
        method: "PUT",
        url: this.url,
        question:this.form.value.question,
        details:this.form.value.details,
        enhancement:this.form.value.enhancement,
        weight:this.form.value.weight,
        multiSelect:this.form.value.multiSelect,
        isPercentage:this.form.value.isPercentage,
        isEqualWeights:this.form.value.isEqualWeights,
        questionTypeId: this.form.value.questionGroup
      }).subscribe(data => {
        this.add = true;
        this.getQuestions(this.form.value.questionGroup);
      })
    }
  }

  editQuestion(){
    if (this.selectedQuestion) {
      this.questionDetails.service({
        method: "POST",
        url: this.url,
        Id: this.selectedQuestion.id,
        question:this.form.value.question,
        details:this.form.value.details,
        enhancement:this.form.value.enhancement,
        weight:this.form.value.weight,
        multiSelect:this.form.value.multiSelect,
        isPercentage:this.form.value.isPercentage,
        isEqualWeights:this.form.value.isEqualWeights
      }).subscribe(data => {
        this.edit = true;
        this.getQuestions(this.selectedQuestion.questionGroup);
      })
    }
  }

  deleteQuestion(){
    if (this.selectedQuestion) {
      this.questionDetails.service({
        method: "DELETE",
        url: this.url,
        Id: this.selectedQuestion.id
      }).subscribe(data => {
        this.getQuestions(this.selectedQuestion.questionGroup);
        this.clearAllInputs();
      })
    }
  }

}
