import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { Article } from "../article.interface";

interface Props {
  article: Article;
}

const ArticleContent = ({ article }: Props) => {
  return (
    <View>
      <Image
        style={{
          width: 300,
          height: 300,
          padding: 3,
          alignSelf: "center",
          borderRadius: 5,
        }}
        source={{
          uri: article.urlToImage,
        }}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold", padding: 10 }}>
        {article.title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Text>{article.source.name}</Text>
        <Text>{article.publishedAt}</Text>
      </View>
      <Text
        style={{
          flexDirection: "row",
          justifyContent: "center",
          textAlign: "justify",
          padding: 10,
        }}
      >
        {article.content}
      </Text>
    </View>
  );
};

export default ArticleContent;
