import React from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";
import { TextInput } from "react-native-paper";

function FormTextInput({ title, width, ...otherProps }) {
  const { setFieldTouched, handleChange, values } = useFormikContext();

  return (
    <View style={{ width: width }}>
      <TextInput
        onBlur={() => setFieldTouched(title)}
        onChangeText={handleChange(title)}
        value={values[title]}
        style={[otherProps.style]}
        {...otherProps}
      />
    </View>
  );
}

export default FormTextInput;
