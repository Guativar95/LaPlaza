import { StatusVehicle } from '@vehicles/common'

export const canSchedule = (statusRequest: number, scheduledDate?: string) =>
  statusRequest === StatusVehicle.pending ||
  (statusRequest === StatusVehicle.scheduled &&
    Boolean(scheduledDate) &&
    new Date(scheduledDate!).getTime() < new Date().getTime())

export const canConfirm = (statusRequest: number) =>
  [StatusVehicle.pending, StatusVehicle.scheduled].includes(statusRequest)
