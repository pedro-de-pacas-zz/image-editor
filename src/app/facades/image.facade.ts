import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../reducers';
import { Observable } from 'rxjs';
import { EditingImage, ImageWithHistory, TextInput } from '../entities/image';
import * as ImageSelectors from '../reducers/images/editing-image.selector';
import { map } from 'rxjs/operators';
import * as ImageActions from '../reducers/images/editing-image.actions';
import { IPosition } from 'angular2-draggable';

@Injectable()
export class ImageFacade {
  /**
   * observables for template updating
   */
  public selectedImage$: Observable<EditingImage> = this.store$.pipe(select(ImageSelectors.selectEditingImage));
  public images$: Observable<ImageWithHistory[]> = this.store$.pipe(select(ImageSelectors.selectImages));
  public zoom$: Observable<number> = this.store$.pipe(select(ImageSelectors.zoomLevel));
  public rotate$: Observable<number> = this.store$.pipe(select(ImageSelectors.rotateAngle));
  public disableUndo$: Observable<boolean> = this.store$.pipe(select(ImageSelectors.selectImageWithHistory),
    map(image => image.previous.length === 0));
  public disableRedo$: Observable<boolean> = this.store$.pipe(select(ImageSelectors.selectImageWithHistory),
    map(image => image.next.length === 0));

  constructor(private store$: Store<State>) {
  }

  selectImage(index: number): void {
    this.store$.dispatch(ImageActions.setEditingImageAction({index}));
  }

  addTextBlock(): void {
    this.store$.dispatch(ImageActions.addInputToImageAction());
  }

  zoomIn(): void {
    this.store$.dispatch(ImageActions.zommInAction());
  }

  zoomOut(): void {
    this.store$.dispatch(ImageActions.zommOutAction());
  }

  rotate(): void {
    this.store$.dispatch(ImageActions.rotateAction());
  }

  updateContent(event: Event, input: TextInput): void {
    this.store$.dispatch(ImageActions.updateContentAction({event, input}));
  }

  undo(): void {
    this.store$.dispatch(ImageActions.undoAction());
  }

  redo(): void {
    this.store$.dispatch(ImageActions.redoAction());
  }

  savePosition(event: IPosition, input: TextInput): void {
    this.store$.dispatch(ImageActions.savePositionAction({
      event, input
    }));
  }

  deleteTextInput(input: TextInput): void {
    this.store$.dispatch(ImageActions.deleteTextAction({input}));
  }

  updatePosition(): void {
    this.store$.dispatch(ImageActions.updatePositionAction());
  }
}
