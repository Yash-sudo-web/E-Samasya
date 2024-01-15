import React from 'react';
import { View, Text, TouchableOpacity, TextInput, TextStyle, ViewStyle, TextInputProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
interface InputFieldProps extends TextInputProps {
    label: string;
    inputType?: string;
    fieldButtonLabel?: string;
    fieldButtonFunction?: () => void;
    icon?: React.ReactNode;
    inputStyle?: TextStyle;
    containerStyle?: ViewStyle;
    labelStyle?: TextStyle; // New prop for label style
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    keyboardType = 'default',
    inputType,
    fieldButtonLabel,
    fieldButtonFunction,
    icon,
    inputStyle,
    containerStyle,
    labelStyle, // Destructure labelStyle from props
}) => {
    return (
        <View style={[{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 25, alignItems: 'center' }, containerStyle]}>
            {icon && <View style={{ marginRight: 10 }}>{icon}</View>}
            {inputType === 'password' ? (
                <TextInput
                    placeholder={label}
                    keyboardType={keyboardType}
                    style={[{ flex: 1, paddingVertical: 0, color: 'black' }, inputStyle]} // Set color to black for the input text
                    secureTextEntry={true}
                    placeholderTextColor="black" // Set placeholder text color to black
                />
            ) : (
                <TextInput
                    placeholder={label}
                    keyboardType={keyboardType}
                    style={[{ flex: 1, paddingVertical: 0, color: 'black' }, inputStyle]} // Set color to black for the input text
                    placeholderTextColor="black" // Set placeholder text color to black
                />
            )}
            {fieldButtonLabel && (
                <TouchableOpacity onPress={fieldButtonFunction}>
                    <Text style={{ color: '#40A2AF', fontWeight: '700' }}>{fieldButtonLabel}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

export default InputField;
