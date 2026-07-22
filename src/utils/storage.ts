import { supabase } from '@/config/supabase';
import { v4 as uuidv4 } from 'uuid';

const BUCKET_NAME = 'media';

/**
 * Helper to upload an image to Supabase Storage
 * @param file The file object to upload
 * @param folder The destination folder (e.g., 'news', 'gallery')
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(file: File, folder: string): Promise<string> {
  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Format file tidak didukung. Gunakan JPG, PNG, atau WEBP.');
  }

  // Validate file size (5MB max)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error('Ukuran file terlalu besar. Maksimal 5MB.');
  }

  // Generate unique file name to avoid collisions
  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`Gagal mengupload gambar: ${error.message}`);
  }

  // Get public URL
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return data.publicUrl;
}

/**
 * Helper to delete an image from Supabase Storage given its public URL
 * @param publicUrl The public URL of the image
 */
export async function deleteImage(publicUrl: string): Promise<void> {
  if (!publicUrl) return;

  try {
    // Extract file path from URL
    // Format: https://<project_id>.supabase.co/storage/v1/object/public/<bucket_name>/<folder>/<filename>
    const urlParts = publicUrl.split(`/public/${BUCKET_NAME}/`);
    if (urlParts.length === 2) {
      const filePath = urlParts[1];
      
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([filePath]);

      if (error) {
        console.error('Error deleting image:', error.message);
        throw new Error(`Gagal menghapus gambar: ${error.message}`);
      }
    }
  } catch (error) {
    console.error('Failed to delete image:', error);
  }
}
