import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { GlobalZodValidationPipe } from './common/zod.validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new GlobalZodValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
