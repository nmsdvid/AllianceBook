import React from "react";
import { FlashList } from "@shopify/flash-list";

interface FlashListWrapperProps {
  data: any[];
  onRefresh: () => void;
  refreshing: boolean;
  onEndReached: () => void;
  renderItem: (item: any) => JSX.Element;
}

const FlashListWrapper: React.FC<FlashListWrapperProps> = ({
  data,
  onRefresh,
  refreshing,
  onEndReached,
  renderItem,
}) => {
  return (
    <FlashList
      data={data}
      onRefresh={onRefresh}
      refreshing={refreshing}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.8}
      renderItem={renderItem}
      estimatedItemSize={45}
    />
  );
};

export default FlashListWrapper;
