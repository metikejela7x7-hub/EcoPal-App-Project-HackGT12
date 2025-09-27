
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import { router } from 'expo-router';

export default function CommunityScreen() {
  const [selectedTab, setSelectedTab] = useState('impact');

  const globalStats = {
    totalUsers: 125000,
    co2Saved: 2500000, // kg
    treesPlanted: 15000,
    wasteReduced: 850000, // kg
  };

  const leaderboard = [
    { id: 1, name: 'EcoWarrior23', points: 15420, level: 12, avatar: '🌱' },
    { id: 2, name: 'GreenThumb', points: 14890, level: 11, avatar: '🌿' },
    { id: 3, name: 'PlanetSaver', points: 14200, level: 11, avatar: '🌍' },
    { id: 4, name: 'You', points: 1250, level: 5, avatar: '🐢' },
    { id: 5, name: 'EcoFriend', points: 1180, level: 4, avatar: '🌳' },
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'EcoWarrior23',
      action: 'completed "Bike to Work Week"',
      points: 200,
      time: '2 hours ago',
      avatar: '🌱',
    },
    {
      id: 2,
      user: 'GreenThumb',
      action: 'planted 5 trees',
      points: 150,
      time: '4 hours ago',
      avatar: '🌿',
    },
    {
      id: 3,
      user: 'PlanetSaver',
      action: 'completed "Zero Waste Day"',
      points: 150,
      time: '6 hours ago',
      avatar: '🌍',
    },
    {
      id: 4,
      user: 'EcoFriend',
      action: 'used public transport',
      points: 50,
      time: '8 hours ago',
      avatar: '🌳',
    },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.spaceBetween, { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.title, { marginBottom: 0 }]}>Community</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Salva Community Message */}
      <View style={[commonStyles.card, { marginHorizontal: 20, marginBottom: 20 }]}>
        <View style={commonStyles.row}>
          <Text style={{ fontSize: 40, marginRight: 16 }}>🐢</Text>
          <View style={{ flex: 1 }}>
            <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
              Salva says:
            </Text>
            <Text style={commonStyles.textLight}>
              "Look at our amazing community! Together we're making a real difference! 🌟"
            </Text>
          </View>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={[commonStyles.row, { paddingHorizontal: 20, marginBottom: 20 }]}>
        <TouchableOpacity
          style={[
            {
              flex: 1,
              backgroundColor: selectedTab === 'impact' ? colors.primary : colors.card,
              borderRadius: 20,
              paddingVertical: 12,
              alignItems: 'center',
              marginRight: 8,
              boxShadow: `0px 2px 4px ${colors.shadow}`,
              elevation: 2,
            }
          ]}
          onPress={() => setSelectedTab('impact')}
        >
          <Text style={[
            commonStyles.text,
            {
              fontWeight: '600',
              color: selectedTab === 'impact' ? colors.white : colors.text,
            }
          ]}>
            Global Impact
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              flex: 1,
              backgroundColor: selectedTab === 'leaderboard' ? colors.primary : colors.card,
              borderRadius: 20,
              paddingVertical: 12,
              alignItems: 'center',
              marginLeft: 8,
              boxShadow: `0px 2px 4px ${colors.shadow}`,
              elevation: 2,
            }
          ]}
          onPress={() => setSelectedTab('leaderboard')}
        >
          <Text style={[
            commonStyles.text,
            {
              fontWeight: '600',
              color: selectedTab === 'leaderboard' ? colors.white : colors.text,
            }
          ]}>
            Leaderboard
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'impact' ? (
          <>
            {/* Global Impact Stats */}
            <View style={[commonStyles.card, { marginBottom: 20 }]}>
              <Text style={[commonStyles.subtitle, { marginBottom: 20, textAlign: 'center' }]}>
                Our Collective Impact
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <View style={[commonStyles.center, { width: '48%', marginBottom: 20 }]}>
                  <View style={{
                    width: 60,
                    height: 60,
                    backgroundColor: colors.primary,
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 8,
                  }}>
                    <Icon name="people" size={24} color={colors.white} />
                  </View>
                  <Text style={[commonStyles.title, { fontSize: 20, marginBottom: 4 }]}>
                    {formatNumber(globalStats.totalUsers)}
                  </Text>
                  <Text style={commonStyles.textLight}>Eco Warriors</Text>
                </View>
                <View style={[commonStyles.center, { width: '48%', marginBottom: 20 }]}>
                  <View style={{
                    width: 60,
                    height: 60,
                    backgroundColor: colors.secondary,
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 8,
                  }}>
                    <Text style={{ fontSize: 24 }}>🌍</Text>
                  </View>
                  <Text style={[commonStyles.title, { fontSize: 20, marginBottom: 4 }]}>
                    {formatNumber(globalStats.co2Saved)}kg
                  </Text>
                  <Text style={commonStyles.textLight}>CO₂ Saved</Text>
                </View>
                <View style={[commonStyles.center, { width: '48%' }]}>
                  <View style={{
                    width: 60,
                    height: 60,
                    backgroundColor: colors.success,
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 8,
                  }}>
                    <Text style={{ fontSize: 24 }}>🌳</Text>
                  </View>
                  <Text style={[commonStyles.title, { fontSize: 20, marginBottom: 4 }]}>
                    {formatNumber(globalStats.treesPlanted)}
                  </Text>
                  <Text style={commonStyles.textLight}>Trees Planted</Text>
                </View>
                <View style={[commonStyles.center, { width: '48%' }]}>
                  <View style={{
                    width: 60,
                    height: 60,
                    backgroundColor: colors.accent,
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 8,
                  }}>
                    <Icon name="leaf" size={24} color={colors.white} />
                  </View>
                  <Text style={[commonStyles.title, { fontSize: 20, marginBottom: 4 }]}>
                    {formatNumber(globalStats.wasteReduced)}kg
                  </Text>
                  <Text style={commonStyles.textLight}>Waste Reduced</Text>
                </View>
              </View>
            </View>

            {/* Recent Community Activities */}
            <View style={{ marginBottom: 30 }}>
              <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Recent Activities</Text>
              {recentActivities.map((activity) => (
                <View key={activity.id} style={[commonStyles.smallCard, { marginBottom: 12 }]}>
                  <View style={commonStyles.spaceBetween}>
                    <View style={[commonStyles.row, { flex: 1 }]}>
                      <View style={{
                        width: 40,
                        height: 40,
                        backgroundColor: colors.backgroundAlt,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                      }}>
                        <Text style={{ fontSize: 20 }}>{activity.avatar}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 2 }]}>
                          {activity.user}
                        </Text>
                        <Text style={[commonStyles.textLight, { fontSize: 14 }]}>
                          {activity.action}
                        </Text>
                        <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                          {activity.time}
                        </Text>
                      </View>
                    </View>
                    <Text style={[commonStyles.text, { fontWeight: '600', color: colors.success }]}>
                      +{activity.points}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        ) : (
          <>
            {/* Leaderboard */}
            <View style={{ marginBottom: 30 }}>
              <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Top Eco Warriors</Text>
              {leaderboard.map((user, index) => (
                <View 
                  key={user.id} 
                  style={[
                    commonStyles.smallCard,
                    {
                      backgroundColor: user.name === 'You' ? colors.backgroundAlt : colors.card,
                      borderWidth: user.name === 'You' ? 2 : 0,
                      borderColor: user.name === 'You' ? colors.primary : 'transparent',
                      marginBottom: 12,
                    }
                  ]}
                >
                  <View style={commonStyles.spaceBetween}>
                    <View style={[commonStyles.row, { flex: 1 }]}>
                      <View style={{
                        width: 30,
                        height: 30,
                        backgroundColor: index < 3 ? colors.warning : colors.textLight,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                      }}>
                        <Text style={[commonStyles.text, { fontSize: 14, fontWeight: '600', color: colors.white }]}>
                          {index + 1}
                        </Text>
                      </View>
                      <View style={{
                        width: 40,
                        height: 40,
                        backgroundColor: colors.backgroundAlt,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                      }}>
                        <Text style={{ fontSize: 20 }}>{user.avatar}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[
                          commonStyles.text, 
                          { 
                            fontWeight: '600', 
                            marginBottom: 2,
                            color: user.name === 'You' ? colors.primary : colors.text,
                          }
                        ]}>
                          {user.name}
                        </Text>
                        <Text style={[commonStyles.textLight, { fontSize: 14 }]}>
                          Level {user.level}
                        </Text>
                      </View>
                    </View>
                    <Text style={[commonStyles.text, { fontWeight: '600', color: colors.success }]}>
                      {user.points.toLocaleString()}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}
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
          <Icon name="trophy-outline" size={24} color={colors.text} />
          <Text style={[commonStyles.textLight, { fontSize: 12, marginTop: 4 }]}>
            Challenges
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.center} onPress={() => router.push('/community')}>
          <Icon name="people" size={24} color={colors.primary} />
          <Text style={[commonStyles.textLight, { fontSize: 12, marginTop: 4, color: colors.primary }]}>
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
