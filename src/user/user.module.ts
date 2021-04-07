import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { ProductModule } from 'src/product/product.module';
import { Product, ProductSchema } from 'src/product/product.schema';

import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,

        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', function () {
            console.log('It is Saving or Saved');
          });
          return schema;
        },
      },
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
