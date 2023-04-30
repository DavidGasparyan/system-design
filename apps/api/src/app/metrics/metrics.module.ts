import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { HealthModule } from "../health/health.module";
import { PrometheusModule } from "../prometheus/prometheus.module";

@Module({
  imports: [MetricsModule, HealthModule, PrometheusModule],
  controllers: [MetricsController],
  providers: [MetricsService],
})
export class MetricsModule {}
