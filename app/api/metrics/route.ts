import { NextResponse } from 'next/server'
import { metricRequestSchema, metricToJson } from './metric-helpers';

import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
   const body = await request.json();
   const result = metricRequestSchema.safeParse(body);
   if (!result.success) {
      return NextResponse.json(result.error, {
         status: 400,
      });
   }

   const metric = await prisma.metric.create({
      data: result.data,
      include: {measurements: true}
   });

   return NextResponse.json(metricToJson(metric));
}