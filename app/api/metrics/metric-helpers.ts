import { Metric } from "@prisma/client";
import { z } from "zod";

export function metricToJson(metric: Metric) {
   return {
      name: metric.name,
   }
}

export const metricRequestSchema = z.object({
   name: z.string(),
}).required({
   name: true
});
