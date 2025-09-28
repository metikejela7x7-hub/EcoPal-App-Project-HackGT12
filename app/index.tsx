
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import { router } from 'expo-router';
import { useUser } from '../context/UserContext';

interface Challenge {
  id: number;
  title: string;
  description: string;
  points: number;
  icon: string;
  completed: boolean;
}

export default function HomeScreen() {
  const { userPoints, setUserPoints, userLevel, setUserLevel, streak, setStreak
    , tasks, setTasks, completedTasks, setCompletedTasks, addRecentActivity } = useUser();

  
  
  const handleChallengePress = (challengeId: number) => {
  setTasks(prevTasks =>
    prevTasks.map(task => {
      if (task.id === challengeId) {
        if (task.completed) {
          // UNDO
          setUserPoints(points => points - task.points);
          setCompletedTasks(prev => prev.filter(t => t.id !== task.id));

          addRecentActivity({
            action: `Undid "${task.title}"`,
            points: -task.points,
            date: "Today",
          });

          return { ...task, completed: false };
        } else {
          // COMPLETE
          setUserPoints(points => points + task.points);
          setCompletedTasks(prev => [...prev, { ...task, completed: true }]);

          addRecentActivity({
            action: `Completed "${task.title}"`,
            points: task.points,
            date: "Today",
          });

          return { ...task, completed: true };
        }
      }
      return task;
    })
  );
};

 

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Header with Salva */}
        <View style={[commonStyles.center, { marginBottom: 30 }]}>
          <View style={{
            width: 120,
            height: 120,
            backgroundColor: colors.primary,
            borderRadius: 60,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}>
            <Text style={{ fontSize: 60 }}>🐢</Text>
          </View>
          <Text style={commonStyles.title}>Hi there! I'm Salva</Text>
          <Text style={[commonStyles.textLight, { textAlign: 'center' }]}>
            Let's make the world greener together!
          </Text>
        </View>

        {/* User Stats */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <View style={commonStyles.spaceBetween}>
            <View style={commonStyles.center}>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>Level</Text>
              <Text style={[commonStyles.title, { fontSize: 24, marginBottom: 0 }]}>{userLevel}</Text>
            </View>
            <View style={commonStyles.center}>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>Points</Text>
              <Text style={[commonStyles.title, { fontSize: 24, marginBottom: 0, color: colors.success }]}>
                {userPoints.toLocaleString()}
              </Text>
            </View>
            <View style={commonStyles.center}>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>Streak</Text>
              <View style={commonStyles.row}>
                <Text style={[commonStyles.title, { fontSize: 24, marginBottom: 0, color: colors.warning }]}>
                  {streak}
                </Text>
                <Text style={{ fontSize: 20, marginLeft: 4 }}>🔥</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Daily Challenges */}
        <View style={{ marginBottom: 20 }}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Today's Challenges</Text>
          {tasks.map((challenge) => (
            <TouchableOpacity
              key={challenge.id}
              style={[
                commonStyles.smallCard,
                {
                  backgroundColor: challenge.completed ? colors.backgroundAlt : colors.card,
                  borderWidth: challenge.completed ? 2 : 0,
                  borderColor: challenge.completed ? colors.success : 'transparent',
                }
              ]}
              onPress={() => handleChallengePress(challenge.id)}
            >
              <View style={commonStyles.spaceBetween}>
                <View style={[commonStyles.row, { flex: 1 }]}>
                  <View style={{
                    width: 50,
                    height: 50,
                    backgroundColor: challenge.completed ? colors.success : colors.primary,
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}>
                    <Icon 
                      name={challenge.completed ? 'checkmark' : challenge.icon as any} 
                      size={24} 
                      color={colors.white} 
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                      {challenge.title}
                    </Text>
                    <Text style={commonStyles.textLight}>
                      {challenge.description}
                    </Text>
                  </View>
                </View>
                <View style={commonStyles.center}>
                  <Text style={[commonStyles.text, { fontWeight: '600', color: colors.success }]}>
                    +{challenge.points}
                  </Text>
                  <Text style={commonStyles.textLight}>points</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={{ marginBottom: 30 }}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Quick Actions</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={[commonStyles.smallCard, { flex: 1, marginRight: 8 }]}
              onPress={() => router.push('/challenges')}
            >
              <View style={commonStyles.center}>
                <Icon name="trophy-outline" size={32} color={colors.primary} />
                <Text style={[commonStyles.text, { fontWeight: '600', marginTop: 8 }]}>
                  All Challenges
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[commonStyles.smallCard, { flex: 1, marginHorizontal: 4 }]}
              onPress={() => router.push('/community')}
            >
              <View style={commonStyles.center}>
                <Icon name="people-outline" size={32} color={colors.secondary} />
                <Text style={[commonStyles.text, { fontWeight: '600', marginTop: 8 }]}>
                  Community
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[commonStyles.smallCard, { flex: 1, marginLeft: 8 }]}
              onPress={() => router.push('/profile')}
            >
              <View style={commonStyles.center}>
                <Icon name="person-outline" size={32} color={colors.accent} />
                <Text style={[commonStyles.text, { fontWeight: '600', marginTop: 8 }]}>
                  Profile
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[commonStyles.bottomTabBar, commonStyles.spaceBetween, { paddingHorizontal: 20 }]}>
        <TouchableOpacity style={commonStyles.center} onPress={() => router.push('/')}>
          <Icon name="home" size={24} color={colors.primary} />
          <Text style={[commonStyles.textLight, { fontSize: 12, marginTop: 4, color: colors.primary }]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.center} onPress={() => router.push('/challenges')}>
          <Icon name="trophy-outline" size={24} color={colors.text} />
          <Text style={[commonStyles.textLight, { fontSize: 12, marginTop: 4 }]}>
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
