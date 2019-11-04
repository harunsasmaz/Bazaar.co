import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/User';
import {UserService} from '../services/user.service';
import {CommentService} from '../services/comment.service';
import {Comment} from '../models/Comment';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Input() currentUser: User;
  editForm: FormGroup;
  submitted = false;
  error = '';
  success = false;
  owner: User;
  ownerName = '';
  loading = false;

  constructor(private formBuilder: FormBuilder,
              public modalService:NgbModal,
              private config: NgbModalConfig,
              private userService: UserService,
              public commentService: CommentService)
  {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      title: [this.comment.title, Validators.required],
      text: [this.comment.text, Validators.required],
      rate: [this.comment.rating, Validators.required]
    });

    this.userService.getById(this.comment.userId).pipe(first())
        .subscribe(user => {this.owner = user.data; this.ownerName = this.owner.name.toUpperCase() + ' ' + this.owner.surname.toUpperCase()} );
  }

  open(content) {
    this.modalService.open(content);
  }

  onEdit() {
      this.submitted = true;

      if(this.editForm.invalid){
          return;
      }

      let data = {
        commentId: this.comment.commentId,
        userId: this.currentUser.userId,
        title: this.editForm.controls.title.value,
        text: this.editForm.controls.text.value,
        rating: this.editForm.controls.rate.value
      };

      this.loading = true;
      this.commentService.editComment(data).pipe(first()).subscribe( data =>
          {
            this.error = '';
            this.success = true;
            this.successFunction();
          },

          error =>
          {
              this.error = error;
              this.loading = false;
          }
      )
  }

  onDelete() {

      this.loading = true;
      this.commentService.deleteComment(this.comment.commentId, this.comment.userId).pipe(first()).subscribe(data => {
          this.error = '';
          this.success = true;
          this.successFunction();
      },
        error => {
          this.error = error;
          this.loading = false;
        }
      )
  }

  successFunction() {
      setTimeout(() => {location.reload()}, 1000);
  }


}
