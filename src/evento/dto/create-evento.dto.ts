export class CreateEventoDto {
  id_event?: number; // Opcional porque es auto-incremental
  cve_event?: string; // Opcional, puede ser generado automáticamente
  name: string; // Obligatorio
  description?: string; // Opcional
  date_event: string; // Obligatorio
  status?: string; // Opcional
  uuid_user: string; // Obligatorio
  create_at?: Date; // Opcional, manejado automáticamente
  create_by?: string; // Opcional
  update_by?: string; // Opcional
  update_at?: Date; // Opcional, manejado automáticamente
}