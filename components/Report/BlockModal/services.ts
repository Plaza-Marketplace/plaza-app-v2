import { Tables } from '@/database.types';
import { supabase } from '@/utils/supabase';

const formatBlock = (block: Tables<'block'>): UserBlock => {
  return {
    userId: block.blocker_id,
    blockedUserId: block.blocked_id,
    createdAt: new Date(block.created_at),
  };
};

export const createBlock = async (
  blockerId: Id,
  blockedId: Id
): Promise<UserBlock> => {
  if (blockedId === blockerId) {
    throw new Error('You cannot block yourself');
  }

  const { data, error } = await supabase
    .from('block')
    .insert({
      blocked_id: blockedId,
      blocker_id: blockerId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return formatBlock(data);
};
