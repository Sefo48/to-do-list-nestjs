export class CreateTaskDto {
  readonly userEmail: string;
  readonly text: string;
  readonly isCheck: boolean;
}