import { supabase } from '@/utils/supabase';
import { CreateGroup } from './models';
import { v4 as uuidv4 } from 'uuid';
import { decode } from 'base64-arraybuffer';

export const createGroup = async (group: CreateGroup) => {
  // if (updates.profileImageBase64) {
  //   const key = uuidv4();
  //   const path = `private/${key}`;

  //   await supabase.storage
  //     .from('images')
  //     .upload(path, decode(updates.profileImageBase64), {
  //       contentType: 'image/jpeg',
  //     });

  //   supabaseUpdates.profile_image_key = key;
  // }

  let iconKey = null;
  let bannerKey = null;

  if (group.iconBase64) {
    iconKey = uuidv4();
    const iconPath = `private/${iconKey}`;
    await supabase.storage
      .from('images')
      .upload(iconPath, decode(group.iconBase64), {
        contentType: 'image/jpeg',
      });
  }

  if (group.bannerBase64) {
    bannerKey = uuidv4();
    const bannerPath = `private/${bannerKey}`;
    await supabase.storage
      .from('images')
      .upload(bannerPath, decode(group.bannerBase64), {
        contentType: 'image/jpeg',
      });
  }

  const { data, error } = await supabase
    .from('community')
    .insert({
      name: group.name,
      description: group.description ?? '',
      icon_key: iconKey,
      banner_key: bannerKey,
    })
    .select('id')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data.id;
};
