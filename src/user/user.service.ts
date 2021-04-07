import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../product/product.schema';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getAllUser() {
    let user = await this.userModel.find().populate('cart.productId');
    return user;
  }
  async addToCart(userId: string, productId: string) {
    let user = await this.userModel.findById(userId).populate('cart.productId');
    if (!productId) throw new NotFoundException('Select Product ');
    let product = await this.productModel.findById(productId);
    if (!product) throw new NotFoundException('Product Not Found');

    if (!user) {
      let newuser = new this.userModel({
        user: 'userId',
        totalPrice: product.price,
        totalQuantity: 1,
        cart: [
          {
            price: product.price,
            qty: 1,
            productId: productId,
          },
        ],
      });

      newuser = await newuser.save();
      return newuser;
    } else if (user) {
      let productcheck = user.cart.findIndex(
        (item: any) => item.productId._id.toString() === productId.toString(),
      );

      if (productcheck === -1) {
        user.cart.push({
          qty: 1,
          price: product.price,
          productId: productId,
        });
        user.totalPrice = user.totalPrice + product.price;
        await user.save();
        return user;
      } else {
        user.cart[productcheck].qty = user.cart[productcheck].qty + 1;
        user.totalPrice = user.totalPrice + user.cart[productcheck].price;
        await user.save();
        return user;
      }

      return productcheck;
    }
  }
}
