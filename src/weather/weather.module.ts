import { MiddlewareConsumer,RequestMethod,Module, NestModule } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherSchema } from 'src/weather/schemas/weather.schema';
import { AuthenticationMiddleware } from '../common/authentication.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: WeatherSchema }]),
],
  providers: [WeatherService],
  controllers: [WeatherController]
})
export class WeatherModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      { method: RequestMethod.POST, path: '/weather/post' },
      { method: RequestMethod.PUT, path: '/weather/edit' },
      { method: RequestMethod.DELETE, path: '/weather/delete' }
    )
  }
}
