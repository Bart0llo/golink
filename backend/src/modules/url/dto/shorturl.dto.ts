import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateShortUrlDto {
  @IsString()
  @IsNotEmpty()
  target: string;

  @IsBoolean()
  @IsNotEmpty()
  withMetatags: boolean;
}
