/**
 * @param {string} pathOrUrl
 */
export default function getFileExtension(pathOrUrl) {
  const ext = (/[.]/.exec(pathOrUrl)) ? /[^.]+$/.exec(pathOrUrl)[0] : '';
  const extWoParam = ext.split('?')[0];

  if (extWoParam !== '') {
    return extWoParam;
  }

  return false;
}
