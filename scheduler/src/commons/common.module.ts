import { Module } from '@nestjs/common';
import { HltvRepository } from './repositories/hltv.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [HltvRepository],
  exports: [HltvRepository]
})
export class CommonModule { }
