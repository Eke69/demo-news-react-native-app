import React from "react";
import { FlatList, View } from "react-native";
import Barticle from "./Barticle";
import { Article } from "../article.interface";

interface Props {
  articles: Article[];
  handlePress: any;
  isRefreshing: boolean;
  onRefresh: () => void;
}

const NewsFeed = ({
  articles,
  handlePress,
  isRefreshing,
  onRefresh,
}: Props) => {
  const renderItem = ({ item }: any) => {
    return <Barticle article={item} handlePress={() => handlePress(item)} />;
  };

  return (
    <FlatList<Article>
      data={articles}
      renderItem={renderItem as any}
      keyExtractor={(article) => article.url}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
    />
  );
};

export default NewsFeed;
