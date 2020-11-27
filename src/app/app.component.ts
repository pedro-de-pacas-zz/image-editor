import { Component } from '@angular/core';
import { EditingImage, ImageWithHistory, TextInput } from './entities/image';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ImageSelectors from './reducers/images/editing-image.selector';
import * as ImageActions from './reducers/images/editing-image.actions';
import { State } from './reducers';
import { map } from 'rxjs/operators';
import { IPosition } from 'angular2-draggable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'image-editor';

  public selectedImage$: Observable<EditingImage> = this.store$.pipe(select(ImageSelectors.selectEditingImage));
  public images$: Observable<ImageWithHistory[]> = this.store$.pipe(select(ImageSelectors.selectImages));
  public zoom$: Observable<number> = this.store$.pipe(select(ImageSelectors.zoomLevel));
  public rotate$: Observable<number> = this.store$.pipe(select(ImageSelectors.rotateAngle));
  public disableUndo$: Observable<boolean> = this.store$.pipe(select(ImageSelectors.selectImageWithHistory),
    map(image => image.previous.length === 0));
  public disableRedo$: Observable<boolean> = this.store$.pipe(select(ImageSelectors.selectImageWithHistory),
    map(image => image.next.length === 0));

  isInBounds = true;

  getTop = (text: TextInput) => `${text.position.y / 9}%`;
  getLeft = (text: TextInput) => `${text.position.x / 9}%`;
  getTransform = (image: ImageWithHistory) => `scale(${image.current.zoom}) rotate(${image.current.rotate}deg)`;

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

  dragStopped(event: IPosition, input: TextInput): void {
    if (event.x === input.position.x && event.y === input.position.y) {
      return;
    }
    if (this.isInBounds) {
      this.store$.dispatch(ImageActions.savePositionAction({
        event, input
      }));
    } else {
      if (window.confirm('Are you sure you want to remove this input?')) {
        this.store$.dispatch(ImageActions.deleteTextAction({input}));
      } else {
        // restore position of input
        this.store$.dispatch(ImageActions.updatePositionAction());
      }
    }
  }

  drag(event: { top: boolean, bottom: boolean, right: boolean, left: boolean }): void {
    this.isInBounds = event.top && event.bottom && event.right && event.left;
  }
}
