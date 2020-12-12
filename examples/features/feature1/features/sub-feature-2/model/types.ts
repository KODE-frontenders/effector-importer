export type TInspections = {
  title: string
  documentId: string
  appointmentDate: string
  organisation: string
  doctorSpecialization: string
  doctorName: string
  appointmentTime: string
}[]

export type TStartPayload = {
  profileId: string
  shortDateFilter?: TDateFilter
}
