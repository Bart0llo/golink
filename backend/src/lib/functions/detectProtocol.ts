export function detectProtocol(url: string) {
  const protocolFromUrl = url.split('//');

  if (protocolFromUrl.length === 1) {
    return {
      protocol: 'https://',
      url: protocolFromUrl[0],
    };
  }

  return {
    protocol: protocolFromUrl[0] + '//',
    url: protocolFromUrl[1],
  };
}
