import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { RaketPicturesService } from './raket-pictures.service';
import { CreateRaketPictureDto } from './dto/create-raket-picture.dto';
import { UpdateRaketPictureDto } from './dto/update-raket-picture.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('raketPictures')
export class RaketPicturesController {
  constructor (private readonly raketPicturesService: RaketPicturesService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file')) // This tells NestJS to expect a file in a field named 'file'
  create(
    @Body() createRaketPictureDto: CreateRaketPictureDto, // This will contain { raketId: '...' } from form-data
    @UploadedFile( // Use a pipe to validate the uploaded file
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }), // 10MB limit
          new FileTypeValidator({ fileType: /(jpeg|png)$/ }),
        ],
      }),
    ) file: Express.Multer.File,
  ) {
    // Pass both the DTO and the file to the service
    return this.raketPicturesService.create(createRaketPictureDto, file);
  }

  @Get()
  findAll() {
    return this.raketPicturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raketPicturesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRaketPictureDto: UpdateRaketPictureDto) {
    return this.raketPicturesService.update(+id, updateRaketPictureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raketPicturesService.remove(+id);
  }
}
