import { NextResponse } from 'next/server'
import { metricRequestSchema, metricToJson } from './metric-helpers';
import { Prisma } from '@prisma/client'

import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
   const body = await request.json();
   const result = metricRequestSchema.safeParse(body);
   if (!result.success) {
      return NextResponse.json(result.error, {
         status: 400,
      });
   }

   const stuff: Prisma.MetricCreateInput = result.data;

   const metric = await prisma.metric.create({data: result.data});

   return NextResponse.json(metricToJson(metric));
}