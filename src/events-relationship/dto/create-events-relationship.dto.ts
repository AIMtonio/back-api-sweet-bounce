export class CreateEventsRelationshipDto {
  id_events_relationship?: number;
  cve_calendar?: string;
  cve_event?: string
  status?: string;
  uuid_user: string;
  create_at?: Date;
  create_by?: string;
  update_by?: string;
  update_at?: Date;
}