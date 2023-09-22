import { Injectable } from '@nestjs/common';
import { Image } from './entities/image.entity';
import { CommonDto } from 'src/common.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
  constructor(@InjectRepository(Image) private readonly imageRepository: Repository<Image>) {}

  create(imageDto: CommonDto<Image>) {
    const image = this.imageRepository.create(imageDto);
    return this.imageRepository.save(image);
  }

  findAll() {
    return this.imageRepository.find();
  }

  findOne(id: number) {
    return this.imageRepository.findOneBy({ id: id });
  }

  async update(id: number, imageDto: CommonDto<Image>) {
    const image = await this.findOne(id);
    if (!image) return;
    Object.keys(imageDto).forEach((k: keyof Image) => (image as Record<string, any>)[k] = imageDto[k]);
    return this.imageRepository.save(image);
  }

  remove(id: number) {
    return this.imageRepository.delete({
      id: id
    });
  }
}
