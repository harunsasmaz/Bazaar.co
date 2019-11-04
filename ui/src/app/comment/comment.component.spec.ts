import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Observable, throwError} from 'rxjs';
import {CommentService} from '../services/comment.service';
import {UserService} from '../services/user.service';
import {NgbModal, NgbModalConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {cpus} from 'os';

class MockBuilder {
  private form = new FormBuilder();
  group(config) {
    return this.form.group(config);
  }
}

class MockUser {
  getById(id){
    return new Observable(observer =>
        observer.next({data: {name:'test', surname:'test', gender:'U',
            email:'test@test.com', password:'test', userId:'test', token:'token'}}))
  }
}

class MockModal {
  open(content) {}
}

class MockComment {
  editComment(data) {
    if(data.userId === ''){
      return throwError('Could not add comment');
    }
    return new Observable(observer => observer.next(1));
  }

  deleteComment(commentId,userId){
    if(commentId === ''){
      return throwError('Could not add comment');
    }
    return new Observable(observer => observer.next(1));
  }
}

let config = {
  backdrop: '',
  keyboard: false
};


describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent ],
      imports: [ReactiveFormsModule, NgbModule],
      providers: [
        {provide: FormBuilder, useClass: MockBuilder},
        {provide: CommentService, useClass: MockComment},
        {provide: UserService, useClass: MockUser},
        {provide: NgbModal, useClass: MockModal},
        {provide: NgbModalConfig, useValue: config}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.comment = {
      commentId: 'test',
      userId: 'test',
      productId: 'test',
      title: 'test',
      text: 'test',
      rating: 1
    };

    spyOn(component,'successFunction').and.callFake(() => {});

    component.currentUser = {name:'test', surname:'test', gender:'U',
      email:'test@test.com', password:'test', userId:'test', token:'token'}

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have edit form', function() {
    expect(component.editForm).not.toEqual(undefined);
  });

  it('should have a comment owner', function() {
    expect(component.owner.name).not.toEqual('');
  });

  it('should set submitted to true when onEdit() is called', function() {
    component.editForm.controls.title.setValue('test');
    component.editForm.controls.text.setValue('test');
    component.editForm.controls.rate.setValue(1);
    component.onEdit();
    expect(component.submitted).toEqual(true);
  });

  it('should set success to true when successfully edited', function() {
    component.editForm.controls.title.setValue('test');
    component.editForm.controls.text.setValue('test');
    component.editForm.controls.rate.setValue(1);
    component.onEdit();
    expect(component.success).toEqual(true);
  });

  it('should have error message when an error occurred while editing', function() {
    component.currentUser.userId = '';
    component.editForm.controls.title.setValue('test');
    component.editForm.controls.text.setValue('test');
    component.editForm.controls.rate.setValue(1);
    component.onEdit();
    expect(component.error).not.toEqual('');
  });

  it('should set success to true when onDelete() called', function() {
    component.onDelete();
    expect(component.success).toEqual(true);
  });

  it('should call deleteComment method of comment service when onDelete() called', function() {
    spyOn(component.commentService,'deleteComment').and.callThrough();
    component.onDelete();
    expect(component.commentService.deleteComment).toHaveBeenCalled()
  });

  it('should have an error message when error occurred in onDelete() method', function() {
    component.comment.commentId = '';
    component.onDelete();
    expect(component.error).not.toEqual('');
  });

  it('should ', function() {
    spyOn(component.modalService,'open').and.callThrough();
    component.open('test');
    expect(component.modalService.open).toHaveBeenCalled();
  });
});
