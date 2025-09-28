import React, { createContext, useContext, useState, ReactNode } from "react";

interface Challenge {
  id: number;
  title: string;
  description: string;
  points: number;
  icon: string;
  completed: boolean;
}

interface RecentActivity {
  id: number;
  action: string;
  points: number;
  date: string;
}

interface UserContextType {
  userPoints: number;
  setUserPoints: React.Dispatch<React.SetStateAction<number>>;
  userLevel: number;
  setUserLevel: React.Dispatch<React.SetStateAction<number>>;
  streak: number;
  setStreak: React.Dispatch<React.SetStateAction<number>>;
  completedTasks: Challenge[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<Challenge[]>>;
  tasks: Challenge[];
  setTasks: React.Dispatch<React.SetStateAction<Challenge[]>>;
  recentActivities: RecentActivity[];
  addRecentActivity: (activity: Omit<RecentActivity, "id">) => void;
  challengeProgress: ChallengeProgress;
  markDot: (challengeId: number, dotIndex: number) => void;
}

interface ChallengeProgress {
  [challengeId: number]: boolean[];
}


const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userPoints, setUserPoints] = useState(1250);
  const [userLevel, setUserLevel] = useState(5);
  const [streak, setStreak] = useState(7);
  const [completedTasks, setCompletedTasks] = useState<Challenge[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
      { id: 1, action: 'Completed "Recycle 3 Items"', points: 30, date: 'Today' },
      { id: 2, action: 'Used public transport', points: 50, date: 'Yesterday' },
      { id: 3, action: 'Completed "LED Light Switch"', points: 75, date: '2 days ago' },
      { id: 4, action: 'Planted a tree', points: 100, date: '3 days ago' },
    ]);
  const [tasks, setTasks] = useState<Challenge[]>([
    { id: 1, title: 'Use Public Transport', description: 'Take the bus or train', points: 50, icon: 'bus-outline', completed: false },
    { id: 2, title: 'Recycle 3 Items', description: 'Sort and recycle plastic/paper/glass', points: 30, icon: 'leaf-outline', completed: false },
    { id: 3, title: 'Save Water', description: 'Take a 5-minute shower', points: 25, icon: 'water-outline', completed: false },
  ]);

  const addRecentActivity = (activity: Omit<RecentActivity, "id">) => {
    setRecentActivities(prev => [
      { id: prev.length + 1, ...activity },
      ...prev,
    ]);
  };
  const [challengeProgress, setChallengeProgress] = useState<ChallengeProgress>({});
  const markDot = (challengeId: number, dotIndex: number) => {
    setChallengeProgress(prev => {
      const dots = prev[challengeId] || [];
      const newDots = [...dots];
      newDots[dotIndex] = true; // mark this dot
      return { ...prev, [challengeId]: newDots };
    });
  };


  return (
    <UserContext.Provider
      value={{
        userPoints,
        setUserPoints,
        userLevel,
        setUserLevel,
        streak,
        setStreak,
        completedTasks,
        setCompletedTasks,
        tasks,
        setTasks,
        recentActivities,
        addRecentActivity,
        challengeProgress,
        markDot,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return context;
};

