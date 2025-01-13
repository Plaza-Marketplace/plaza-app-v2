import Feed from '@/components/Feed';
import useGetFeedVideos from '@/hooks/queries/useGetFeedVideos';

const ExploreTab = () => {
  const { data, error } = useGetFeedVideos();

  if (!data || error) return null;

  return <Feed videos={data} />;
};

export default ExploreTab;
