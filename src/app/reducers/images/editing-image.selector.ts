import { createSelector } from '@ngrx/store';
import { editingImageNode, State } from '../index';
import { EditingImage, ImageWithHistory } from '../../entities/image';

const selectFeature = (state: State) => state[editingImageNode];

export const selectEditingImage = createSelector(
  selectFeature,
  (state): EditingImage => state.images[state.selectedImage].current);

export const selectImages = createSelector(
  selectFeature,
  (state): ImageWithHistory[] => state.images);

export const zoomLevel = createSelector(
  selectFeature,
  (state): number => state.images[state.selectedImage].current.zoom);

export const rotateAngle = createSelector(
  selectFeature,
  (state): number => state.images[state.selectedImage].current.rotate);

export const selectImageWithHistory = createSelector(
  selectFeature,
  (state): ImageWithHistory => state.images[state.selectedImage]);
