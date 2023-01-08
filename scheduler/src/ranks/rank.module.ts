import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from "../commons/common.module"
import { RankService } from './rank.service';
import { Rank } from './rank.entity';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([Rank]),
  ],
  controllers: [],
  providers: [RankService],
})
export class RankModule {}
