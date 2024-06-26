import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {Loading} from '../components/Loading';
import type {Card} from '../screens/CardsPage';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const CardImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

const CardText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;

export type RootStackParamList = {
  SingleCardPage: {id: string; title: string};
};

type SingleCardPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SingleCardPage'
>;

type SingleCardPageRouteProp = RouteProp<RootStackParamList, 'SingleCardPage'>;

type Props = {
  route: SingleCardPageRouteProp;
  navigation: SingleCardPageNavigationProp;
};

export const SingleCardPage: React.FC<Props> = ({route, navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Card>();
  const {id, title} = route.params;

  const fetchOneCard = async () => {
    try {
      const response = await fetch(
        `https://667be2603c30891b865a6d27.mockapi.io/api/cards/cards/${id}`,
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title,
    });
    fetchOneCard();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {data && (
        <View style={{padding: 20}}>
          <CardImage source={{uri: data.image}} />
          <CardText>{data.description}</CardText>
        </View>
      )}
    </>
  );
};
