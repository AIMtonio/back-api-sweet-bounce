export class CreateRelationshipCalendarDto {
  id_relationship_calendar?: number;
  uuid_user_create?: string;
  uuid_user_relationship?: string;
  status?: string;
  cve_calendar: string;
  create_at?: Date;
  create_by?: string;
  update_by?: string;
  update_at?: Date;
  email_user_relationship?: string;
}