import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AppGateway } from "./app.gateway";

@Module({
  imports: [UserModule, MongooseModule.forRoot("mongodb://localhost/nest")],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
