// based on the awesome work of https://gist.github.com/intergalacticspacehighway/02a36b05b2236bc750a065833b71c94a
// ported to FlashList by Hirbod
import { createContext, forwardRef, useCallback, useMemo } from 'react';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { FlashList, FlashListProps } from '@shopify/flash-list';

const MAX_VIEWABLE_ITEMS = 1;

type ViewabilityItemsContextType = string[];

export const ViewabilityItemsContext = createContext<
  Animated.SharedValue<ViewabilityItemsContextType>
>({
  value: [],
});

export const ViewabilityTrackerFlashList = forwardRef(
  (props: FlashListProps<any>, ref: any) => {
    const visibleItems = useSharedValue<ViewabilityItemsContextType>([]);

    const { renderItem: _renderItem } = props;

    const renderItem = useCallback(
      (params: any) => (
        <ItemKeyContext.Provider value={params.index}>
          {_renderItem?.(params)}
        </ItemKeyContext.Provider>
      ),
      [_renderItem]
    );

    const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
      visibleItems.value = viewableItems
        .slice(0, MAX_VIEWABLE_ITEMS)
        .map((item: any) => item.index);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <ViewabilityItemsContext.Provider value={visibleItems}>
        <FlashList
          {...props}
          onViewableItemsChanged={onViewableItemsChanged}
          ref={ref}
          viewabilityConfig={useMemo(
            () => ({
              minimumViewTime: 50,
              itemVisiblePercentThreshold: 80,
            }),
            []
          )}
          renderItem={renderItem}
        />
      </ViewabilityItemsContext.Provider>
    );
  }
);

export const ItemKeyContext = createContext<string | undefined>(undefined);

/*
// Usage in item to do stuff.
export const useDoSomethingWhenItemVisible = () => {
  const id = useContext(ItemKeyContext)!;
  const context = useContext(ViewabilityItemsContext)!;

  // we mount or unmount the Video depending on the list visibility state
  useAnimatedReaction(
    () => context.value,
    (ctx) => {
      if (ctx.includes(id)) {
        // do stuff on item visible
      } else if (!ctx.includes(id)) {
        // do stuff on item invisible
      }
    },
    []
  );
};
*/
