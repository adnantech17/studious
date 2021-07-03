import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import TagInput from "react-native-tag-input";
import colors from "../../assets/colors";

const inputProps = {
  keyboardType: "default",
  placeholder: "Enter Tags",
  style: {
    fontSize: 14,
  },
};

export default function TagInputBox({ tag, setTag, enabled }) {
  const [text, setText] = useState("");
  const [tags, setTags] = useState(tag);

  const onChangeText = (text) => {
    setText(text);
    const lastTyped = text.charAt(text.length - 1);
    const parseWhen = [" ", "\n"];
    if (parseWhen.indexOf(lastTyped) > -1 && text.trim() !== "") {
      setTags([...tags, text.trim()]);
      setText("");
    }
  };
  useEffect(() => {
    setTag(tags);
  }, [tags]);

  const labelExtractor = (tag) => tag;
  return (
    <ScrollView
      horizontal={true}
      style={{
        flexDirection: "row",
        borderRadius: 10,
        width: "100%",
        borderRadius: 50,
      }}
    >
      <TagInput
        value={tags}
        onChange={setTags}
        labelExtractor={labelExtractor}
        text={text}
        onChangeText={onChangeText}
        tagColor={colors.backgroundColor}
        tagTextColor={colors.lightgray}
        inputProps={inputProps}
        maxHeight={75}
        editable={enabled}
        placeholderTextColor={colors.lightgray}
      />
    </ScrollView>
  );
}
