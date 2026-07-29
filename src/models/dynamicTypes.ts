export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'image' | 'video' | 'richtext' | 'location';
  required?: boolean;
  options?: { label: string; value: string }[];
  placeholder?: string;
  gridSpan?: 1 | 2;
  dependsOn?: { field: string; value: any };
}

export interface ColumnConfig {
  key: string;
  label: string;
  type?: 'text' | 'image' | 'date' | 'badge' | 'action';
  sortable?: boolean;
}

export interface CategoryConfig {
  id: string; // e.g., 'berita', 'potensi'
  title: string;
  description: string;
  icon?: any; // Lucide icon or string
  collectionName: string; // the database table name or storage key
  fields: FieldConfig[];
  columns: ColumnConfig[];
  themeColor?: string; // e.g., 'blue', 'emerald'
}
