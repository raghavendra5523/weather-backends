import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    MongooseModule. forRoot('mongodb+srv://admin:admin@cluster0.pkosx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true}),
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
