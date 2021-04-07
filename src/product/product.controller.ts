import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { Product } from './product.schema';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  create(@Body() createProduct: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(createProduct);
  }
  @Get()
  get() {
    return this.productService.getAllProducts();
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateProduct: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProducts(id, updateProduct);
  }
  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }
}
