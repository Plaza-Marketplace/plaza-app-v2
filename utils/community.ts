import { router } from 'expo-router';

export const pushCommunityScreen = (id: Id) => {
  router.push({
    pathname: '/community/community_collections',
    params: {
      id,
    },
  });
};
