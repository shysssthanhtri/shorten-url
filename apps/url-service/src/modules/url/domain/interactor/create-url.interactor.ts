import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { UrlEntity } from '@/common/domain/entities/url.entity';
import { UrlRepository } from '@/modules/url/domain/repository/url.repository';
import { CreateUrlRequestDto } from '@/modules/url/domain/use-case/create-url/create-url.request-dto';
import { CreateUrlResponseDto } from '@/modules/url/domain/use-case/create-url/create-url.response-dto';
import { CreateUrlUseCase } from '@/modules/url/domain/use-case/create-url/create-url.use-case';

@Injectable()
export class CreateUrlInteractor implements CreateUrlUseCase {
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly dataSource: DataSource,
  ) {}

  async handle(req: CreateUrlRequestDto): Promise<CreateUrlResponseDto> {
    return this.dataSource.transaction(async (manager) => {
      const url = new UrlEntity();
      url.url = req.url;
      url.shortenUrl = req.url;
      url.userId = req.userId;
      const savedUrl = await this.urlRepository.save(manager, url);

      return new CreateUrlResponseDto(savedUrl);
    });
  }
}
