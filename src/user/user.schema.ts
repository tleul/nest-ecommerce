import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop({ required: true })
  user: string;
  @Prop(
    raw([
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        qty: { type: Number },
        price: { type: Number },
      },
    ]),
  )
  cart: Record<string, any>;
  @Prop({ required: true })
  totalPrice: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
