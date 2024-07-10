import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShortUrlDto {
  @IsString()
  @IsNotEmpty()
  target: string;
}
