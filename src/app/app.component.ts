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

  /**
   * Used for deleting action recognition
   * If false, it means that TextInput is outside of container, and we probably should delete it
   * Is changing in edge callback
   */
  isInBounds = true;

  /**
   * Calculates top position of text in preview
   * Called from template
   *
   * @param text source data for calculating
   */
  getTop = (text: TextInput) => `${text.position.y / 9}%`;
  getLeft = (text: TextInput) => `${text.position.x / 9}%`;
  getTransform = (image: ImageWithHistory) => `scale(${image.current.zoom}) rotate(${image.current.rotate}deg)`;

  constructor(private store$: Store<State>) {
  }

  /**
   * Called when user clicks on image preview
   * Selects image to edit
   *
   * @param index index of image to select
   */
  selectImage(index: number): void {
    this.store$.dispatch(ImageActions.setEditingImageAction({index}));
  }

  /**
   * Called when user clicks on 'NEW TEXT BLOCK BUTTON'
   * Used for adding TextInput object into inputs array of EditingImage object
   */
  addTextBlock(): void {
    this.store$.dispatch(ImageActions.addInputToImageAction());
  }

  /**
   * Called when user clicks on 'ZOOM IN'
   * Used for image zooming in
   * Multiplies zoom factor by 1.1
   */
  zoomIn(): void {
    this.store$.dispatch(ImageActions.zommInAction());
  }

  /**
   * Called when user clicks on 'ZOOM OUT'
   * Used for image zooming out
   * Multiplies zoom factor by 0.9
   */
  zoomOut(): void {
    this.store$.dispatch(ImageActions.zommOutAction());
  }

  /**
   * Called when user clicks on 'ROTATE'
   * Used for image rotating
   * Adds 45 degrees on every click
   */
  rotate(): void {
    this.store$.dispatch(ImageActions.rotateAction());
  }

  /**
   * (change) callback from text input
   * Called when users inputs text
   * Used for store updating
   *
   * @param event input event
   * @param input text input caused event
   */
  updateContent(event: Event, input: TextInput): void {
    this.store$.dispatch(ImageActions.updateContentAction({event, input}));
  }

  /**
   * Called when user clicks on 'UNDO'
   * Used for undo action
   * Replaces 'current' field in ImageWithHistory object
   */
  undo(): void {
    this.store$.dispatch(ImageActions.undoAction());
  }

  /**
   * Called when user clicks on 'REDO'
   * Used for redo action
   * Replaces 'current' field in ImageWithHistory object
   */
  redo(): void {
    this.store$.dispatch(ImageActions.redoAction());
  }

  /**
   * Called when user stops dragging
   * Used for saving of position of text input or text input deleting
   */
  dragStopped(event: IPosition, input: TextInput): void {
    if (event.x === input.position.x && event.y === input.position.y) {
      return;
    }
    if (this.isInBounds) { // if input is inside of image
      this.store$.dispatch(ImageActions.savePositionAction({
        event, input
      }));
    } else { // if input isn't inside of image
      if (window.confirm('Are you sure you want to remove this input?')) {
        this.store$.dispatch(ImageActions.deleteTextAction({input})); // delete input
      } else {
        this.store$.dispatch(ImageActions.updatePositionAction()); // restore position of input
      }
    }
  }

  /**
   * Called during text input dragging
   * Used for isInBounds field updating
   *
   * @param event edge event from TextInput
   */
  edge(event: { top: boolean, bottom: boolean, right: boolean, left: boolean }): void {
    this.isInBounds = event.top && event.bottom && event.right && event.left;
  }
}
