import {ApiProperty} from "@nestjs/swagger";

export class JwtPayloadDto {

  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
}
