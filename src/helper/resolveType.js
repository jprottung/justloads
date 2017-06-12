import getFileExtension from './getFileExtension';
import { TYPE_CSS, TYPE_JS } from '../constants/types';

export default function resolveType(url) {
  const ext = getFileExtension(url);
  let type = false;

  if (ext === 'js') {
    type = TYPE_JS;
  } else if (ext === 'css') {
    type = TYPE_CSS;
  }

  return type;
}
