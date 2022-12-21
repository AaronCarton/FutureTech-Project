import { Test, TestingModule } from '@nestjs/testing'
import { VanResolver } from './van.resolver'
import { VanService } from './van.service'

describe('VanResolver', () => {
  let resolver: VanResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VanResolver, VanService],
    }).compile()

    resolver = module.get<VanResolver>(VanResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
