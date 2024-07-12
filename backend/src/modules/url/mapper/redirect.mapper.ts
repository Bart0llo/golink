import { Metadata, Url } from '@prisma/client';
import { IRedirectMapper } from '../interface/redirectProps.interface';

export class RedirectMapper implements IRedirectMapper {
  redirectUrl: string;
  metaTags?: {
    title: string;
    description: string;
    image: string;
    color: string;
    url: string;
    type: string;
  };
  constructor(values: IRedirectMapper) {
    Object.assign(this, values);
  }

  public static map(data: Url & { metadata: Metadata | null }) {
    if (data.useMetadata) {
      return new RedirectMapper({
        redirectUrl: data.protocol + data.longUrl,
        metaTags: {
          title: data.metadata.title || null,
          description: data.metadata.description || null,
          image: data.metadata.contentUrl || null,
          color: data.metadata.color || null,
          url: data.metadata.withUrl || null,
          type: data.metadata.type,
        },
      });
    } else {
      return new RedirectMapper({
        redirectUrl: data.protocol + data.longUrl,
      });
    }
  }
}
