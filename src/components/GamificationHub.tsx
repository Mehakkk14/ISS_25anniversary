import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Rocket, 
  Trophy, 
  Star, 
  Target, 
  Eye, 
  Zap, 
  Users, 
  Award,
  CheckCircle,
  Lock,
  Play,
  RotateCw
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  category: 'explorer' | 'scientist' | 'engineer' | 'commander';
  xp: number;
}

interface ExperienceMode {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  difficulty: number;
  duration: string;
  xpReward: number;
  unlocked: boolean;
  badges: string[];
}

const achievements: Achievement[] = [
  {
    id: 'first-look',
    title: 'First Glimpse',
    description: 'View Earth through the Cupola for the first time',
    icon: Eye,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'explorer',
    xp: 100
  },
  {
    id: 'neutral-buoyancy',
    title: 'Neutral Buoyancy Master',
    description: 'Achieve perfect balance in the NBL trainer',
    icon: Target,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'engineer',
    xp: 200
  },
  {
    id: 'mission-complete',
    title: 'Mission Specialist',
    description: 'Complete all NBL training tasks',
    icon: CheckCircle,
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    category: 'engineer',
    xp: 500
  },
  {
    id: 'earth-explorer',
    title: 'Earth Explorer',
    description: 'Discover all climate monitoring regions',
    icon: Star,
    unlocked: false,
    progress: 0,
    maxProgress: 6,
    category: 'explorer',
    xp: 300
  },
  {
    id: 'research-enthusiast',
    title: 'Research Enthusiast',
    description: 'Learn about 5 different ISS experiments',
    icon: Zap,
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    category: 'scientist',
    xp: 250
  },
  {
    id: 'commander',
    title: 'Mission Commander',
    description: 'Complete both Cupola and NBL experiences',
    icon: Award,
    unlocked: false,
    progress: 0,
    maxProgress: 2,
    category: 'commander',
    xp: 1000
  }
];

const experienceModes: ExperienceMode[] = [
  {
    id: 'cupola',
    title: 'Cupola Earth Observer',
    description: 'Experience Earth monitoring through the ISS observation dome',
    icon: Eye,
    difficulty: 2,
    duration: '10-15 min',
    xpReward: 400,
    unlocked: true,
    badges: ['🌍 Earth Observer', '📸 Space Photographer', '🛰️ Climate Monitor']
  },
  {
    id: 'nbl',
    title: 'NBL Training Specialist',
    description: 'Master underwater spacewalk training simulations',
    icon: Target,
    difficulty: 4,
    duration: '15-20 min',
    xpReward: 600,
    unlocked: true,
    badges: ['🏊 Neutral Buoyancy Expert', '🔧 EVA Specialist', '🎯 Mission Complete']
  },
  {
    id: 'research',
    title: 'Space Research Scientist',
    description: 'Explore ISS laboratory experiments and their Earth benefits',
    icon: Zap,
    difficulty: 3,
    duration: '12-18 min',
    xpReward: 500,
    unlocked: true,
    badges: ['🔬 Lab Expert', '🧬 Microgravity Master', '💡 Innovation Leader']
  },
  {
    id: 'commander',
    title: 'ISS Mission Commander',
    description: 'Complete all experiences and master space station operations',
    icon: Award,
    difficulty: 5,
    duration: '30-45 min',
    xpReward: 1500,
    unlocked: false,
    badges: ['👨‍🚀 Commander', '🏆 ISS Master', '🌟 Space Legend']
  }
];

const GamificationHub: React.FC = () => {
  const [userStats, setUserStats] = useState({
    totalXP: 0,
    level: 1,
    completedMissions: 0,
    timeSpent: 0,
    streak: 0
  });

  const [userAchievements, setUserAchievements] = useState(achievements);
  const [selectedMode, setSelectedMode] = useState<ExperienceMode | null>(null);
  const [showAchievements, setShowAchievements] = useState(false);
  const [funFact, setFunFact] = useState('');

  const funFacts = [
    "The ISS travels at 17,500 mph - that's 5 miles per second! 🚀",
    "Astronauts see 16 sunrises and sunsets every day aboard the ISS 🌅",
    "The ISS has been continuously occupied for over 20 years! 👨‍🚀",
    "Water behaves like magic in microgravity - it forms perfect spheres! 💧",
    "The ISS generates its own oxygen by splitting water molecules ⚗️",
    "Flames burn differently in space - they're blue and round! 🔥",
    "The ISS weighs about 925,000 pounds but floats effortlessly in space 🏗️",
    "Astronauts can see lightning storms from above the clouds ⚡",
    "The ISS solar panels could power 40 homes on Earth ☀️",
    "Sleeping in space requires being strapped in or you'll float away! 😴"
  ];

  useEffect(() => {
    // Simulate loading user progress
    const savedProgress = localStorage.getItem('iss-anniversary-progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setUserStats(progress.stats || userStats);
      setUserAchievements(progress.achievements || achievements);
    }

    // Show random fun fact
    setFunFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
  }, []);

  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 500) + 1;
  };

  const getXPForNextLevel = (currentXP: number) => {
    const currentLevel = calculateLevel(currentXP);
    return currentLevel * 500;
  };

  const unlockAchievement = (achievementId: string) => {
    setUserAchievements(prev => 
      prev.map(achievement => 
        achievement.id === achievementId 
          ? { ...achievement, unlocked: true, progress: achievement.maxProgress }
          : achievement
      )
    );
    
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement) {
      setUserStats(prev => ({
        ...prev,
        totalXP: prev.totalXP + achievement.xp,
        level: calculateLevel(prev.totalXP + achievement.xp)
      }));
    }
  };

  const startExperience = (mode: ExperienceMode) => {
    if (mode.unlocked) {
      setSelectedMode(mode);
      // Track that user started this experience
      setUserStats(prev => ({
        ...prev,
        completedMissions: prev.completedMissions + 1,
        timeSpent: prev.timeSpent + 15 // estimated time
      }));
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < difficulty ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
      />
    ));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'explorer': return '🌍';
      case 'scientist': return '🔬';
      case 'engineer': return '⚙️';
      case 'commander': return '👨‍🚀';
      default: return '⭐';
    }
  };

  const unlockedAchievements = userAchievements.filter(a => a.unlocked);
  const progressPercent = (userStats.totalXP % 500) / 500 * 100;

  return (
    <section className="py-24 bg-gradient-to-b from-purple-900 to-blue-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Rocket className="w-4 h-4 mr-2" />
            Interactive Experience Hub
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Be an Astronaut
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Choose your space adventure! Experience the ISS through interactive simulations 
            and unlock achievements as you explore.
          </p>
        </div>

        {/* User Progress Dashboard */}
        <Card className="mb-12 bg-slate-800/50 border-purple-500/30 p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">{userStats.level}</div>
              <div className="text-white font-semibold">Astronaut Level</div>
              <div className="text-gray-400 text-sm">
                {userStats.totalXP} / {getXPForNextLevel(userStats.totalXP)} XP
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">{unlockedAchievements.length}</div>
              <div className="text-white font-semibold">Achievements</div>
              <div className="text-gray-400 text-sm">
                {unlockedAchievements.length} / {achievements.length} unlocked
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">{userStats.completedMissions}</div>
              <div className="text-white font-semibold">Missions</div>
              <div className="text-gray-400 text-sm">Completed experiences</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">{userStats.timeSpent}</div>
              <div className="text-white font-semibold">Minutes</div>
              <div className="text-gray-400 text-sm">Time in space</div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">Progress to Level {userStats.level + 1}</span>
              <span className="text-purple-400">{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-3 bg-slate-700" />
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => setShowAchievements(true)}
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
            >
              <Trophy className="w-4 h-4 mr-2" />
              View Achievements
            </Button>
            <Button
              onClick={() => unlockAchievement('first-look')}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Adventure
            </Button>
          </div>
        </Card>

        {/* Fun Fact */}
        <Card className="mb-12 bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-500 rounded-full p-3">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Did You Know?</h3>
              <p className="text-gray-300">{funFact}</p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setFunFact(funFacts[Math.floor(Math.random() * funFacts.length)])}
            >
              <RotateCw className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Experience Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {experienceModes.map((mode) => (
            <Card 
              key={mode.id} 
              className={`bg-slate-800/50 border-2 transition-all duration-300 hover:scale-105 ${
                mode.unlocked 
                  ? 'border-blue-500/50 hover:border-blue-400' 
                  : 'border-gray-600/30 opacity-60'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`${mode.unlocked ? 'bg-blue-600' : 'bg-gray-600'} rounded-lg p-3`}>
                      {mode.unlocked ? (
                        <mode.icon className="w-8 h-8 text-white" />
                      ) : (
                        <Lock className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{mode.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {getDifficultyStars(mode.difficulty)}
                        <span className="text-gray-400 text-sm ml-2">{mode.duration}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                    +{mode.xpReward} XP
                  </Badge>
                </div>

                <p className="text-gray-300 mb-4">{mode.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {mode.badges.map((badge, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-blue-500/30">
                      {badge}
                    </Badge>
                  ))}
                </div>

                <Button
                  onClick={() => startExperience(mode)}
                  disabled={!mode.unlocked}
                  className={`w-full ${
                    mode.unlocked 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-600 cursor-not-allowed'
                  }`}
                >
                  {mode.unlocked ? (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Experience
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Locked
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Achievements Modal */}
        <Dialog open={showAchievements} onOpenChange={setShowAchievements}>
          <DialogContent className="max-w-4xl bg-slate-900 text-white border-purple-500/30">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-400" />
                Astronaut Achievements
                <Badge variant="secondary" className="ml-auto">
                  {unlockedAchievements.length} / {achievements.length}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {userAchievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`p-4 ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500/30' 
                      : 'bg-slate-800/30 border-gray-600/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`rounded-lg p-2 ${
                      achievement.unlocked ? 'bg-yellow-600' : 'bg-gray-600'
                    }`}>
                      <achievement.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{getCategoryIcon(achievement.category)}</span>
                        <h4 className="font-semibold text-white">{achievement.title}</h4>
                        {achievement.unlocked && (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{achievement.description}</p>
                      <div className="flex items-center justify-between">
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-2 bg-slate-700 flex-1 mr-3"
                        />
                        <Badge variant="secondary" className="text-xs">
                          +{achievement.xp} XP
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Experience Modal */}
        <Dialog open={!!selectedMode} onOpenChange={() => setSelectedMode(null)}>
          <DialogContent className="max-w-2xl bg-slate-900 text-white border-blue-500/30">
            {selectedMode && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-3">
                    <selectedMode.icon className="w-8 h-8 text-blue-400" />
                    {selectedMode.title}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  <p className="text-gray-300 text-lg">{selectedMode.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                      <div className="flex justify-center mb-2">
                        {getDifficultyStars(selectedMode.difficulty)}
                      </div>
                      <div className="text-white font-semibold">Difficulty</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400 mb-1">
                        +{selectedMode.xpReward}
                      </div>
                      <div className="text-white font-semibold">XP Reward</div>
                    </div>
                  </div>

                  <div className="bg-blue-900/30 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-2 text-blue-300">
                      What You'll Learn
                    </h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Real ISS operations and procedures</li>
                      <li>• Scientific research in microgravity</li>
                      <li>• Earth observation and climate monitoring</li>
                      <li>• Spacewalk preparation techniques</li>
                    </ul>
                  </div>

                  <Button
                    onClick={() => {
                      setSelectedMode(null);
                      // Here you would navigate to the actual experience
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Launch Experience
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default GamificationHub;