import React, {useState, useEffect} from 'react';

import {FlatList, View, RefreshControl, TouchableOpacity} from 'react-native';
import {Loading} from '../components/Loading';
import {CardPage} from '../components/CardPage';
import {StackNavigationProp} from '@react-navigation/stack';

export type Card = {
  id: string;
  title: string;
  image: string;
  description: string;
  createdAt: string;
};
type RootStackParamList = {
  SingleCardPage: {id: string; title: string};
};

type SingleCardPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SingleCardPage'
>;

type Props = {
  navigation: SingleCardPageNavigationProp;
};

export const CardsPage: React.FC<Props> = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Card[]>([]);

  const fetchCards = async () => {
    try {
      const response = await fetch(
        'https://667be2603c30891b865a6d27.mockapi.io/api/cards/cards',
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
    fetchCards();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchCards} />
        }
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SingleCardPage', {
                id: item.id,
                title: item.title,
              })
            }>
            <CardPage
              title={item.title}
              image={item.image}
              createdAt={item.createdAt}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
