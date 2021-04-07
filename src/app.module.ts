import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import config from './config/keys';

@Module({
  imports: [ProductModule, MongooseModule.forRoot(config.mongoUri)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
SVGAnimateElement;
