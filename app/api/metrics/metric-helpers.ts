import { Measurement, Prisma } from "@prisma/client";
import { z } from "zod";

const metricWithMeasurements = Prisma.validator<Prisma.MetricDefaultArgs>()({
  include: { measurements: true },
})

type MetricWithMeasurements = Prisma.MetricGetPayload<typeof metricWithMeasurements>

export function metricToJson(metric: MetricWithMeasurements) {
   return {
      name: metric.name,
      measurements: metric.measurements.map(measurementToJson),
   }
}

function measurementToJson(measurement: Measurement) {
   return {
      value: measurement.value,
      time: measurement.time,
   };
}

export const metricRequestSchema = z.object({
   name: z.string(),
}).required({
   name: true
});
