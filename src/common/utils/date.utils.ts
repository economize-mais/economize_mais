import { startOfDay } from "date-fns"
import { toZonedTime } from "date-fns-tz"

const TZ = "America/Sao_Paulo"

function parseDateInTimezone(dateStr: string): Date {
    const [year, month, day] = dateStr.split("-").map(Number)
    const localDate = new Date(year, month - 1, day)
    return toZonedTime(localDate, TZ)
}

function startOfDayInTimezone(dateStr: string): Date {
    return startOfDay(parseDateInTimezone(dateStr))
}

export { startOfDayInTimezone }
