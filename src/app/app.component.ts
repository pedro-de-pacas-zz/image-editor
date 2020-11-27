import { Component } from '@angular/core';
import { ImageWithHistory, TextInput } from './entities/image';
import { IPosition } from 'angular2-draggable';
import { ImageFacade } from './facades/image.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'image-editor';

  /**
   * Used for deleting action recognition
   * If false, it means that TextInput is outside of container, and we probably should delete it
   * Is changing in edge callback
   */
  isInBounds = true;

  /**
   * Share facade methods
   */
  selectedImage$ = this.imageFacade.selectedImage$;
  images$ = this.imageFacade.images$;
  zoom$ = this.imageFacade.zoom$;
  rotate$ = this.imageFacade.rotate$;
  disableUndo$ = this.imageFacade.disableUndo$;
  disableRedo$ = this.imageFacade.disableRedo$;

  /**
   * Calculates top position of text in preview
   * Called from template
   *
   * @param text source data for calculating
   */
  getTop = (text: TextInput) => `${text.position.y / 9}%`;

  /**
   * Calculates left position of text in preview
   * Called from template
   *
   * @param text source data for calculating
   */
  getLeft = (text: TextInput) => `${text.position.x / 9}%`;

  /**
   * Create transform string for preview
   * Called from template
   *
   * @param image source data for transform function
   */
  getTransform = (image: ImageWithHistory) => `scale(${image.current.zoom}) rotate(${image.current.rotate}deg)`;

  constructor(private imageFacade: ImageFacade) {
  }

  /**
   * Called when user clicks on image preview
   * Selects image to edit
   *
   * @param index index of image to select
   */
  selectImage(index: number): void {
    this.imageFacade.selectImage(index);
  }

  /**
   * Called when user clicks on 'NEW TEXT BLOCK BUTTON'
   * Used for adding TextInput object into inputs array of EditingImage object
   */
  addTextBlock(): void {
    this.imageFacade.addTextBlock();
  }

  /**
   * Called when user clicks on 'ZOOM IN'
   * Used for image zooming in
   * Multiplies zoom factor by 1.1
   */
  zoomIn(): void {
    this.imageFacade.zoomIn();
  }

  /**
   * Called when user clicks on 'ZOOM OUT'
   * Used for image zooming out
   * Multiplies zoom factor by 0.9
   */
  zoomOut(): void {
    this.imageFacade.zoomOut();
  }

  /**
   * Called when user clicks on 'ROTATE'
   * Used for image rotating
   * Adds 45 degrees on every click
   */
  rotate(): void {
    this.imageFacade.rotate();
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
    this.imageFacade.updateContent(event, input);
  }

  /**
   * Called when user clicks on 'UNDO'
   * Used for undo action
   * Replaces 'current' field in ImageWithHistory object
   */
  undo(): void {
    this.imageFacade.undo();
  }

  /**
   * Called when user clicks on 'REDO'
   * Used for redo action
   * Replaces 'current' field in ImageWithHistory object
   */
  redo(): void {
    this.imageFacade.redo();
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
      this.imageFacade.savePosition(event, input);
    } else { // if input isn't inside of image
      if (window.confirm('Are you sure you want to remove this input?')) {
        this.imageFacade.deleteTextInput(input);
      } else {
        this.imageFacade.updatePosition();
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
