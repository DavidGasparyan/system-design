import { Injectable, Logger } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { PrometheusService } from '../prometheus/prometheus.service';
import { NestjsHealthIndicator } from "../prometheus/nestjs-health-indicator.class";
import { HealthIndicator } from "../interfaces/health-indicator.interface";

@Injectable()
export class HealthService {
  private readonly listOfThingsToMonitor: HealthIndicator[];

  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private promClientService: PrometheusService,
  ) {
    this.listOfThingsToMonitor = [
      new NestjsHealthIndicator(
        this.http,
        'https://docs.nestjs.com',
        this.promClientService
      ),
      // new AnyOtherHealthIndicator(this.anyOtherService, this.promClientService),
    ];
  }

  @HealthCheck()
  public async check(): Promise<HealthCheckResult | undefined> {
    return await this.health.check(
      this.listOfThingsToMonitor.map(
        (apiIndicator: HealthIndicator) => async () => {
          try {
            return await apiIndicator.isHealthy();
          } catch (e) {
            Logger.warn(e);
            return apiIndicator.reportUnhealthy();
          }
        }
      )
    );
  }
}
