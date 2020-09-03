import React from 'react';
import { Button, Headline, Portal } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { categories } from '../constants/categories';
import { DefaultView } from '../components/containers/DefaultView';
import { DialogButton } from '../components/inputs/DialogButton';
import { difficulties } from '../constants/difficulties';
import { fetchQuestions } from '../utils/fetchQuestions';
import { Category, Difficulty } from '../types/questions';
import { GameStackParamList } from '../../App';

type HomeScreenNavigationProp = StackNavigationProp<GameStackParamList, 'Home'>;

export const Home = () => {
  const [selectedCategory, setCategory] = React.useState('0');
  const [selectedDifficulty, setDifficulty] = React.useState<Difficulty>('any');
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const goToGame = () => {
    setLoading(true);
    const category = categories.find(
      (cat) => cat.value === selectedCategory
    ) as Category;
    fetchQuestions({
      category,
      difficulty: selectedDifficulty
    })
      .then((questions) => {
        navigation.navigate('Game', questions);
      })
      .catch(console.warn)
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <DefaultView>
      <Portal.Host>
        <View style={styles.container}>
          <Headline style={styles.headline}>
            Welcome to the Trivia Game!
          </Headline>
          <DialogButton
            label="Do you want to select a category?"
            options={categories}
            onChange={setCategory}
            selectedValue={selectedCategory}
            containerStyle={styles.button}
          />
          <DialogButton
            label="What about difficulty?"
            options={difficulties}
            onChange={(value) => setDifficulty(value as Difficulty)}
            selectedValue={selectedDifficulty}
          />
          <Button
            mode="contained"
            dark
            style={styles.button}
            contentStyle={styles.buttonContentStyle}
            onPress={goToGame}
            loading={loading}
          >
            Play the game
          </Button>
        </View>
      </Portal.Host>
    </DefaultView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 18
  },
  headline: {
    textDecorationLine: 'underline',
    textDecorationColor: 'white',
    fontStyle: 'italic',
    position: 'absolute',
    top: 48,
    left: 18
  },
  button: {
    marginVertical: 36
  },
  buttonContentStyle: {
    height: 50
  }
});
