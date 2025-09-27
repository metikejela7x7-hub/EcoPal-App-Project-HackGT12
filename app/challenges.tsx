
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import { router } from 'expo-router';

export default function ChallengesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', icon: 'apps-outline' },
    { id: 'transport', name: 'Transport', icon: 'car-outline' },
    { id: 'energy', name: 'Energy', icon: 'flash-outline' },
    { id: 'waste', name: 'Waste', icon: 'leaf-outline' },
    { id: 'water', name: 'Water', icon: 'water-outline' },
  ];

  const challenges = [
    {
      id: 1,
      title: 'Bike to Work Week',
      description: 'Use your bike for commuting for 5 days',
      category: 'transport',
      difficulty: 'Medium',
      points: 200,
      duration: '7 days',
      participants: 1250,
      completed: false,
    },
    {
      id: 2,
      title: 'Zero Waste Day',
      description: 'Produce no waste for an entire day',
      category: 'waste',
      difficulty: 'Hard',
      points: 150,
      duration: '1 day',
      participants: 890,
      completed: false,
    },
    {
      id: 3,
      title: 'LED Light Switch',
      description: 'Replace 3 bulbs with LED alternatives',
      category: 'energy',
      difficulty: 'Easy',
      points: 75,
      duration: '3 days',
      participants: 2100,
      completed: true,
    },
    {
      id: 4,
      title: 'Water Conservation',
      description: 'Reduce water usage by 20% this week',
      category: 'water',
      difficulty: 'Medium',
      points: 120,
      duration: '7 days',
      participants: 1680,
      completed: false,
    },
    {
      id: 5,
      title: 'Plant-Based Meals',
      description: 'Eat only plant-based meals for 3 days',
      category: 'all',
      difficulty: 'Medium',
      points: 100,
      duration: '3 days',
      participants: 950,
      completed: false,
    },
  ];

  const filteredChallenges = selectedCategory === 'all' 
    ? challenges 
    : challenges.filter(challenge => challenge.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return colors.success;
      case 'Medium': return colors.warning;
      case 'Hard': return '#FF6B6B';
      default: return colors.text;
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.spaceBetween, { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.title, { marginBottom: 0 }]}>Challenges</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Salva Motivation */}
      <View style={[commonStyles.card, { marginHorizontal: 20, marginBottom: 20 }]}>
        <View style={commonStyles.row}>
          <Text style={{ fontSize: 40, marginRight: 16 }}>🐢</Text>
          <View style={{ flex: 1 }}>
            <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
              Salva says:
            </Text>
            <Text style={commonStyles.textLight}>
              "Every small action counts! Pick a challenge and let's save the planet together! 🌍"
            </Text>
          </View>
        </View>
      </View>

      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 20 }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              {
                backgroundColor: selectedCategory === category.id ? colors.primary : colors.card,
                borderRadius: 20,
                paddingVertical: 8,
                paddingHorizontal: 16,
                marginRight: 12,
                flexDirection: 'row',
                alignItems: 'center',
                boxShadow: `0px 2px 4px ${colors.shadow}`,
                elevation: 2,
              }
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Icon 
              name={category.icon as any} 
              size={16} 
              color={selectedCategory === category.id ? colors.white : colors.text} 
            />
            <Text style={[
              commonStyles.text,
              {
                marginLeft: 8,
                fontSize: 14,
                fontWeight: '600',
                color: selectedCategory === category.id ? colors.white : colors.text,
              }
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Challenges List */}
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {filteredChallenges.map((challenge) => (
          <TouchableOpacity
            key={challenge.id}
            style={[
              commonStyles.card,
              {
                backgroundColor: challenge.completed ? colors.backgroundAlt : colors.card,
                borderWidth: challenge.completed ? 2 : 0,
                borderColor: challenge.completed ? colors.success : 'transparent',
              }
            ]}
          >
            <View style={[commonStyles.spaceBetween, { marginBottom: 12 }]}>
              <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 18, flex: 1 }]}>
                {challenge.title}
              </Text>
              {challenge.completed && (
                <Icon name="checkmark-circle" size={24} color={colors.success} />
              )}
            </View>
            
            <Text style={[commonStyles.textLight, { marginBottom: 16 }]}>
              {challenge.description}
            </Text>

            <View style={[commonStyles.spaceBetween, { marginBottom: 12 }]}>
              <View style={commonStyles.row}>
                <View style={[
                  {
                    backgroundColor: getDifficultyColor(challenge.difficulty),
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                    marginRight: 8,
                  }
                ]}>
                  <Text style={[commonStyles.textLight, { fontSize: 12, color: colors.white }]}>
                    {challenge.difficulty}
                  </Text>
                </View>
                <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                  {challenge.duration}
                </Text>
              </View>
              <Text style={[commonStyles.text, { fontWeight: '600', color: colors.success }]}>
                +{challenge.points} points
              </Text>
            </View>

            <View style={commonStyles.spaceBetween}>
              <View style={commonStyles.row}>
                <Icon name="people-outline" size={16} color={colors.textLight} />
                <Text style={[commonStyles.textLight, { fontSize: 12, marginLeft: 4 }]}>
                  {challenge.participants.toLocaleString()} participants
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  {
                    backgroundColor: challenge.completed ? colors.success : colors.primary,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 16,
                  }
                ]}
                disabled={challenge.completed}
              >
                <Text style={[commonStyles.text, { fontSize: 12, fontWeight: '600', color: colors.white }]}>
                  {challenge.completed ? 'Completed' : 'Join Challenge'}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[commonStyles.bottomTabBar, commonStyles.spaceBetween, { paddingHorizontal: 20 }]}>
        <TouchableOpacity style={commonStyles.center} onPress={() => router.push('/')}>
          <Icon name="home-outline" size={24} color={colors.text} />
          <Text style={[commonStyles.textLight, { fontSize: 12, marginTop: 4 }]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.center} onPress={() => router.push('/challenges')}>
          <Icon name="trophy" size={24} color={colors.primary} />
          <Text style={[commonStyles.textLight, { fontSize: 12, marginTop: 4, color: colors.primary }]}>
            Challenges
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.center} onPress={() => router.push('/community')}>
          <Icon name="people-outline" size={24} color={colors.text} />
          <Text style={[commonStyles.textLight, { fontSize: 12, marginTop: 4 }]}>
            Community
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.center} onPress={() => router.push('/profile')}>
          <Icon name="person-outline" size={24} color={colors.text} />
          <Text style={[commonStyles.textLight, { fontSize: 12, marginTop: 4 }]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
