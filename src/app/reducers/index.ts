import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { ImageWithHistory } from '../entities/image';
import { imagesReducer } from './images/editing-image.reducer';

export const editingImageNode = 'appState';

export interface State {
  [editingImageNode]: AppState;
}

export interface AppState {
  images: ImageWithHistory[];
  selectedImage: number;
}

export const reducers: ActionReducerMap<State> = {
  [editingImageNode]: imagesReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
