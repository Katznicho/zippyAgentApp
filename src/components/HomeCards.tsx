import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { generalStyles } from '../screens/utils/generatStyles';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import { GET_AGENT_TOTALS } from '../screens/utils/constants/routes';

const HomeCards: React.FC<any> = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { authToken } = useSelector((state: RootState) => state.user);

  const isFocused = useIsFocused();

  const fetchAgentTotals = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("X-Requested-With", "XMLHttpRequest");
      myHeaders.append("Authorization", `Bearer ${authToken}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
      };

      const response = await fetch(`${GET_AGENT_TOTALS}`, requestOptions);
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAgentTotals();

    const handleFocus = () => {
      fetchAgentTotals();
    };
    return () => {
    };
  }, [isFocused]);

  const navigation = useNavigation<any>();

  return (
    <View>
      <View style={[styles.viewStyles, generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between' }]}>
        <TouchableOpacity
          style={[styles.CardContainer]}
          activeOpacity={1}
          onPress={() => navigation.navigate('AllUsers')}
        >
          <View style={[{ alignItems: 'center', justifyContent: 'space-between' }]}>
            <View>
              <Text style={[styles.CardTitle]}>{data?.data?.total_referrals ?? 0}</Text>
            </View>
            <Text style={[styles.CardSubtitle]}>Property Owners</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('AllProperties')}
          style={[styles.CardContainer]}
        >
          <View style={[{ alignItems: 'center', justifyContent: 'space-between' }]}>
            <View>
              <Text style={[styles.CardTitle]}>{data?.data?.total_properties ?? 0}</Text>
            </View>
            <Text style={[styles.CardSubtitle]}>Properties</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeCards;

const styles = StyleSheet.create({
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_16,
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryBlackHex,
    fontSize: FONTSIZE.size_14,
    marginHorizontal: SPACING.space_10,
  },
  CardPriceCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_18,
  },
  viewStyles: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  CardContainer: {
    paddingHorizontal: SPACING.space_28,
    paddingVertical: SPACING.space_15,
    width: 150,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: SPACING.space_8,
    padding: SPACING.space_10,
    elevation: 10,
    height: 100,
  },
});
