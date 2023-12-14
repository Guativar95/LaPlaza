import { z } from 'zod'

import v from '@/utils/zodValidations'

export const goodSchema = z.object({
  goodTypeId: v.selectString(),
  price: v.number(),
})

export const vehicleSchema = z.object({
  brandId: v.selectString(),
  classId: v.selectString(),
  lineId: v.selectString(),
  modelId: v.selectString(),
  tradePrice: v.number(),
})

export const goodsAndVehicleSchema = z.object({
  goods: z.array(
    z.object({
      goodTypeId: v.selectString(),
      price: v.number(),
    })
  ),
  vehicles: z.array(
    z.object({
      brandId: v.selectString(),
      classId: v.selectString(),
      lineId: v.selectString(),
      modelId: v.selectString(),
      tradePrice: v.number(),
    })
  ),
})

export type GoodValues = z.infer<typeof goodSchema>
export type VehicleValues = z.infer<typeof vehicleSchema>
export type GoodsAndVehicleValues = z.infer<typeof goodsAndVehicleSchema>
