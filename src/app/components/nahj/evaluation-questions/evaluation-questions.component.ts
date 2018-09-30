import { evaluation } from './../../../services/MainAdminEvaluation/evaluation';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { questionDetails } from '../../../services/MainAdminEvaluation/questionsDetails';
import { questionType } from '../../../services/MainAdminEvaluation/questionType';
import { ConfigService } from '../../../services/config';

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

  url: string;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private questionDetails: questionDetails,
    private evaluation: evaluation,
    private questionType: questionType,
    private configService: ConfigService
  ) {
    this.url = this.configService.url;
  }

  ngOnInit() {
    this.clearAllInputs();
  }
  handleEditQuestionChanges() {
    this.edit = false;
  }
  handleAddQuestionChanges() {
    this.add = false;
    this.clearAllInputs()
  }

  clearAllInputs() {
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
  evaluationClicked($event) {
    this.questions = [];
    this.clearAllInputs();
    this.selectedEvaluation = $event.item.id;
    this.questionGroups = $event.item.questionGroup;
    // let arr = this.questionGroups.map(item => item.id)
    // this.getQuestions(arr);
  }
  getQuestions(id) {
    this.questionDetails.service({
      method: "GET",
      url: this.url
    }).subscribe(data => {
      data['data'].evaluations.map(evaluation=>{
        if (evaluation.id == this.selectedEvaluation) {
          evaluation.questionGroup.map(qgroup=>{
            if (qgroup.id == id) {
              this.questions = qgroup.questions
            }
          })
        }
      })
    })
  }
  getQuestionDetails(question) {
    this.selectedQuestion = question;
    this.form = this.fb.group({
      questionGroup: [this.form.value.questionGroup],
      question: [question.question],
      details: [question.details],
      enhancement: [question.enhancement],
      weight: [question.weight],
      multiSelect: [question.multiSelect],
      isPercentage: [question.isPercentage],
      isEqualWeights: [question.isEqualWeights]
    })
  }
  getQuestionGroupDetails(question) {
    this.selectedQuestion = question;
    this.getQuestions('');
    this.clearAllInputs();
  }

  addNewQuestion() {
    this.questionDetails.service({
      method: "PUT",
      url: this.url,
      question: this.form.value.question,
      details: this.form.value.details,
      enhancement: this.form.value.enhancement,
      weight: this.form.value.weight,
      multiSelect: this.form.value.multiSelect,
      isPercentage: this.form.value.isPercentage ? this.form.value.isPercentage : false,
      isEqualWeights: this.form.value.isEqualWeights ? this.form.value.isEqualWeights : false,
      id: this.form.value.questionGroup
    }).subscribe(data => {
      this.add = true;
      console.log("this.form.value.questionGroup", this.form.value.questionGroup)
      this.clearAllInputs();
      this.getQuestions(this.form.value.questionGroup);
    })
  }

  editQuestion() {
    if (this.selectedQuestion) {
      this.questionDetails.service({
        method: "POST",
        url: this.url,
        id: this.selectedQuestion.id,
        question: this.form.value.question,
        details: this.form.value.details,
        enhancement: this.form.value.enhancement,
        weight: this.form.value.weight,
        multiSelect: this.form.value.multiSelect,
        isPercentage: this.form.value.isPercentage,
        isEqualWeights: this.form.value.isEqualWeights
      }).subscribe(data => {
        this.edit = true;
        this.clearAllInputs();
        this.getQuestions(this.selectedQuestion.questionGroup);
      })
    }
  }

  deleteQuestion() {
    if (this.selectedQuestion) {
      this.questionDetails.service({
        method: "DELETE",
        url: this.url,
        id: this.selectedQuestion.id
      }).subscribe(data => {
        this.getQuestions(this.selectedQuestion.questionGroup);
        this.clearAllInputs();
      })
    }
  }

}
