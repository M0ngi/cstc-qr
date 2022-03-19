import { TextInput, Image, Text } from "react-native";
import React from "react";
import BlueButton from "../../components/BlueButton/BlueButton";
import Background from "../../components/Background/Background";
import { Card } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import { styles } from './style';
import img from "./../../assets/logo-name-slogan.png"

export default function UpdateProfile () : JSX.Element{
    const { register, handleSubmit, watch,control, formState: { errors } } = useForm();
    const onSubmit = (data : any) => { 
        console.log(data);
    }

	return (
		<Background>
			<Image
                source={img}
                style={styles.logo}
            />

			<Card containerStyle={styles.container} >				
					<Text style ={{fontSize: 15, fontWeight: "bold"}} >Update your profile </Text>
					<Text style ={{fontSize: 10, fontWeight: "100", marginBottom: 25}} >This information will be shared with the congress hotel</Text>
                    <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                        <TextInput
                            style={styles.inputBox}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            placeholder="Name"
                        />
                        )}
                        name="name"
                        rules={{ required: true }}
                    />
                    <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                    <TextInput
                        style={styles.inputBox}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        placeholder="Phone"
                    />
                    )}
                    name="phone"
                    rules={{ required: true }}
                />
                <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                        <TextInput
                            style={styles.inputBox}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            placeholder="CIN"
                        />
                        )}
                        name="CIN"
                        rules={{ required: true }}
                    />
                    <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                        <TextInput
                            style={styles.inputBox}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            placeholder="Birthday date"
                        />
                        )}
                        name="birthday"
                        rules={{ required: true }}
                    />
                    <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                        <TextInput
                            style={styles.inputBox}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            placeholder="Address"
                        />
                        )}
                        name="address"
                        rules={{ required: true }}
                    />
                    <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                        <TextInput
                            style={styles.inputBox}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            placeholder="University"
                        />
                        )}
                        name="university"
                        rules={{ required: true }}
                    />
                   
				<BlueButton text={"Confirm"} buttonHandler={handleSubmit(onSubmit)} />
			</Card>
		</Background>
	);
};

