import { router } from 'expo-router';

export const pushCommunityScreen = (id: Id) => {
  router.push({
    pathname: '/community',
    params: {
      id,
    },
  });
};

export const replaceCommunityScreen = (id: Id) => {
  router.replace({
    pathname: '/community',
    params: {
      id,
    },
  });
};
