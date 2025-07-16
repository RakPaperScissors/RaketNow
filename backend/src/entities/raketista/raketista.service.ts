import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRaketistaDto } from './dto/create-raketista.dto';
import { UpdateRaketistaDto } from './dto/update-raketista.dto';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Raketista } from './entities/raketista.entity';
import { userRole } from '../user/entities/user.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class RaketistaService {
  constructor(
    @InjectRepository(Raketista)
    private readonly raketistas: Repository<Raketista>) {}

  // --- Basic CRUD functions for Raketistas ---
  // 1. Create a new Raketista
  async create(createRaketistaDto: CreateRaketistaDto) {
    // Creates new raketista based on inputted details
    const raketista = this.raketistas.create( {...createRaketistaDto, role: userRole.RAKETISTA} );
    // Returns and create new raketista to database
    return await this.raketistas.save(raketista);
  }

  // 2. Find all Raketistas
  async findAll() {
    return await this.raketistas.find();
  }

  // 3. Find one raketista by uid
  async findOne(uid: number) {
    return await this.raketistas.findOne({
      where: { uid, role: userRole.RAKETISTA},
      relations: ['raketistaSkills', 'raketistaSkills.skill']
    });
  }

  // 4. Update a raketista by uid
  async update(uid: number, updateRaketistaDto: UpdateRaketistaDto) {
    // Finds the raketista by uid
    const findRaketista = await this.findOne(uid);
    if(!findRaketista) {
      // Throw an error if raketista is not found
      throw new NotFoundException(`Raketista with uid ${uid} not found`);
    }
    // Updates the raketista with the new details
    Object.assign(findRaketista, updateRaketistaDto);
    return await this.raketistas.save(findRaketista);
  }

  // 5. Delete a raketista by uid
  async remove(uid: number) {
    // Finds the raketista by uid
    const findRaketista = await this.findOne(uid);
    if(!findRaketista) {
      // Throw new not found exception if raketista is not found
      throw new NotFoundException('Raketista not found');
    } else {
      return await this.raketistas.delete(uid);
    }
  }

  // --- Search and Filter functions ---
  // 1. Search raketista by name
  async searchByRaketistaName(name: string) {
    // Searches for raketista by their name using ILike for incomplete inputs (part of name only)
    return await this.raketistas.find({ where: { role: userRole.RAKETISTA, firstName: ILike(`%${name}%`), lastName: ILike(`%${name}%`) } });
  }
  
}
