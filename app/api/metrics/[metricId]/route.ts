import { NextResponse } from 'next/server'
import { metricRequestSchema, metricToJson } from '../metric-helpers';
import { Prisma } from '@prisma/client'

import prisma from '../../../../lib/prisma';

export async function GET(request: Request, { params }: {params: {metricId: string}}) {
   const metricId = parseInt(params.metricId);
   if (String(metricId) != params.metricId) {
      return e404();
   }
   const metric = await prisma.metric.findUnique({
      where: {id: metricId},
      include: {measurements: true},
   });
   if (!metric) {
      return e404()
   }

   return NextResponse.json(metricToJson(metric));
}

function e404() {
   return NextResponse.json({}, { status: 404 });
}