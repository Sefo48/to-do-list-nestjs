import { IsBoolean, IsInt, IsString } from "class-validator";

export class CreateTaskDto {

  @IsInt()
  readonly id: number;

  @IsString()
  readonly userEmail: string;

  @IsString()
  readonly text: string;

  @IsBoolean()
  readonly isCheck: boolean;
}