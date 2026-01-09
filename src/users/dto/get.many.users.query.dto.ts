import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class GetManyUsersQueryDTO {
  @IsOptional()
  search: string | undefined | null;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize: number = 10;

  @IsOptional()
  @IsInt()
  @Min(1)
  pageNumber: number = 1;

  get take(): number {
    return this.pageSize;
  }

  get skip(): number {
    return this.pageSize * (this.pageNumber - 1);
  }
}
