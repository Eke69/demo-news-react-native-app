import React from "react";
import { View, TouchableHighlight } from "react-native";
import { Text, Card, Divider } from "react-native-elements";
import moment from "moment";
import { Article } from "../article.interface";

interface Props {
  article: Article;
  handlePress: any;
}

const Barticle = ({
  article: {
    source,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    content,
  },
  handlePress,
}: Props) => {
  const time = moment(publishedAt || moment.now()).fromNow();
  return (
    <TouchableHighlight onPress={handlePress}>
      <Card>
        <Card.Image source={{ uri: urlToImage }}></Card.Image>
        <Card.FeaturedTitle
          style={{
            marginHorizontal: 5,
            textShadowColor: "#00000f",
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 2,
          }}
        >
          {title}
        </Card.FeaturedTitle>
        <Text style={{ marginBottom: 10 }}>
          {description || "Read more..."}
        </Text>
        <Divider style={{ backgroundColor: "#dfe6e9" }} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              margin: 5,
              fontStyle: "italic",
              color: "#b2bec3",
              fontSize: 10,
            }}
          >
            {source.name.toUpperCase()}
          </Text>
          <Text
            style={{
              margin: 5,
              fontStyle: "italic",
              color: "#b2bec3",
              fontSize: 10,
            }}
          >
            {time}
          </Text>
        </View>
      </Card>
    </TouchableHighlight>
  );
};

export default Barticle;
