import { Body, Controller, Post } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateShortUrlDto } from './dto/shorturl.dto';
import { ShortUrlMapper } from './mapper/shorturl.mapper';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('short')
  async short(@Body() body: CreateShortUrlDto) {
    return ShortUrlMapper.map(await this.urlService.short(body.target));
  }
}
