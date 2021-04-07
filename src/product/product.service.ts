import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create.product.dto';
//import { UpdateProductsDto } from './dto/updateProduct.products.dto';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getAllProducts() {
    // return this.products;
    let product = await this.productModel.find();
    return product;
  }
  async createProduct(createProduct: CreateProductDto): Promise<Product> {
    let product = new this.productModel(createProduct);
    product.save();
    return product;
  }
  async deleteProduct(id: string) {
    let product = await this.productModel.findByIdAndDelete(id);
    return product;
  }
  async updateProducts(
    id: string,
    updateProduct: CreateProductDto,
  ): Promise<Product> {
    let product = await this.productModel.findByIdAndUpdate(
      id,
      CreateProductDto,
      {
        new: true,
      },
    );

    return product;
  }
  async getProduct(id: string): Promise<Product> {
    let product = await this.productModel.findById(id);
    return product;
  }

  private findProduct(id: number) {
    // let product = this.products.find((item) => item.id === id);
    // if (!product) throw new NotFoundException('Couldnt Found Product');
    // else return product;
  }
}
