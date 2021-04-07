import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductModule } from './product.module';
import { Product, ProductSchema } from './product.schema';
import { ProductService } from './product.service';
import config from '../config/keys';
describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          { name: Product.name, schema: ProductSchema },
        ]),
        ProductModule,
        MongooseModule.forRoot(config.mongoUri),
      ],
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
