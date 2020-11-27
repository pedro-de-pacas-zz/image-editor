import { createAction, props } from '@ngrx/store';
import { TextInput } from '../../entities/image';
import { IPosition } from 'angular2-draggable';

export const setEditingImageAction = createAction(
  '[EDITING IMAGE] set',
  props<{ index: number }>()
);

export const addInputToImageAction = createAction(
  '[EDITING IMAGE] add input'
);

export const zommInAction = createAction(
  '[EDITING IMAGE] zoom in'
);

export const zommOutAction = createAction(
  '[EDITING IMAGE] zoom out'
);

export const rotateAction = createAction(
  '[EDITING IMAGE] rotate'
);

export const updateContentAction = createAction(
  '[EDITING IMAGE] update content',
  props<{ event: Event, input: TextInput }>()
);

export const undoAction = createAction(
  '[EDITING IMAGE] undo'
);

export const redoAction = createAction(
  '[EDITING IMAGE] redo'
);

export const savePositionAction = createAction(
  '[EDITING IMAGE] text position changed',
  props<{ event: IPosition, input: TextInput }>()
);

export const deleteTextAction = createAction(
  '[EDITING IMAGE] delete text',
  props<{ input: TextInput }>()
);

export const updatePositionAction = createAction(
  '[EDITING IMAGE] position updated'
);
