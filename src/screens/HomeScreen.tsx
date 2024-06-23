import React, { useState } from 'react';
import {
  ScrollView,
} from 'react-native';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import { useShowGreeting } from '../hooks/useShowGreetings';
import { generalStyles } from './utils/generatStyles';
import CheckUserWallet from '../components/CheckUserWallet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import useGetUserLocation from '../hooks/useGetUserLocation';
import HomeCards from '../components/HomeCards';


const HomeScreen = () => {

  const { user } = useSelector((state: RootState) => state.user);
  let greetings = useShowGreeting()

  const tabBarHeight = useBottomTabBarHeight();

  const { position } = useGetUserLocation()



  return (
    <KeyboardAwareScrollView
      style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
      keyboardShouldPersistTaps="always"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
      >

        {/* wallet */}
        {/* <CheckUserWallet /> */}
        {/* wallet */}

        {/* home cards */}
        <HomeCards />
        {/* home cards */}



      </ScrollView>
    </KeyboardAwareScrollView>
  );
};



export default HomeScreen;
