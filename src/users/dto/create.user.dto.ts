import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  telegramId: number;

  @IsOptional()
  name?: string | null;

  @IsOptional()
  lastName?: string | null;

  @IsOptional()
  wallet?: number | null;

  @IsOptional()
  @IsArray()
  @Type(() => FavoriteModelDTO)
  favoriteModels?: FavoriteModelDTO[] = [];

  @IsOptional()
  createdDate?: Date | null;
}

export class FavoriteModelDTO {
  id: string;
  @IsNotEmpty()
  modelId: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  architecture: string;
}
