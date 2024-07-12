export function parseContentType(contentType: string) {
  const splitted = contentType.split(';');
  return {
    type: splitted[0].split('/')[0],
    subtype: splitted[0].split('/')[1],
  };
}
