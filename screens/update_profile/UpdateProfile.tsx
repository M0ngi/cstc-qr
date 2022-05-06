import { TextInput, Image, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import BlueButton from "../../components/BlueButton/BlueButton";
import Background from "../../components/Background/Background";
import { Card } from 'react-native-elements';
import { useForm, Controller, SetFieldValue } from 'react-hook-form';
import { styles } from './style';
import img from "./../../assets/logo-name-slogan.png"
import { RouteProp } from "@react-navigation/native";
import { InfoDispatcher } from "../../contexts/InfoProvider";
import { IUserData } from "../../utils/user";
import DatePicker from "react-datepicker";
import { updateUserInfo } from "../../services/account/userInfoService";

interface IProps {
    route : RouteProp<{ params: { userData : IUserData } }>
};  

export default function UpdateProfile ({ route } : IProps) : JSX.Element{
    const { setValue, handleSubmit, watch,control, formState: { errors } } = useForm();
    const dispatchInfo = useContext(InfoDispatcher);
    const onSubmit = async (data : any) => { 
        console.log(data);
        dispatchInfo({loading: true})
        await updateUserInfo(data, route.params.userData.uid).catch((error)=>dispatchInfo({error}))
        dispatchInfo({loading: false})
    }

    useEffect(()=>{
        setValue("name", route.params.userData.name ?? "");
        setValue("CIN", route.params.userData.cin ?? "");
        setValue("phone", route.params.userData.phone ?? "");
        setValue("address", route.params.userData.address ?? "");
        setValue("university", route.params.userData.university ?? "");
    }, [])

	return (
		<Background>
			<Image
                source={img}
                style={styles.logo}
            />

			<Card containerStyle={styles.container} >				
					<Text style ={{fontSize: 15, fontWeight: "bold"}} >Update user profile </Text>
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
                    {/* <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                            <DatePicker
                                selected={value}
                                onChange={onChange}
                            />
                        )}
                        name="birthday"
                        rules={{ required: true }}
                    /> */}
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

