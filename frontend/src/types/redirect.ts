export interface IRedirectResponse {
  redirectUrl: string;
  metaTags?: {
    title: string;
    description: string;
    image: string;
    color: string;
    url: string;
    type: string;
  };
}
