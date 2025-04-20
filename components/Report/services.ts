import { supabase } from '@/utils/supabase';

export const createVideoReport = async (report: CreateReport) => {
  const { data, error } = await supabase
    .from('report_video')
    .insert({
      video_id: report.reporteeId,
      reason: report.reason,
      reporter_id: report.reporterId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const createUserReport = async (report: CreateReport) => {
  const { data, error } = await supabase
    .from('report_member')
    .insert({
      user_id: report.reporteeId,
      reason: report.reason,
      reporter_id: report.reporterId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const createCommunityReport = async (report: CreateReport) => {
  const { data, error } = await supabase
    .from('report_community')
    .insert({
      community_id: report.reporteeId,
      reason: report.reason,
      reporter_id: report.reporterId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const createProductReport = async (report: CreateReport) => {
  const { data, error } = await supabase
    .from('report_product')
    .insert({
      product_id: report.reporteeId,
      reason: report.reason,
      reporter_id: report.reporterId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const createCommunityCollectionReport = async (
  report: CreateCommunityReport
) => {
  const { data, error } = await supabase
    .from('report_community_collection')
    .insert({
      collection_id: report.reporteeId,
      reason: report.reason,
      reporter_id: report.reporterId,
      community_id: report.communityId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const createCommunityPostReport = async (
  report: CreateCommunityReport
) => {
  const { data, error } = await supabase
    .from('report_community_post')
    .insert({
      post_id: report.reporteeId,
      reason: report.reason,
      reporter_id: report.reporterId,
      community_id: report.communityId,
    })
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const createCommunityMemberReport = async (
  report: CreateCommunityReport
) => {
  const { data, error } = await supabase
    .from('report_community_member')
    .insert({
      user_id: report.reporteeId,
      reason: report.reason,
      reporter_id: report.reporterId,
      community_id: report.communityId,
    })
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
