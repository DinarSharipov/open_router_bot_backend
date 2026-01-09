import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  telegramId: number;
  @IsOptional()
  name: string | null;
  @IsOptional()
  lastName: string | null;
  @IsOptional()
  wallet: number | null;
  @IsOptional()
  favoriteModels: string[];
  @IsOptional()
  createdDate: Date | null;
}
