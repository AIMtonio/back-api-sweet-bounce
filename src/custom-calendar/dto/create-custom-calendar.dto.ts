export class CreateCustomCalendarDto {
  id_custom_calendar?: number;
  calendar_name?: string;
  cve_calendar?: string;
  uuid_user: string;
  status?: string;
  create_at?: Date;
  create_by?: string;
  update_by?: string;
  update_at?: Date;
}