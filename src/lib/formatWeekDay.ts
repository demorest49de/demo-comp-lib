import { capitalizeFirstLetter } from '@/lib/capitalizeFirstLetter'

export const formatWeekDay = (day: string) => capitalizeFirstLetter(day.substring(0, 2))
